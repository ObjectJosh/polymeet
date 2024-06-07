'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Typography, IconButton, Box, TextField, MenuItem, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import user from '../user.png';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import majorsData from './majors.json';

export default function Settings() {
    const { logout, user: authUser } = useKindeAuth();

    const userId = '66627e51203c5440e5b9b46c'; // Replace this with the actual user ID

    console.log(authUser); 

    const [editMode, setEditMode] = useState({
        name: false,
        email: false,
        year: false,
        major: false,
        tags: false,
    });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [year, setYear] = useState('');
    const [major, setMajor] = useState('');
    const [hobbies, setHobbies] = useState([]);
    const [classes, setClasses] = useState([]);
    const [clubs, setClubs] = useState([]);

    const handleSave = (field, value) => {
        switch (field) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'year':
                setYear(value);
                break;
            case 'major':
                setMajor(value);
                break;
            default:
                break;
        }
        updateUserData(field, value);
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [field]: false,
        }));
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const email = localStorage.getItem('userEmail');
                console.log('Email from localStorage:', email);

                if (!email) {
                    console.error('No email found in localStorage');
                    return;
                }

                const response = await fetch(`/api/users/${email}`);
                const data = await response.json();
                if (data.success) {
                    const user = data.data;
                    // setUserId(user._id); // Set the user ID
                    setName(`${user.firstName} ${user.lastName}`);
                    setEmail(user.email);
                    setYear(user.year);
                    setMajor(user.major);
                    setHobbies(user.hobbies);
                    setClasses(user.classes);
                    setClubs(user.clubs);
                } else {
                    console.error('User not found:', data.error);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        // Log all localStorage items
        console.log('All localStorage items:');
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);
            console.log(`${key}: ${value}`);
        }

        fetchUserData();
    }, []);

    const updateUserData = async (field, value) => {
        const updatedData = {
            firstName: name.split(' ')[0],
            lastName: name.split(' ')[1],
            email,
            year,
            major,
            hobbies,
            classes,
            clubs,
        };
        updatedData[field] = value;

        try {
            const response = await fetch(`/api/users/${email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (data.success) {
                console.log('User data updated successfully:', data.data);
            } else {
                console.error('Failed to update user data:', data.error);
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const response = await fetch(`/api/users/${userId}`);
    //             const data = await response.json();
    //             if (data.success) {
    //                 const user = data.data;
    //                 setName(`${user.firstName} ${user.lastName}`);
    //                 setEmail(user.email);
    //                 setYear(user.year);
    //                 setMajor(user.major);
    //                 setHobbies(user.hobbies);
    //                 setClasses(user.classes);
    //                 setClubs(user.clubs);
    //             }
    //         } catch (error) {
    //             console.error('Failed to fetch user data:', error);
    //         }
    //     };

    //     fetchUserData();
    // }, [userId]);

    // const updateUserData = async (field, value) => {
    //     const updatedData = {
    //         firstName: name.split(' ')[0],
    //         lastName: name.split(' ')[1],
    //         email,
    //         year,
    //         major,
    //         hobbies,
    //         classes,
    //         clubs,
    //     };
    //     updatedData[field] = value;

    //     try {
    //         const response = await fetch(`/api/users/${userId}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedData),
    //         });
    //         const data = await response.json();
    //         if (data.success) {
    //             console.log('User data updated successfully:', data.data);
    //         } else {
    //             console.error('Failed to update user data:', data.error);
    //         }
    //     } catch (error) {
    //         console.error('Error updating user data:', error);
    //     }
    // };

    const Header = ({ text }) => (
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

    const Field = ({
        label,
        value,
        onChange,
        type = 'text',
        select = false,
        options = [],
        editMode,
        toggleEditMode,
        field,
        handleSave,
    }) => {
        const [localValue, setLocalValue] = useState(value);

        const handleInputChange = (event) => {
            setLocalValue(event.target.value);
        };

        const saveChanges = () => {
            handleSave(field, localValue);
            console.log(field, localValue);
        };

        return (
            <Box sx={{ marginBottom: '20px' }}>
                <Typography variant='h6' sx={{ color: '#BFCAD8' }}>
                    {label}
                </Typography>
                {editMode ? (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {select ? (
                            <TextField
                                select
                                value={localValue}
                                onChange={handleInputChange}
                                variant='outlined'
                                fullWidth
                                sx={{
                                    width: '70%',
                                    marginBottom: '10px',
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
                                    },
                                    input: {
                                        color: '#1E293B',
                                    },
                                    label: {
                                        color: '#64748B',
                                    },
                                }}
                            >
                                {options.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        ) : (
                            <TextField
                                value={localValue}
                                onChange={handleInputChange}
                                variant='outlined'
                                fullWidth
                                autoFocus
                                sx={{
                                    width: '70%',
                                    marginBottom: '10px',
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
                                    },
                                    input: {
                                        color: '#1E293B',
                                    },
                                    label: {
                                        color: '#64748B',
                                    },
                                }}
                            />
                        )}
                        <Button
                            onClick={saveChanges}
                            variant='contained'
                            sx={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }}
                        >
                            Save
                        </Button>
                    </Box>
                ) : (
                    <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center', color: '#BFCAD8' }}>
                        {value}
                        {label !== 'Email' && (
                            <IconButton sx={{ marginLeft: '10px' }} onClick={toggleEditMode}>
                                <EditIcon sx={{ color: '#BFCAD8' }} />
                            </IconButton>
                        )}
                    </Typography>
                )}
            </Box>
        );
    };

    const Tag = ({ label }) => (
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

    const toggleEditMode = (field) => {
        setEditMode((prevEditMode) => ({
            ...prevEditMode,
            [field]: !prevEditMode[field],
        }));
    };

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
                <a href='/chat' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
                <Field
                    label='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    editMode={editMode.name}
                    toggleEditMode={() => toggleEditMode('name')}
                    field='name'
                    handleSave={handleSave}
                />
                <Field
                    label='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    editMode={editMode.email}
                    toggleEditMode={() => toggleEditMode('email')}
                    field='email'
                    handleSave={handleSave}
                />
                <Field
                    label='Year'
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    select
                    options={['First', 'Second', 'Third', 'Fourth', 'Fifth+']}
                    editMode={editMode.year}
                    toggleEditMode={() => toggleEditMode('year')}
                    field='year'
                    handleSave={handleSave}
                />
                <Field
                    label='Major'
                    value={major}
                    onChange={(e) => setMajor(e.target.value)}
                    select
                    options={majorsData.majors}
                    editMode={editMode.major}
                    toggleEditMode={() => toggleEditMode('major')}
                    field='major'
                    handleSave={handleSave}
                />

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                    <Typography variant='h6' sx={{ color: '#BFCAD8', marginRight: '10px' }}>
                        My Tags
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '10px' }}>
                        {hobbies.map((hobby, index) => (
                            <Tag key={`hobby-${index}`} label={hobby} />
                        ))}
                        {classes.map((classItem, index) => (
                            <Tag key={`class-${index}`} label={classItem} />
                        ))}
                        {clubs.map((club, index) => (
                            <Tag key={`club-${index}`} label={club} />
                        ))}
                        <IconButton sx={{ marginLeft: '10px' }} href='/tags'>
                            <EditIcon sx={{ color: '#BFCAD8' }} />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </div>
    );
}