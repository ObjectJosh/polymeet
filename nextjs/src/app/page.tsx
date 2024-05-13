import Head from 'next/head';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import Image from 'next/image';
import user from './user.png';

export default function Home() {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'end', gap: 20, paddingBottom: 5 }}>
                <LoginLink>Sign in</LoginLink>
                <RegisterLink>Sign up</RegisterLink>
            </div>
            <Head>
                <title>Poly Meet</title>
            </Head>

            <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', fontSize: '24px' }}>
                POLY MEET
            </header>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            width: 500,
                            height: 250,
                            background: '#E4CCFF',
                            padding: '10px',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <p style={{ position: 'absolute', left: 10, top: 10 }}>Lacy Smith</p>
                        <Image src={user} alt='profile' />
                    </div>
                    <div
                        style={{
                            width: 500,
                            height: 250,
                            background: '#E4CCFF',
                            padding: '10px',
                            borderRadius: '10px',
                            marginBottom: '10px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                        }}
                    >
                        <p style={{ position: 'absolute', left: 10, top: 10 }}>You</p>
                        <Image src={user} alt='profile' />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
                        <button
                            style={{
                                padding: '5px 50px',
                                fontSize: '16px',
                                cursor: 'pointer',
                                backgroundColor: '#0D99FF',
                                borderRadius: 20,
                            }}
                        >
                            Skip
                        </button>
                    </div>
                </div>

                <div style={{ flex: 2, marginLeft: '20px', position: 'relative' }}>
                    <div
                        style={{
                            backgroundColor: '#4CAF50',
                            padding: '10px',
                            borderRadius: '10px',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <strong
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    backgroundColor: '#FFD700',
                                    padding: 10,
                                    color: 'black',
                                    width: '20rem',
                                    borderRadius: 20,
                                }}
                            >
                                Chatting With
                            </strong>
                        </div>
                        <p>Name: Lacy Smith</p>
                        <p>Major: Computer Science</p>
                        <p>Year: Sophomore, C/O 2026</p>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <p>Tags:</p>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: 5,
                                    marginLeft: 5,
                                    justifyContent: 'space-around',
                                    width: '100%',
                                }}
                            >
                                {['Music', 'Climbing', 'CSC 357'].map((tag) => (
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
                                ))}
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
                        <div
                            style={{
                                background: 'lightblue',
                                padding: '10px 20px',
                                borderRadius: '15px',
                                maxWidth: '80%',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <p>Lacy Smith: Hi!</p>
                        </div>
                        <div
                            style={{
                                background: '#CBC3E3',
                                padding: '10px 20px',
                                borderRadius: '15px',
                                maxWidth: '80%',
                                alignSelf: 'flex-start',
                            }}
                        >
                            <p>You: Nice to meet you!</p>
                        </div>
                        <div
                            style={{
                                background: 'lightblue',
                                padding: '10px 20px',
                                borderRadius: '15px',
                                maxWidth: '80%',
                                alignSelf: 'flex-end',
                            }}
                        >
                            <p>Lacy Smith: You too!</p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                            bottom: 0,
                            position: 'absolute',
                            width: '100%',
                        }}
                    >
                        <input
                            type='text'
                            placeholder='Send a message...'
                            style={{ flexGrow: 1, marginRight: '10px', borderRadius: 10, paddingLeft: 10 }}
                        />
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
