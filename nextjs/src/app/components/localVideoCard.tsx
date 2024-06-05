import { getLocalStream } from './webrtc';
import React, { useRef, useState, useEffect } from 'react';

const LocalVideoCard = () => {
    /* Whether video is streamed */
    const [audio, setAudio] = useState<Boolean>(false);

    /* Whether audio is streamed */
    const [video, setVideo] = useState<Boolean>(false);

    /* Whether a valid video source exists */
    const videoRef = useRef<HTMLVideoElement>(null);

    const setVideoRef = async (mediaStream: MediaStream | null) => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = mediaStream;
        video.autoplay = video;
        video.controls = false;
        video.muted = audio;
      }
    };

    useEffect(() => {
      async function fetchData() {
        setVideoRef(await getLocalStream());
      }
      fetchData();
    }, []);
    return (
        <>
            <video ref={videoRef} autoPlay={video} muted={true} playsInline></video>
            {/* <button onClick={playing ? stopStream : startStream}>Start webcam</button>

            <button onClick={toggleAudio}>Toggle Sound</button>
            <button onClick={toggleVideo}>Toggle Video</button> */}
        </>
    );
};

export default LocalVideoCard;
