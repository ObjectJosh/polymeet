'use client';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, IconButton, Box } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import user from '../user.png';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

export default function Settings() {
    const { logout } = useKindeAuth();
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

    const Field = ({ label, value }: { label: string; value: string }) => (
        <Box sx={{ marginBottom: '20px' }}>
            <Typography variant='h6' sx={{ color: '#BFCAD8' }}>
                {label}
            </Typography>
            <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', color: '#BFCAD8' }}>
                {value}
                <IconButton sx={{ marginLeft: '10px' }}>
                    <EditIcon sx={{ color: '#BFCAD8' }} />
                </IconButton>
            </Typography>
        </Box>
    );

    const Tag = ({ label }: { label: string }) => (
        <Box
            sx={{
                backgroundColor: '#F9AD16',
                padding: '5px 10px',
                borderRadius: '10px',
                color: 'black',
                marginRight: '10px',
            }}
        >
            {label}
        </Box>
    );

    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                backgroundColor: '#070D1B',
                height: '100vh',
                color: 'white',
            }}
        >
            <Head>
                <title>Poly Meet</title>
            </Head>
            <nav
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid #BFCAD8',
                    height: '60px',
                    marginBottom: '30px',
                }}
            >
                <a href='/' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <div style={{ padding: '5px', borderRadius: '50%' }}>
                        <Image src={user} alt='PolyMeet logo' width={30} height={30} />
                    </div>
                    <div style={{ color: '#006155', fontSize: '24px' }}>PolyMeet</div>
                </a>
                <button
                    style={{
                        backgroundColor: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                    onClick={logout}
                    type='button'
                >
                    Log Out
                </button>
            </nav>

            <Header text='Account Settings' />
            <Box sx={{ padding: '0 400px', marginTop: '3%' }}>
                <Field label='Name' value='Firstname LastName' />
                <Field label='Email' value='someone@calpoly.edu' />
                <Field label='Year' value='Second' />
                <Field label='Major' value='Computer Science' />
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant='h6' sx={{ color: '#BFCAD8', marginRight: '10px' }}>
                        My Tags
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        <Tag label='Hiking' />
                        <Tag label='CSC 357' />
                        <Tag label='CS+AI' />
                        <IconButton sx={{ marginLeft: '10px' }}>
                            <EditIcon sx={{ color: '#BFCAD8' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}

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

const Field = ({ label, value }: { label: string; value: string }) => (
    <Box sx={{ marginBottom: '20px' }}>
        <Typography variant='h6' sx={{ color: '#BFCAD8' }}>
            {label}
        </Typography>
        <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', color: '#BFCAD8' }}>
            {value}
            <IconButton sx={{ marginLeft: '10px' }}>
                <EditIcon sx={{ color: '#BFCAD8' }} />
            </IconButton>
        </Typography>
    </Box>
);

const Tag = ({ label }: { label: string }) => (
    <Box
        sx={{
            backgroundColor: '#F9AD16',
            padding: '5px 10px',
            borderRadius: '10px',
            color: 'black',
            marginRight: '10px',
        }}
    >
        {label}
    </Box>
);
