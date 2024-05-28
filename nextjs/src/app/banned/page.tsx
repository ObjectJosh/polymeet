import Head from 'next/head';
import { Box, Typography, TextField, IconButton, Tooltip } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';

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
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '20px',
                    textAlign: 'center',
                }}
            >
                <Typography
                    variant='h2'
                    sx={{
                        color: '#B53737',
                        fontWeight: 'bold',
                        fontSize: '60px',
                    }}
                >
                    You have been banned
                </Typography>
                <Tooltip
                    title='Banned users occur as a result of being reported three times by other members of PolyMeet'
                    arrow
                >
                    <IconButton sx={{ color: '#BFCAD8', marginLeft: '10px' }}>
                        <InfoIcon fontSize='Medium' />
                    </IconButton>
                </Tooltip>
            </Box>
            <Typography
                variant='h4'
                sx={{
                    marginBottom: '20px',
                    color: '#BFCAD8',
                    fontSize: '24px',
                    textAlign: 'center',
                }}
            >
                Think this was a mistake? Submit an appeal here:
            </Typography>
            <Box sx={{ width: '700px' }}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Your appeal...'
                    multiline
                    rows={6}
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
                        textarea: { color: 'white' },
                    }}
                />
            </Box>
        </div>
    );
}
