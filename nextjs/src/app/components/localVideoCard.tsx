import { getLocalStream } from './webrtc';
import React, { useRef, useState, useEffect } from 'react';

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
            <video ref={videoRef} autoPlay={true} muted={false} playsInline></video>
            <button onClick={video ? stopStream : startStream}>
              {video ? 'Stop' : 'Start'} webcam
            </button>
            <button onClick={toggleAudio}>
              {audio ? 'Stop' : 'Start'} Audio
            </button>
        </>
    );
};

export default LocalVideoCard;
