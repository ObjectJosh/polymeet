import { getLocalStream } from './webrtc';
import React, { useRef, useState, useEffect } from 'react';
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const LocalVideoCard = () => {
    /* Whether video is streamed */
    const [audio, setAudio] = useState<boolean>(false);

    /* Whether audio is streamed */
    const [video, setVideo] = useState<boolean>(false);

    /* Whether a valid video source exists */
    const videoRef = useRef<HTMLVideoElement>(null);

    /* The WebRTC peer-to-peer connection */
    const peerConnection = useRef<RTCPeerConnection | null>(null);

    const setVideoRef = async (mediaStream: MediaStream | null) => {
        const newVideo = videoRef.current;
        if (newVideo) {
            newVideo.srcObject = mediaStream;
            newVideo.controls = false;
        }
    };

    const startStream = async () => {
        setVideo(true);
    };

    // stops the user's media stream
    const stopStream = async () => {
        setVideo(false);
    };

    // enable/disable audio tracks in the media stream
    const toggleAudio = () => {
        setAudio(!audio);
    };

    useEffect(() => {
        console.log('Video state:', video);
        console.log('Audio state:', audio);
        if (video || audio) {
            getLocalStream(video, audio).then((stream) => {
                console.log('Stream:', stream);
                setVideoRef(stream);
            });
        } else {
            setVideoRef(null);
        }
    }, [video, audio]);

    return (
        <>
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
                    ref={videoRef}
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
                    <IconButton onClick={video ? stopStream : startStream} color='primary'>
                        {video ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                    <IconButton onClick={toggleAudio} color='primary'>
                        {audio ? <Mic /> : <MicOff />}
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default LocalVideoCard;
