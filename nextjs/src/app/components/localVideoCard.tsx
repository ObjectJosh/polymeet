import React, { MutableRefObject } from 'react';
import { Videocam, VideocamOff, Mic, MicOff } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { VideoConfig } from './webrtc';

interface VideoConfigProps {
    videoConfig: VideoConfig;
    setVideoConfig: (videoConfig: VideoConfig) => void;
    videoRef: MutableRefObject<HTMLVideoElement | null>;
    setVideoRef: (mediaStream: MediaStream | null) => void;
}

export default function LocalVideoCard(props: VideoConfigProps): JSX.Element {
    const startStream = async () => {
        console.log('Starting stream...');
        props.setVideoConfig({
            ...props.videoConfig,
            video: true,
        });
    };

    // stops the user's media stream
    const stopStream = async () => {
        props.setVideoConfig({
            ...props.videoConfig,
            video: false,
        });
    };

    // enable/disable audio tracks in the media stream
    const toggleAudio = () => {
        props.setVideoConfig({
            ...props.videoConfig,
            audio: !props.videoConfig.audio,
        });
    };

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
                    ref={props.videoRef}
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
                    <IconButton onClick={props.videoConfig.video ? stopStream : startStream} color='primary'>
                        {props.videoConfig.video ? <Videocam /> : <VideocamOff />}
                    </IconButton>
                    <IconButton onClick={toggleAudio} color='primary'>
                        {props.videoConfig.audio ? <Mic /> : <MicOff />}
                    </IconButton>
                </div>
            </div>
        </>
    );
}
