'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, SxProps, Link } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

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
    type = 'text',
    fullWidth = true,
    value,
    onChange,
    endAdornment,
}: {
    label: string;
    type?: string;
    fullWidth?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    endAdornment?: React.ReactNode;
}) => (
    <TextField
        variant='outlined'
        fullWidth={fullWidth}
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        InputProps={{
            endAdornment: endAdornment,
        }}
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
    />
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

const handleNext = () => {
    window.location.href = '/';
};

const SignIn: React.FC = () => {
    const [email, setEmail] = useState('');
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
            <Header text='Sign in to your account' />
            <Typography
                sx={{
                    marginBottom: '0',
                    marginTop: '5rem',
                    color: '#BFCAD8',
                    fontWeight: 'regular',
                    fontSize: '24px',
                    letterSpacing: '-0.6%',
                    paddingRight: '960px',
                }}
            >
                Email
            </Typography>
            <CustomTextField label='' value={email} onChange={(e) => setEmail(e.target.value)} />
            <LoginLink
                loginRedirectURL='/chat'
                authUrlParams={{
                    connection_id: process.env.NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || '',
                    login_hint: email,
                    // user_metadata: {
                    //     first_name: '',
                    //     last_name: '',
                    // },
                }}
            >
                <CustomButton onClick={() => email && handleNext()}>Log In</CustomButton>
            </LoginLink>
            {/* Commented this out because we're using passwordless */}
            {/* <Typography variant='body1' sx={{ mt: 2 }}>
                Forgot your password? Reset it{' '}
                <Link href='/forgot-password' sx={{ color: '#4285F4' }}>
                    here
                </Link>
            </Typography> */}
            <Typography variant='body1' sx={{ mt: 2 }}>
                New user? Sign up{' '}
                <Link sx={{ color: '#4285F4' }} href='/create-account'>
                    here
                </Link>
            </Typography>
        </Box>
    );
};

export default SignIn;
