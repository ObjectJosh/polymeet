import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSearchParams } from 'next/navigation';
import Form from './Form';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn().mockReturnValue({
        get: jest.fn().mockReturnValue('123'),
    }),
    useRouter: jest.fn().mockReturnValue({
        push: jest.fn(),
    }),
}));

jest.mock('swr', () => ({
    mutate: jest.fn(),
}));

describe('Form Component', () => {
    const mockUserForm = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    };

    it('renders the form with initial values', () => {
        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={true} />);
        expect(screen.getByLabelText(/first name/i)).toHaveValue('John');
        expect(screen.getByLabelText(/last name/i)).toHaveValue('Doe');
        expect(screen.getByLabelText(/email/i)).toHaveValue('john.doe@example.com');
    });

    it('updates form values on change', () => {
        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={true} />);
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'Jane' } });
        expect(screen.getByLabelText(/first name/i)).toHaveValue('Jane');
    });

    it('validates the form and shows errors', () => {
        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={true} />);
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: '' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: '' } });
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });

    it('submits the form and calls postData for new user', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={true} />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(global.fetch).toHaveBeenCalledWith('/api/users', expect.any(Object));
    });

    it('submits the form and calls putData for existing user', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({}),
        });

        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={false} />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(global.fetch).toHaveBeenCalledWith('/api/users/123', expect.any(Object));
    });

    it('handles postData failure', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
        });

        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={true} />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Failed to add user')).toBeInTheDocument();
    });

    it('handles putData failure', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
        });

        render(<Form formId='test-form' userForm={mockUserForm} forNewUser={false} />);
        fireEvent.click(screen.getByRole('button', { name: /submit/i }));

        expect(await screen.findByText('Failed to update user')).toBeInTheDocument();
    });
});
