import React from 'react';
import { Box } from '@mui/material';

interface ProgressBarProps {
    step: number;
    totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
    const progressPercentage = (step / totalSteps) * 100;
    return (
        <Box
            sx={{
                width: '80%',
                backgroundColor: '#BFCAD8',
                height: '25px',
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '20px',
                marginTop: '5rem',
            }}
        >
            <Box sx={{ width: `${progressPercentage}%`, backgroundColor: '#006155', height: '100%' }} />
        </Box>
    );
};

export default ProgressBar;
