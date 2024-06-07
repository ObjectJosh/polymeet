'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { mutate } from 'swr';
import { FormError, FormProps, UserForm, TResponse } from '@/types/types';

const Form: React.FC<FormProps> = ({ formId, userForm, forNewUser }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const contentType = 'application/json';
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const [form, setForm] = useState<UserForm>({
        firstName: userForm.firstName,
        lastName: userForm.lastName,
        email: userForm.email,
    });

    /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (form: UserForm) => {
        const id = searchParams.get('id');

        try {
            const res: TResponse = await fetch(`/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status?.toString());
            }

            const { data } = await res.json();

            mutate(`/api/users/${id}`, data, false); // Update the local data without a revalidation
            router.push('/');
        } catch (error) {
            setMessage('Failed to update user');
        }
    };

    /* The POST method adds a new entry in the mongodb database. */
    const postData = async (form: UserForm) => {
        try {
            console.log('try to post');
            const res = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    Accept: contentType,
                    'Content-Type': contentType,
                },
                body: JSON.stringify({
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                }),
            });

            // Throw error with status code in case Fetch API req failed
            if (!res.ok) {
                throw new Error(res.status.toString());
            }
            console.log('done post');

            router.push('/');
        } catch (error) {
            setMessage('Failed to add user');
        }
    };

    const handleChange = (e: any) => {
        const target = e.target;
        const value = target.name === 'poddy_trained' ? target.checked : target.value;
        const name = target.name;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        const errs = formValidate();
        if (Object.keys(errs).length === 0) {
            forNewUser ? postData(form) : putData(form);
        } else {
            setErrors({ errs });
        }
    };

    /* Makes sure user info is filled for the form */
    const formValidate = () => {
        const err: FormError = {} as FormError;
        if (!form.firstName) err.firstName = 'First name is required';
        if (!form.lastName) err.lastName = 'Last name is required';
        if (!form.email) err.email = 'Email is required';
        return err;
    };

    return (
        <>
            <form id={formId} onSubmit={handleSubmit} className='flex flex-col w-48'>
                <label htmlFor='firstName'>First Name</label>
                <input
                    className='text-black'
                    type='text'
                    maxLength={60}
                    name='firstName'
                    value={form.firstName}
                    onChange={handleChange}
                    required
                />

                <label htmlFor='lastName'>Last Name</label>
                <input
                    className='text-black'
                    type='text'
                    maxLength={60}
                    name='lastName'
                    value={form.lastName}
                    onChange={handleChange}
                    required
                />
                <label htmlFor='email'>Email</label>
                <input
                    className='text-black'
                    type='text'
                    maxLength={60}
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <button type='submit' className='btn'>
                    Submit
                </button>
            </form>
            <p>{message}</p>
            <div>
                {Object.keys(errors).map((err, index) => (
                    <li key={index}>{err}</li>
                ))}
            </div>
        </>
    );
};

export default Form;