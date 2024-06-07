import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

export default function AppealConfirmation() {
    return (
        <div
            style={{
                fontFamily: 'Arial, sans-serif',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#070D1B',
                color: 'white',
            }}
        >
            <Head>
                <title>Appeal Confirmation</title>
            </Head>
            <Typography
                variant='h2'
                sx={{
                    marginBottom: '70px',
                    color: '#28a745',
                    fontSize: '60px',
                    textAlign: 'center',
                    fontWeight: 'Bold',
                }}
            >
                We have received your appeal
            </Typography>
            <CheckCircleIcon sx={{ fontSize: 80, color: '#28a745', marginBottom: '70px' }} />
            <Typography
                variant='h4'
                sx={{ marginBottom: '70px', color: '#BFCAD8', fontSize: '24px', textAlign: 'center' }}
            >
                We will let you know if it has been approved
            </Typography>
        </div>
    );
}
