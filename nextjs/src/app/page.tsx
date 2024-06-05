'use client';
import React from 'react';
import { Box, Button, Typography, Link } from '@mui/material';
import styles from './welcomePage.module.css';
// import { RegisterLink, LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';

const WelcomePage: React.FC = () => {
    const { login, register } = useKindeAuth();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundColor: '#070D1B',
                color: '#BFCAD8',
            }}
        >
            <h1 className={styles.title}>
                Welcome to <span style={{ color: '#006155' }}>PolyMeet</span>
            </h1>
            <h6 className={styles.subtitle}>Built by Cal Poly Students, for Cal Poly Students</h6>
            <Button
                variant='contained'
                sx={{
                    backgroundColor: '#006155',
                    color: '#BFCAD8',
                    '&:hover': {
                        backgroundColor: '#004D3E',
                    },
                    mt: 10,
                }}
                href='/create-account'
                // onClick={register}
            >
                Get Started →
            </Button>
            <Typography variant='body1' sx={{ mt: 2 }}>
                Returning? Sign in{' '}
                <Link sx={{ color: '#4285F4' }} href='/sign-in'>
                    here
                </Link>
            </Typography>
        </Box>
    );
};

export default WelcomePage;
