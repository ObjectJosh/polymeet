'use client';

import { fetchUserData, VideoConfig } from '../webrtc';
import { useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FaFlag } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa';

interface Message {
    email: string;
    message: string;
}

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

export default function Room() {
    const textRef = useRef<HTMLInputElement>(null);
    const localUser = useRef(null);
    const [remoteUser, setRemoteUser] = useState(null);

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState<Message | null>(null);
    const server = 'localhost:8000/';
    const [socket, setSocket] = useState(io(server));

    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);

    const partnerRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    const [videoConfig, setVideoConfig] = useState<VideoConfig>({
        video: true,
        audio: true,
    });

    const email = useRef<string | null>(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isReportSubmitted, setReportSubmitted] = useState(false);

    const hasRunRef = useRef(false);

    useEffect(() => {
        if (!message) return;
        setMessages([...messages, message]);
        setMessage(null);
    }, [message]);

    function sendMessage() {
        const r: any = textRef.current;
        if (!r) return;
        const message = r.value;
        r.value = '';
        socket.emit('send_message', {
            message,
            email: localUser.email,
        });
        console.log('Message sent!');
    }

    useEffect(() => {
        socket.on('new_message', (new_msg) => {
            setMessage(new_msg);
        });

        function keyDownHandler(e: any) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        }
        document.addEventListener('keydown', keyDownHandler);

        if (hasRunRef.current) {
            return;
        }
        hasRunRef.current = true;
        email.current = localStorage.getItem('userEmail');
        console.log('Email from localStorage:', email);
        fetchUserData(email.current).then((user) => {
            localUser.current = user;
        });

        setLocalStream(new MediaStream());
        initialize();
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, []);

    useEffect(() => {
        //ref.current.srcObject = localStream;
        if (!localVideoRef.current) return;
        const v: any = localVideoRef.current;
        v.srcObject = localStream;
    }, [localStream]);

    useEffect(() => {
        //ref.current.srcObject = localStream;
        if (!partnerRef.current) return;
        const v: any = partnerRef.current;
        v.srcObject = remoteStream;
    }, [remoteStream]);

    useEffect(() => {
        localStream?.getVideoTracks().forEach((track) => {
            track.enabled = videoConfig.video;
        });
        localStream?.getAudioTracks().forEach((track) => {
            track.enabled = videoConfig.audio;
        });
    }, [videoConfig]);

    async function initialize() {
        let peer: RTCPeerConnection;
        let joinTimeout: any;
        let offerSent = false;
        let answerSent = false;
        let stream: any;
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setLocalStream(stream);
        } catch (err) {
            console.log(err);
        }

        // Signals to the server that a new user just joined the call
        console.log('Joining room...');
        socket.emit('joinRoom', { userId: localUser.current.email });

        socket.on('waiting', () => {
            console.log('Waiting 20 seconds for someone to join...');
            joinTimeout = setTimeout(() => {
                console.log('No one joined, searching for a room...');
                socket.emit('joinRoom', { userId: localUser.current.email });
            }, 20000000);

            socket.on('user_joined', async (data) => {
                console.log('Someone joined! timeout canceled.');
                console.log('User who joined', data.userId);
                fetchUserData(data.userId).then((user) => {
                    setRemoteUser(user);
                    console.log('Remote user:', user);
                });
                setMessages([]);
                clearTimeout(joinTimeout);

                peer = new RTCPeerConnection(servers);

                peer.ontrack = (e) => {
                    console.log('here');
                    setRemoteStream(e.streams[0]);
                };

                stream.getTracks().forEach((track: any) => {
                    peer.addTrack(track, stream);
                });

                peer.onicecandidate = (e) => {
                    if (e.candidate && !offerSent) {
                        offerSent = true;
                        console.log(e.candidate);
                        socket.emit('offer', {
                            offerDescription: peer.localDescription,
                            candidate: e.candidate,
                        });
                    }
                };

                const offerDescription = await peer.createOffer();
                peer.setLocalDescription(offerDescription);
            });
        });

        socket.on('new_message', (new_msg) => {
            console.log('New message received!');
            setMessage(new_msg);
        });

        socket.on('reset', () => {
            setRemoteStream(null);
            socket.emit('joinRoom', { userId: localUser.current.email });
            offerSent = false;
            answerSent = false;
        });

        socket.on('process-offer', async ({ offerDescription, candidate }) => {
            peer = new RTCPeerConnection(servers);

            peer.ontrack = (e) => {
                console.log('here');
                setRemoteStream(e.streams[0]);
            };

            stream.getTracks().forEach((track: any) => {
                peer.addTrack(track, stream);
            });

            peer.onicecandidate = (e) => {
                if (e.candidate && !answerSent) {
                    answerSent = true;
                    socket.emit('answer', {
                        answerDescription: peer.localDescription,
                        candidate: e.candidate,
                    });
                }
            };

            await peer.setRemoteDescription(offerDescription);
            peer.addIceCandidate(candidate);

            const answerDescription = await peer.createAnswer();
            peer.setLocalDescription(answerDescription);
        });

        socket.on('process-answer', async ({ answerDescription, candidate }) => {
            await peer.setRemoteDescription(answerDescription);
            peer.addIceCandidate(candidate);
        });
    }

    const toggleStream = async () => {
        console.log('Starting stream...');
        setVideoConfig({
            ...videoConfig,
            video: !videoConfig.video,
        });
    };

    const toggleAudio = async () => {
        console.log('Toggling audio...');
        setVideoConfig({
            ...videoConfig,
            audio: !videoConfig.audio,
        });
    };

    const handleFlagClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setReportSubmitted(false);
        window.location.reload();
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setReportSubmitted(true);
    };

    return (
        <div
            id='meet'
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <div
                style={{
                    padding: '10px',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        width: 700,
                        height: 325,
                        background: '#475569',
                        padding: '10px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <p style={{ position: 'absolute', left: 20, top: 20 }}>
                        {remoteUser ? `${remoteUser.firstName} ${remoteUser.lastName}` : 'Loading...'}
                    </p>
                    <video
                        ref={partnerRef}
                        autoPlay={true}
                        muted={false}
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            objectFit: 'cover',
                        }}
                    ></video>
                </div>
                <div
                    style={{
                        width: 700,
                        height: 325,
                        background: '#475569',
                        padding: '10px',
                        borderRadius: '10px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative',
                    }}
                >
                    <p style={{ position: 'absolute', left: 20, top: 20 }}>
                        {localUser.current
                            ? `${localUser.current.firstName} ${localUser.current.lastName}`
                            : 'Loading...'}
                    </p>
                    <video
                        ref={localVideoRef}
                        autoPlay={true}
                        muted={true}
                        playsInline
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '10px',
                            objectFit: 'cover',
                        }}
                    ></video>
                    <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: '10px' }}>
                        <IconButton onClick={toggleStream} color='primary'>
                            {videoConfig.video ? <Videocam /> : <VideocamOff />}
                        </IconButton>
                        <IconButton onClick={toggleAudio} color='primary'>
                            {videoConfig.audio ? <Mic /> : <MicOff />}
                        </IconButton>
                    </div>
                </div>
                <button
                    style={{
                        padding: '5px 50px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#0D99FF',
                        borderRadius: 20,
                    }}
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    Skip
                </button>
            </div>

            <div style={{ width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                    <div style={{ flex: 2, marginLeft: '20px', position: 'relative' }}>
                        <div
                            style={{
                                backgroundColor: '#070D1B',
                                padding: '10px',
                                borderRadius: '10px',
                                paddingBottom: 15,
                                border: '1px solid #BFCAD8',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                                <FaFlag
                                    size={25}
                                    color='red'
                                    style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                    onClick={handleFlagClick}
                                />
                                <strong
                                    style={{
                                        justifyContent: 'center',
                                        display: 'flex',
                                        backgroundColor: '#006155',
                                        padding: 10,
                                        color: 'black',
                                        width: '20rem',
                                        borderRadius: 20,
                                    }}
                                >
                                    Chatting With:&nbsp;
                                    <span style={{ color: 'white' }}>
                                        {remoteUser ? `${remoteUser.firstName} ${remoteUser.lastName}` : 'Loading...'}
                                    </span>
                                </strong>
                            </div>
                            <p>Major: {remoteUser ? remoteUser.major : 'Loading...'}</p>
                            <p>Year: {remoteUser ? remoteUser.year : 'Loading...'}</p>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <p>Tags:</p>
                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '5px',
                                        marginLeft: 5,
                                        justifyContent: 'space-around',
                                        width: '100%',
                                    }}
                                >
                                    {remoteUser
                                        ? [...remoteUser.hobbies, ...remoteUser.classes, ...remoteUser.clubs].map(
                                              (tag) => (
                                                  <div
                                                      key={tag}
                                                      style={{
                                                          backgroundColor: '#FFD700',
                                                          padding: '10px 30px',
                                                          borderRadius: '10px',
                                                          color: 'black',
                                                      }}
                                                  >
                                                      {tag}
                                                  </div>
                                              )
                                          )
                                        : 'Loading...'}
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: '20px',
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px',
                            }}
                        >
                            {messages.map((msg, index) =>
                                msg.email === localUser.current.email ? (
                                    <div
                                        key={index}
                                        style={{
                                            background: '#CBC3E3',
                                            padding: '10px 20px',
                                            borderRadius: '15px',
                                            maxWidth: '80%',
                                            alignSelf: 'flex-end',
                                        }}
                                    >
                                        <p>You: {msg.message}</p>
                                    </div>
                                ) : (
                                    <div
                                        key={index}
                                        style={{
                                            background: 'lightblue',
                                            padding: '10px 20px',
                                            borderRadius: '15px',
                                            maxWidth: '80%',
                                            alignSelf: 'flex-start',
                                        }}
                                    >
                                        <p>
                                            {remoteUser.firstName} {remoteUser.lastName}: {msg.message}
                                        </p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            bottom: 0,
                            // position: '',
                            width: '100%',
                        }}
                    >
                        <input
                            type='text'
                            placeholder='Send a message...'
                            ref={textRef}
                            style={{
                                flexGrow: 1,
                                borderRadius: '20px 0 0 20px',
                                padding: '10px 20px',
                                border: '1px solid #BFCAD8',
                                borderRight: 'none',
                                backgroundColor: '#070D1B',
                                color: 'white',
                            }}
                        />
                        <button
                            onClick={sendMessage}
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '0 20px 20px 0',
                                border: '2px solid #BFCAD8',
                                borderLeft: 'none',
                                backgroundColor: '#BFCAD8',
                                color: 'black',
                                cursor: 'pointer',
                            }}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>

                {isModalOpen && !isReportSubmitted && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px' }}
                        >
                            <h2 style={{ color: 'red' }}>Report Lacy Smith?</h2>
                            <p style={{ color: 'black' }}>
                                By reporting this user, you will not match with them again.
                            </p>
                            <form onSubmit={handleSubmit}>
                                <textarea
                                    placeholder='Reason for reporting...'
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        padding: '10px',
                                        borderRadius: '5px',
                                        border: '1px solid #BFCAD8',
                                        color: 'black',
                                    }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button
                                        type='button'
                                        onClick={handleCloseModal}
                                        style={{
                                            marginRight: '10px',
                                            padding: '5px 15px',
                                            backgroundColor: 'gray',
                                            borderRadius: '5px',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        style={{
                                            padding: '5px 15px',
                                            backgroundColor: 'green',
                                            borderRadius: '5px',
                                            border: 'none',
                                            color: 'white',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {isReportSubmitted && (
                    <div
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', width: '400px' }}
                        >
                            <h2 style={{ color: 'red' }}>We have received your report for Lacy Smith</h2>
                            <p style={{ color: 'black' }}>You will not match with them again</p>
                            <button
                                onClick={handleCloseModal}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'green',
                                    borderRadius: '5px',
                                    border: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                }}
                            >
                                Back to PolyMeet
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
