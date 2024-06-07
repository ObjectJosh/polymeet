// app/tags/page.tsx
'use client';
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

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
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const router = useRouter();

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const handleSave = () => {
        // need to handle save logic
        router.push('/settings');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
                    <div key={category} className='category' style={{ marginBottom: '20px' }}>
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
                                    className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
                                    onClick={() => handleTagClick(tag)}
                                    sx={{
                                        backgroundColor: selectedTags.includes(tag) ? '#F9AD16' : '#F1C56C',
                                        color: '#1E293B',
                                        '&:hover': {
                                            backgroundColor: selectedTags.includes(tag) ? '#FBBF24' : '#F59E0B',
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
