import Head from 'next/head';
import { Box, Typography, TextField, IconButton, Tooltip, Button } from '@mui/material';
import { Info as InfoIcon } from '@mui/icons-material';
import Link from 'next/link';

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
                    marginBottom: '70px',
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
                        <InfoIcon fontSize='medium' />
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
            <Box sx={{ width: '700px', marginBottom: '70px' }}>
                <TextField
                    fullWidth
                    variant='outlined'
                    placeholder='Your appeal...'
                    multiline
                    rows={7}
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
            <Link href='/appeal'>
                <Button
                    variant='contained'
                    sx={{
                        backgroundColor: '#28a745',
                        color: 'white',
                        marginBottom: '40px',
                        '&:hover': {
                            backgroundColor: '#218838',
                        },
                    }}
                >
                    Submit Appeal
                </Button>
            </Link>
        </div>
    );
}
