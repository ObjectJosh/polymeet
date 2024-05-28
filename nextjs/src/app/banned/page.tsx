import Head from 'next/head';
import { Box, Typography, TextField } from '@mui/material';

export default function Banned() {
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
                <title>Banned</title>
            </Head>
            <Typography
                variant='h1'
                sx={{
                    marginBottom: '20px',
                    color: '#BFCAD8',
                    fontWeight: 'bold',
                    fontSize: '60px',
                    textAlign: 'center',
                }}
            >
                You have been banned
            </Typography>
            <Box sx={{ width: '300px' }}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Your appeal...'
                    InputProps={{
                        style: { color: '#BFCAD8' },
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                                borderColor: '#BFCAD8',
                            },
                            '&:hover fieldset': {
                                borderColor: '#BFCAD8',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#BFCAD8',
                            },
                        },
                        input: { color: 'white' },
                    }}
                />
            </Box>
        </div>
    );
}
