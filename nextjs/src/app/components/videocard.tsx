import React, { useRef, useState } from 'react';

const VideoCard = () => {
  // controls if media input is on or off
  const [playing, setPlaying] = useState(false);

  // controls the current stream value
  const [stream, setStream] = useState(null);
  
  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  // controls the video DOM element
  const webcamVideo = useRef();

  // get the user's media stream
  const startStream = async () => {
    let newStream = await navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((newStream) => {
        webcamVideo.current.srcObject = newStream;
        setStream(stream);
      });
    setPlaying(true);
  };
  
   // stops the user's media stream
   const stopStream = () => {
    stream.getTracks().forEach((track) => track.stop());
    setPlaying(false);
  };

  // enable/disable audio tracks in the media stream
  const toggleAudio = () => {
      setAudio(!audio);
      stream.getAudioTracks()[0].enabled = audio;
  };

  // enable/disable video tracks in the media stream
  const toggleVideo = () => {
    setVideo(!video);
    stream.getVideoTracks()[0].enabled = !video;
  };

  return (
    <>
      <video ref={webcamVideo} autoPlay={video} muted={!audio} playsInline></video>
      <button
          onClick={playing ? stopStream : startStream}>
          Start webcam
      </button>

      <button onClick={toggleAudio}>Toggle Sound</button>
      <button onClick={toggleVideo}>Toggle Video</button>
    </>
  );
};

export default VideoCard;
