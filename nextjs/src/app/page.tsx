import Head from 'next/head';
import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

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
                            background: '#ccc',
                            padding: '10px',
                            borderRadius: '10px',
                            marginBottom: '10px',
                        }}
                    >
                        <p>Lacy Smith</p>
                    </div>
                    <div
                        style={{
                            width: 500,
                            height: 250,
                            background: '#ccc',
                            padding: '10px',
                            borderRadius: '10px',
                        }}
                    >
                        <p>You</p>
                    </div>
                    <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Skip</button>
                </div>

                <div style={{ flex: 2, marginLeft: '20px', position: 'relative' }}>
                    <div
                        style={{
                            // backgroundColor: '#FFD700',
                            backgroundColor: '#4CAF50',
                            padding: '10px',
                            borderRadius: '10px',
                        }}
                    >
                        <strong>Chatting With</strong>
                        <p>Name: Lacy Smith</p>
                        <p>Major: Computer Science</p>
                        <p>Year: Sophomore, C/O 2026</p>
                        <p>Tags: Music, Climbing, CSC 357</p>
                    </div>
                    <div style={{ marginTop: '20px', padding: '10px' }}>
                        <p>Lacy Smith: Hi!</p>
                        <p>You: Nice to meet you!</p>
                        <p>Lacy Smith: You too!</p>
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
