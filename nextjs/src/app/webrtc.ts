import firebase from 'firebase/app';
import 'firebase/firestore';
import * as dotenv from 'dotenv';

// dotenv.config();

// export function getEnvironmentVariable(environmentVariable: string): string {
//     const validEnvironmentVariable = process.env[environmentVariable];
//     if (!validEnvironmentVariable) {
//         throw new Error(`Couldn't find environment variable: ${environmentVariable}`);
//     }
//     return validEnvironmentVariable;
// }

// export const ENV = {
//   FIREBASE_API_KEY: getEnvironmentVariable('NEXT_PUBLIC_FIREBASE_API_KEY'),
//   FIREBASE_AUTH_DOMAIN: getEnvironmentVariable('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'),
//   FIREBASE_DATABASE_URL: getEnvironmentVariable('FIREBASE_DATABASE_URL'),
//   FIREBASE_PROJECT_ID: getEnvironmentVariable('FIREBASE_PROJECT_ID'),
//   FIREBASE_STORAGE_BUCKET: getEnvironmentVariable('FIREBASE_STORAGE_BUCKET'),
//   FIREBASE_MESSAGING_SENDER_ID: getEnvironmentVariable('FIREBASE_MESSAGING_SENDER_ID'),
//   FIREBASE_APP_ID: getEnvironmentVariable('FIREBASE_APP_ID'),
//   FIREBASE_MEASUREMENT_ID: getEnvironmentVariable('FIREBASE_MEASUREMENT_ID'),
// };

// const firebaseConfig = {
//   apiKey: ENV.FIREBASE_API_KEY,
//   authDomain: ENV.FIREBASE_AUTH_DOMAIN,
//   databaseURL: ENV.FIREBASE_DATABASE_URL,
//   projectId: ENV.FIREBASE_PROJECT_ID,
//   storageBucket: ENV.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: ENV.FIREBASE_MESSAGING_SENDER_ID,
//   appId: ENV.FIREBASE_APP_ID,
//   measurementId: ENV.FIREBASE_MEASUREMENT_ID,
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const firestore = firebase.firestore();

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

// Global State
const pc = new RTCPeerConnection(servers);

export let remoteStream: MediaStream | null = null;


export function getLocalStream() {
  localStream = navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
}

// export function getRemoteStream(): Promise<MediaStream> {
//   return new Promise((resolve, reject) => {
//     remoteStream = new MediaStream();
//     pc.ontrack = (event) => {
//       event.streams[0].getTracks().forEach((track) => {
//         remoteStream?.addTrack(track);
//       });

//     };
//   }
// }