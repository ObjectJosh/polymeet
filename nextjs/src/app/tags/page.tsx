'use client';
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const tags = {
    Hobbies: [
        'Climbing',
        'Surfing',
        'Music',
        'Reading',
        'Film',
        'Gaming',
        'Cooking',
        'Hiking',
        'Photography',
        'Traveling',
    ],
    Classes: [
        'CSC 123',
        'CSC 101',
        'CSC 202',
        'PHIL 323',
        'CSC 307',
        'MATH 141',
        'CPE 233',
        'CSC 225',
        'CSC 349',
        'CSC 357',
    ],
    Clubs: [
        'CS+AI',
        'CPES',
        'Ballroom',
        'ISCO',
        'SWE',
        'WISH',
        'Hack4Impact',
        'SLO Hacks',
        'Poly Reps',
        'CP Entrepreneurs',
    ],
};

const EditTags: React.FC = () => {
    const { user: authUser } = useKindeAuth();
    const userId = '66627e51203c5440e5b9b46c'; // Replace this with the actual user ID
    const [selectedTags, setSelectedTags] = useState<{ Hobbies: string; Classes: string; Clubs: string }>({
        Hobbies: '',
        Classes: '',
        Clubs: '',
    });
    const router = useRouter();

    useEffect(() => {
        const fetchUserTags = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                console.log('Email from localStorage:', email);

                if (!email) {
                    console.error('No email found in localStorage');
                    return;
                }

                const response = await fetch(`/api/users/${email}`);
                const data = await response.json();
                if (data.success) {
                    const user = data.data;
                    setSelectedTags({
                        Hobbies: user.hobbies[0] || '',
                        Classes: user.classes[0] || '',
                        Clubs: user.clubs[0] || '',
                    });
                }
            } catch (error) {
                console.error('Failed to fetch user tags:', error);
            }
        };

        fetchUserTags();
    }, []);

    const handleTagClick = (category: string, tag: string) => {
        setSelectedTags((prevSelectedTags) => ({
            ...prevSelectedTags,
            [category]: prevSelectedTags[category] === tag ? '' : tag,
        }));
    };

    const handleSave = async () => {
        try {
            const email = localStorage.getItem('userEmail');
            const updatedTags = {
                hobbies: [selectedTags.Hobbies],
                classes: [selectedTags.Classes],
                clubs: [selectedTags.Clubs],
            };

            const response = await fetch(`/api/users/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTags),
            });

            const data = await response.json();
            if (data.success) {
                console.log('Tags updated successfully:', data.data);
                router.push('/settings');
            } else {
                console.error('Failed to update tags:', data.error);
            }
        } catch (error) {
            console.error('Error updating tags:', error);
        }
    };

    // useEffect(() => {
    //     const fetchUserTags = async () => {
    //         try {
    //             const response = await fetch(`/api/users/${userId}`);
    //             const data = await response.json();
    //             if (data.success) {
    //                 const user = data.data;
    //                 setSelectedTags({
    //                     Hobbies: user.hobbies[0] || '',
    //                     Classes: user.classes[0] || '',
    //                     Clubs: user.clubs[0] || '',
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch user tags:', error);
    //         }
    //     };

    //     if (userId) {
    //         fetchUserTags();
    //     }
    // }, [userId]);

    // const handleTagClick = (category: string, tag: string) => {
    //     setSelectedTags((prevSelectedTags) => ({
    //         ...prevSelectedTags,
    //         [category]: prevSelectedTags[category] === tag ? '' : tag,
    //     }));
    // };

    // const handleSave = async () => {
    //     try {
    //         const updatedTags = {
    //             hobbies: [selectedTags.Hobbies],
    //             classes: [selectedTags.Classes],
    //             clubs: [selectedTags.Clubs],
    //         };

    //         const response = await fetch(`/api/users/${userId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedTags),
    //         });

    //         const data = await response.json();
    //         if (data.success) {
    //             console.log('Tags updated successfully:', data.data);
    //             router.push('/settings');
    //         } else {
    //             console.error('Failed to update tags:', data.error);
    //         }
    //     } catch (error) {
    //         console.error('Error updating tags:', error);
    //     }
    // };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',

                height: '100vh',
                backgroundColor: '#070D1B',
                color: '#BFCAD8',
                padding: '0',
            }}
        >
            <Typography
                variant='h1'
                sx={{
                    marginBottom: '20px',
                    marginTop: '3rem',
                    color: '#BFCAD8',
                    fontWeight: 'bold',
                    fontSize: '60px',
                    lineHeight: 'auto',
                    letterSpacing: '-0.02em',
                    textAlign: 'center',
                }}
            >
                Select up to <span style={{ color: '#F9AD16' }}>3</span> tags
            </Typography>
            <div className='categories'>
                {Object.entries(tags).map(([category, tags]) => (
                    <div key={category} className='category' style={{ marginBottom: '20px', marginLeft: '10%' }}>
                        <Typography
                            variant='h6'
                            sx={{
                                color: '#BFCAD8',
                                marginBottom: '10px',
                                textAlign: 'left',
                            }}
                        >
                            {category}
                        </Typography>
                        <div className='tags' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                            {tags.map((tag) => (
                                <Button
                                    key={tag}
                                    className={`tag ${selectedTags[category] === tag ? 'selected' : ''}`}
                                    onClick={() => handleTagClick(category, tag)}
                                    sx={{
                                        backgroundColor: selectedTags[category] === tag ? '#F9AD16' : '#F1C56C',
                                        color: '#1E293B',
                                        '&:hover': {
                                            backgroundColor: selectedTags[category] === tag ? '#FBBF24' : '#F59E0B',
                                        },
                                        borderRadius: '20px',
                                        padding: '10px 20px',
                                    }}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '5rem',
                }}
            >
                <Button
                    variant='contained'
                    onClick={handleSave}
                    sx={{
                        backgroundColor: '#006155',
                        color: '#BFCAD8',
                        '&:hover': { backgroundColor: '#004D3E' },
                        padding: '12px 100px',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                    }}
                >
                    Save Tags
                </Button>
            </Box>
        </Box>
    );
};

export default EditTags;
