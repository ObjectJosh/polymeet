'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Box, Button, TextField, Typography, MenuItem, SxProps } from '@mui/material';
import ProgressBar from './progressBar';
import majorsData from './majors.json';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/ui/spinner';
import axios from 'axios';

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

const Header = ({ text }: { text: string }) => (
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
        {text}
    </Typography>
);

const CustomTextField = ({
    label,
    fullWidth = true,
    select = false,
    value,
    onChange,
    children,
}: {
    label: string;
    fullWidth?: boolean;
    select?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}) => (
    <TextField
        variant='outlined'
        fullWidth={fullWidth}
        select={select}
        label={label}
        value={value}
        onChange={onChange}
        sx={{
            width: '70%',
            marginBottom: '20px',
            backgroundColor: '#E2E8F0',
            borderRadius: '8px',
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: '#334155',
                },
                '&:hover fieldset': {
                    borderColor: '#006155',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#006155',
                },
                '&.MuiOutlinedInput-notchedOutline': {
                    borderRadius: '8px',
                },
            },
            input: {
                color: '#1E293B', // Text color inside the input
            },
            label: {
                color: '#64748B',
            },
        }}
    >
        {children}
    </TextField>
);
const buttonStyle: SxProps = {
    backgroundColor: '#006155',
    color: '#BFCAD8',
    padding: '12px 100px',
    borderRadius: '8px',
    fontWeight: 'bold',
    '&:hover': {
        backgroundColor: '#004D3E',
    },
    mt: 10,
};

const CustomButton = ({ onClick, children }: { onClick: () => void; children: React.ReactNode }) => (
    <Button variant='contained' onClick={onClick} sx={buttonStyle}>
        {children}
    </Button>
);

const CreateAccount: React.FC = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [fullName, setFullName] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const totalSteps = 5;
    const searchParams = useSearchParams();
    const { toast } = useToast();

    useEffect(() => {
        // Sets the page based on url's search params (on load)
        const p = searchParams.get('page');
        if (p) {
            setStep(parseInt(p));
        }
    }, [searchParams]);

    const handleNext = async () => {
        console.log('Step:', step); // Log current step
        if (step < totalSteps) {
            setStep(step + 1);
            return; // Early return if step is less than totalSteps
        }

        try {
            const fullNameParts = fullName.split(' ');
            const firstName = fullNameParts[0];
            const lastName = fullNameParts.slice(1).join(' ');

            const newUser = {
                email,
                firstName,
                lastName,
                major,
                year,
                hobbies: selectedTags.filter((tag) => tags.Hobbies.includes(tag)),
                classes: selectedTags.filter((tag) => tags.Classes.includes(tag)),
                clubs: selectedTags.filter((tag) => tags.Clubs.includes(tag)),
            };

            console.log('Sending user data to API:', newUser);
            await axios.post('/api/users', newUser);
            console.log('User created successfully, redirecting...');
            window.location.href = '/chat';
        } catch (error) {
            console.error('Error creating user account:', error.message);
            toast({
                title: 'Error: Unable to create account',
                description: error.message,
            });
        }
    };

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter((t) => t !== tag));
        } else if (selectedTags.length < 3) {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const validateEmail = (_email: string) => {
        return _email?.endsWith('@calpoly.edu');
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setEmailValid(validateEmail(newEmail));
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 1: // enter email address
                return (
                    <>
                        <Header text='Create your account' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '5rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '750px',
                            }}
                        >
                            Enter your email address
                        </Typography>
                        <CustomTextField label='' value={email} onChange={handleEmailChange} />
                        <Typography
                            sx={{
                                marginBottom: '20px',
                                color: '#AE351A',
                                fontWeight: '600',
                                fontSize: '20px',
                                letterSpacing: '-0.5%',
                                textAlign: 'left',
                                paddingLeft: '700px',
                            }}
                        >
                            *must be a @calpoly.edu domain
                        </Typography>
                        {emailValid ? (
                            <RegisterLink
                                postLoginRedirectURL='/create-account?page=3'
                                authUrlParams={{
                                    connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || '',
                                    login_hint: email,
                                }}
                            >
                                <CustomButton onClick={() => email && handleNext()}>Next →</CustomButton>
                            </RegisterLink>
                        ) : (
                            <CustomButton
                                onClick={() => {
                                    toast({
                                        title: 'Error: Please enter a @calpoly.edu email',
                                    });
                                }}
                            >
                                Next →
                            </CustomButton>
                        )}
                    </>
                );
            case 2: // Loading to direct to kinde
                return (
                    <div className='w-full h-full flex items-center justify-center'>
                        <Spinner />
                    </div>
                );
            case 3: // enter full name
                return (
                    <>
                        <Header text='Create your account' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '5rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '640px',
                            }}
                        >
                            Enter your full name (ex. John Doe)
                        </Typography>
                        <CustomTextField label='' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <CustomButton onClick={() => fullName && handleNext()}>Next →</CustomButton>
                    </>
                );
            case 4: // select major and year
                return (
                    <>
                        <Header text='Create your account' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '2rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '830px',
                            }}
                        >
                            Select your major
                        </Typography>
                        <CustomTextField label='' select value={major} onChange={(e) => setMajor(e.target.value)}>
                            {majorsData.majors.map((major) => (
                                <MenuItem key={major} value={major}>
                                    {major}
                                </MenuItem>
                            ))}
                        </CustomTextField>
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '2rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '840px',
                            }}
                        >
                            Select your year
                        </Typography>
                        <CustomTextField label='' select value={year} onChange={(e) => setYear(e.target.value)}>
                            <MenuItem value='First'>First</MenuItem>
                            <MenuItem value='Second'>Second</MenuItem>
                            <MenuItem value='Third'>Third</MenuItem>
                            <MenuItem value='Fourth'>Fourth</MenuItem>
                            <MenuItem value='Fifth+'>Fifth+</MenuItem>
                        </CustomTextField>
                        <CustomButton onClick={() => major && year && handleNext()}>Choose my tags →</CustomButton>
                    </>
                );
            case 5: // select tags
                return (
                    <Box>
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
                                                        backgroundColor: selectedTags.includes(tag)
                                                            ? '#FBBF24'
                                                            : '#F59E0B',
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
                                onClick={handleNext}
                                sx={{
                                    backgroundColor: '#006155',
                                    color: '#BFCAD8',
                                    '&:hover': { backgroundColor: '#004D3E' },
                                    padding: '12px 100px',
                                    borderRadius: '8px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Ready to join! →
                            </Button>
                        </Box>
                    </Box>
                );
            default:
                return <Typography variant='h5'>Unknown step</Typography>;
        }
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
            <ProgressBar step={step} totalSteps={totalSteps} />
            {renderStepContent(step)}
        </Box>
    );
};

const CreateAccountWrapper = () => {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <CreateAccount />
        </Suspense>
    );
};

export default CreateAccountWrapper;
