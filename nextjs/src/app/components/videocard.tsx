// import { ENV } from './webrtc.ts';
import React, { useRef, useState, MutableRefObject } from 'react';

const VideoCard: React.FC = () => {
    // controls if media input is on or off
    const [playing, setPlaying] = useState<boolean>(false);

    // controls the current stream value
    const [stream, setStream] = useState<MediaStream | null>(null);

    // controls if audio/video is on or off (separately from each other)
    const [audio, setAudio] = useState<boolean>(true);
    const [video, setVideo] = useState<boolean>(true);

    // controls the video DOM element
    const webcamVideo = useRef<HTMLVideoElement>(null);

    // get the user's media stream
    const startStream = async (): Promise<void> => {
        let newStream = await navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((newStream) => {
                if (webcamVideo.current) {
                    webcamVideo.current.srcObject = newStream;
                }
                setStream(newStream);
            });
        setPlaying(true);
    };

    // stops the user's media stream
    const stopStream = (): void => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setPlaying(false);
        }
    };

    // enable/disable audio tracks in the media stream
    const toggleAudio = (): void => {
        setAudio((prevAudio) => !prevAudio);
        if (stream) {
            stream.getAudioTracks()[0].enabled = !audio;
        }
    };

    // enable/disable video tracks in the media stream
    const toggleVideo = (): void => {
        setVideo((prevVideo) => !prevVideo);
        if (stream) {
            stream.getVideoTracks()[0].enabled = !video;
        }
    };

    return (
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
            <p style={{ position: 'absolute', left: 20, top: 20 }}>Other User</p>
            <video
                ref={webcamVideo}
                autoPlay={video}
                muted={!audio}
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '10px',
                    objectFit: 'cover',
                }}
            ></video>
            <button onClick={playing ? stopStream : startStream}>Start webcam</button>
            <button onClick={toggleAudio}>Toggle Sound</button>
            <button onClick={toggleVideo}>Toggle Video</button>
        </div>
    );
};

export default VideoCard;
