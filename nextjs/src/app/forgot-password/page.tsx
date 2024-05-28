'use client';

import React, { useState } from 'react';
import { Box, Button, TextField, Typography, IconButton, InputAdornment, SxProps } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
                color: '#1E293B', 
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

const ForgotPassword: React.FC = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const totalSteps = 3;

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleNextStep = () => {
        if (step < totalSteps) {
            setStep(step + 1);
        } else {
            window.location.href = '/sign-in';
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 1: // enter email
                return (
                    <>
                        <Header text='Forgot your password?' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '5rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '580px',
                            }}
                        >
                            Enter email associated with your account
                        </Typography>
                        <CustomTextField label='' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <CustomButton onClick={() => email && handleNextStep()}>Get verification code</CustomButton>
                    </>
                );
            case 2: // enter verification code
                return (
                    <>
                        <Header text='Forgot your password' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '5rem',
                                color: '#BFCAD8',
                                fontWeight: 'regular',
                                fontSize: '24px',
                                letterSpacing: '-0.6%',
                                paddingRight: '440px',
                            }}
                        >
                            Enter verification code sent to:{' '}
                            <span style={{ textDecoration: 'underline' }}>someone@calpoly.edu</span>{' '}
                        </Typography>
                        <CustomTextField
                            label=''
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
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
                            Enter your new password
                        </Typography>
                        <CustomTextField
                            label=''
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        aria-label='toggle password visibility'
                                        onClick={toggleShowPassword}
                                        edge='end'
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <CustomButton onClick={() => verificationCode && newPassword && handleNextStep()}>
                            Change Password
                        </CustomButton>
                    </>
                );
            case 3: // confirmation
                return (
                    <>
                        <Header text='Forgot your password?' />
                        <Typography
                            sx={{
                                marginBottom: '0',
                                marginTop: '5rem',
                                color: '#BFCAD8',
                                fontWeight: 'light',
                                fontSize: '30px',
                                letterSpacing: '-0.75%',
                                lineHeight: '36px',
                                width: '50%',
                                height: '36px',
                                marginLeft: '10%',
                            }}
                        >
                            Your password was successfully changed.
                        </Typography>
                        <CustomButton onClick={() => handleNextStep()}>Back to login →</CustomButton>
                    </>
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
            {renderStepContent(step)}
        </Box>
    );
};

export default ForgotPassword;
