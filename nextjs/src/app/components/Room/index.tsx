'use client';

import { VideoConfig, getLocalStream } from '../webrtc';
import { useMemo, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 } from 'uuid';
import Messages from './Messages';
import Options from './Options';
import VideoCard from '../localVideoCard';
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
    ],
    iceCandidatePoolSize: 10,
};

export default function Room() {
    const server = 'https://polymeet-7137e04975b4.herokuapp.com/';
    const [socket, setSocket] = useState(io(server));
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const setLocalVideoRef = async (mediaStream: MediaStream | null) => {
        const newLocalVideo = localVideoRef.current;
        if (newLocalVideo) {
            localVideoRef.srcObject = mediaStream;
            localVideoRef.controls = false;
        }
    };
    const partnerRef = useRef(null);

    const [userId, setUserId] = useState<String>(v4());
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
    const [videoClicked, setVideoClicked] = useState<Boolean>(false);
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [videoConfig, setVideoConfig] = useState<VideoConfig>({
        video: true,
        audio: true,
    });

    const localVideoHandler = async () => {
        getLocalStream(videoConfig.video, videoConfig.audio).then((stream) => {
            console.log('Stream:', stream);
            setLocalStream(stream);
        });
    };

    async function initialize() {
        localVideoHandler();
    }

    useEffect(() => {
        //ref.current.srcObject = localStream;
        if (!localVideoRef.current) return;
        const v: any = localVideoRef.current;
        v.srcObject = localStream;
        v.play();
    }, [localStream]);

    useEffect(() => {
        console.log('Video state:', videoConfig.video);
        console.log('Audio state:', videoConfig.audio);
        if (videoConfig.video || videoConfig.audio) {
            localVideoHandler();
        } else {
            setLocalStream(null);
        }
    }, [videoConfig.video, videoConfig.audio]);

    useEffect(() => {
        initialize();
    }, []);

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

    return (
        <div id='meet'>
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
                <p style={{ position: 'absolute', left: 20, top: 20 }}>Them</p>
                {/* <video
                    autoPlay={true}
                    muted={true}
                    playsInline
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '10px',
                        objectFit: 'cover',
                    }}
                ></video> */}
                <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: '10px' }}>
                    <IconButton onClick={toggleStream} color='primary'>
                        {videoConfig.video ? <VideocamOff /> : <Videocam />}
                    </IconButton>
                    <IconButton onClick={toggleAudio} color='primary'>
                        {videoConfig.audio ? <MicOff /> : <Mic />}
                    </IconButton>
                </div>
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
                <p style={{ position: 'absolute', left: 20, top: 20 }}>You</p>
                <video
                    ref={localVideoRef}
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
                <div style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', gap: '10px' }}>
                    <IconButton onClick={toggleStream} color='primary'>
                        {videoConfig.video ? <VideocamOff /> : <Videocam />}
                    </IconButton>
                    <IconButton onClick={toggleAudio} color='primary'>
                        {videoConfig.audio ? <MicOff /> : <Mic />}
                    </IconButton>
                </div>
            </div>
            {/* <div className='video-container'>
                <video 
                    id="partner" 
                    ref={partnerRef}
                    muted={videoConfig.deafened} 
                    style={{
                        display: `${!remoteStream ? 'none': 'block'}`
                    }}
                />
                <Options
                    videoConfig={videoConfig}
                    setVideoConfig={setVideoConfig}
                    socket={socket}
                />
            </div>
            {
                !remoteStream ? 
                null
                :
                <>
                    <Messages socket={socket} id={userId} messageBoxOn={videoConfig.messageBoxOn} />
                </>
            }
            
            <video 
                ref={ref} 
                id="me"
                onMouseDown={(e:any) => {
                    setVideoClicked(true);
                }}

                onMouseMove={(e:any) => {
                    if(!ref.current || !videoClicked) return;
                    console.log(e.clientX);
                    const v:any = ref.current;
                    v.style.left = (parseInt(e.clientX) - 100)+"px";
                    v.style.top = (parseInt(e.clientY) - 50)+"px";
                }} 

                onMouseUp={(e:any) => {
                    setVideoClicked(false);
                }}
            /> */}
        </div>
    );
}
