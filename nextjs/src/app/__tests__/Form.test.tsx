import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import Form from '../components/Form';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => ({
        get: jest.fn(),
    })),
}));

jest.mock('swr', () => ({
    mutate: jest.fn(),
}));

describe('Form Component', () => {
    const mockPush = jest.fn();
    const mockMutate = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
        (mutate as jest.Mock).mockImplementation(mockMutate);
        fetchMock.resetMocks();
    });

    const userForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    };

    const setup = (props = {}) => {
        return render(<Form formId='test-form' userForm={userForm} forNewUser={true} {...props} />);
    };

    it('renders form fields correctly', () => {
        setup();
        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    });

    it('shows validation errors when form is submitted without required fields', async () => {
        setup({ userForm: { firstName: '', lastName: '', email: '' } });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));
        await waitFor(() => {
            expect(screen.getByText('First name is required')).toBeInTheDocument();
            expect(screen.getByText('Last name is required')).toBeInTheDocument();
            expect(screen.getByText('Email is required')).toBeInTheDocument();
        });
    });

    it('calls postData function on form submission for new user', async () => {
        setup();
        fetchMock.mockResponseOnce(JSON.stringify({ data: userForm }), { status: 201 });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith(
            '/api/users',
            expect.objectContaining({
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userForm),
            })
        );
    });

    it('calls putData function on form submission for existing user', async () => {
        setup({ forNewUser: false });
        fetchMock.mockResponseOnce(JSON.stringify({ data: userForm }), { status: 200 });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

        expect(fetch).toHaveBeenCalledWith(
            '/api/users/null',
            expect.objectContaining({
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userForm),
            })
        );
    });

    it('shows success message and redirects on successful post', async () => {
        setup();
        fetchMock.mockResponseOnce(JSON.stringify({ data: userForm }), { status: 201 });
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
    });

    it('shows error message on failed post', async () => {
        setup();
        fetchMock.mockReject(new Error('Failed to add user'));
        fireEvent.click(screen.getByRole('button', { name: /Submit/i }));

        await waitFor(() => expect(screen.getByText('Failed to add user')).toBeInTheDocument());
    });
});
