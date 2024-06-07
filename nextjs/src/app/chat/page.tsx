'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { FaFlag } from 'react-icons/fa6';
import { FaCog } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

import user from '../user.png';

export default function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [isReportSubmitted, setReportSubmitted] = useState(false);
    const [userData, setUserData] = useState(null);

    // TODO: Change to get user matched with (right now gets info for user logged in)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchUserData = async () => {
                const email = localStorage.getItem('userEmail');
                if (email) {
                    try {
                        const response = await fetch(`/api/users/${email}`);
                        const data = await response.json();
                        if (data.success) {
                            if (data.data.banned) {
                                window.location.href = '/banned';
                            } else {
                                setUserData(data.data);
                            }
                        } else {
                            console.error('Failed to fetch user data:', data.error);
                        }
                    } catch (error) {
                        console.error('Error fetching user data:', error);
                    }
                }
            };

            fetchUserData();
        }
    }, []);

    const handleFlagClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setReportSubmitted(false);
    };

    const handleSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setReportSubmitted(true);
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#070D1B', height: '100vh' }}>
            <Head>
                <title>Poly Meet</title>
            </Head>

            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid #BFCAD8',
                    height: '50px',
                    marginBottom: '20px',
                    padding: '5px',
                }}
            >
                <a href='/chat' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <div style={{ padding: '5px', borderRadius: '50%' }}>
                        <Image src={user} alt='PolyMeet logo' width={30} height={30} />
                    </div>
                    <div style={{ color: '#006155', fontSize: '24px' }}>PolyMeet</div>
                </a>
                <a href='/settings' style={{ color: 'white', textDecoration: 'none' }}>
                    <FaCog size={25} color='white' />
                </a>
            </nav>

            <div style={{ display: 'flex', marginTop: '20px' }}>
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            width: 700,
                            height: 300,
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
                        <p style={{ position: 'absolute', left: 10, top: 10 }}>
                            {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
                        </p>
                    </div>
                    <div
                        style={{
                            width: 700,
                            height: 300,
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
                        <p style={{ position: 'absolute', left: 10, top: 10 }}>You</p>
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
                            backgroundColor: '#070D1B',
                            padding: '10px',
                            borderRadius: '10px',
                            paddingBottom: 15,
                            border: '1px solid #BFCAD8',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <FaFlag
                                size={25}
                                color='red'
                                style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
                                onClick={handleFlagClick}
                            />
                            <strong
                                style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                    backgroundColor: '#006155',
                                    padding: 10,
                                    color: 'black',
                                    width: '20rem',
                                    borderRadius: 20,
                                }}
                            >
                                Chatting With:&nbsp;
                                <span style={{ color: 'white' }}>
                                    {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
                                </span>
                            </strong>
                        </div>
                        <p>Major: {userData ? userData.major : 'Loading...'}</p>
                        <p>Year: {userData ? userData.year : 'Loading...'}</p>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                            <p>Tags:</p>
                            <div
                                style={{
                                    display: 'flex',
                                    gap: '5px',
                                    marginLeft: 5,
                                    justifyContent: 'space-around',
                                    width: '100%',
                                }}
                            >
                                {userData
                                    ? [...userData.hobbies, ...userData.classes, ...userData.clubs].map((tag) => (
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
                                      ))
                                    : 'Loading...'}
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
                                alignSelf: 'flex-start',
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
                                alignSelf: 'flex-end',
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
                                alignSelf: 'flex-start',
                            }}
                        >
                            <p>Lacy Smith: You too!</p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            bottom: 0,
                            position: 'absolute',
                            width: '100%',
                        }}
                    >
                        <input
                            type='text'
                            placeholder='Send a message...'
                            style={{
                                flexGrow: 1,
                                borderRadius: '20px 0 0 20px',
                                padding: '10px 20px',
                                border: '1px solid #BFCAD8',
                                borderRight: 'none',
                                backgroundColor: '#070D1B',
                                color: 'white',
                            }}
                        />
                        <button
                            style={{
                                padding: '10px 20px',
                                fontSize: '16px',
                                borderRadius: '0 20px 20px 0',
                                border: '2px solid #BFCAD8',
                                borderLeft: 'none',
                                backgroundColor: '#BFCAD8',
                                color: 'black',
                                cursor: 'pointer',
                            }}
                        >
                            <FaArrowRight />
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && !isReportSubmitted && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            maxWidth: '500px',
                            width: '100%',
                        }}
                    >
                        <h2>Report User</h2>
                        <form onSubmit={handleSubmit}>
                            <label>
                                Reason:
                                <textarea required style={{ width: '100%', padding: '10px', margin: '10px 0' }} />
                            </label>
                            <button type='submit' style={{ padding: '10px 20px', cursor: 'pointer' }}>
                                Submit
                            </button>
                            <button
                                type='button'
                                onClick={handleCloseModal}
                                style={{ padding: '10px 20px', cursor: 'pointer', marginLeft: '10px' }}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isModalOpen && isReportSubmitted && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '10px',
                            maxWidth: '500px',
                            width: '100%',
                        }}
                    >
                        <h2>Report Submitted</h2>
                        <button onClick={handleCloseModal} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
