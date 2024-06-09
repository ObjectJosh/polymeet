import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import CreateAccountWrapper from './page';

jest.mock('axios');
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('1'), // Mocking the page query parameter
  }),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock('@kinde-oss/kinde-auth-nextjs/components', () => ({
  RegisterLink: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('CreateAccount Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component and allows email input', () => {
    render(<CreateAccountWrapper />);
    expect(screen.getByText(/Create your account/i)).toBeInTheDocument();
    
    const emailInput = screen.getByLabelText(/Enter your email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@calpoly.edu' } });
    expect(emailInput).toHaveValue('test@calpoly.edu');
  });

  it('displays an error if required fields are missing on the last step', async () => {
    const { getByText, getByRole } = render(<CreateAccountWrapper />);

    // Advance to the last step without filling out required fields
    for (let i = 0; i < 4; i++) {
      fireEvent.click(getByRole('button', { name: /Next/i }));
    }

    fireEvent.click(getByRole('button', { name: /Ready to join!/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error: Missing required fields/i)).toBeInTheDocument();
    });
  });

  it('submits user data on the last step', async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ data: {} });

    const { getByRole, getByLabelText } = render(<CreateAccountWrapper />);

    // Fill out the form
    fireEvent.change(getByLabelText(/Enter your email address/i), { target: { value: 'test@calpoly.edu' } });
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.change(getByLabelText(/First name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last name/i), { target: { value: 'Doe' } });
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.change(getByLabelText(/Select your major/i), { target: { value: 'Computer Science' } });
    fireEvent.change(getByLabelText(/Select your year/i), { target: { value: 'First' } });
    fireEvent.click(getByRole('button', { name: /Choose my tags/i }));

    fireEvent.click(getByRole('button', { name: /Ready to join!/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/api/users', {
        email: 'test@calpoly.edu',
        firstName: 'John',
        lastName: 'Doe',
        major: 'Computer Science',
        year: 'First',
        hobbies: [],
        classes: [],
        clubs: [],
      });
    });
  });

  it('handles API errors gracefully', async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce({
      response: { data: { error: 'Unable to create account' } },
    });

    const { getByRole, getByLabelText } = render(<CreateAccountWrapper />);

    // Fill out the form
    fireEvent.change(getByLabelText(/Enter your email address/i), { target: { value: 'test@calpoly.edu' } });
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.change(getByLabelText(/First name/i), { target: { value: 'John' } });
    fireEvent.change(getByLabelText(/Last name/i), { target: { value: 'Doe' } });
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.click(getByRole('button', { name: /Next/i }));
    fireEvent.change(getByLabelText(/Select your major/i), { target: { value: 'Computer Science' } });
    fireEvent.change(getByLabelText(/Select your year/i), { target: { value: 'First' } });
    fireEvent.click(getByRole('button', { name: /Choose my tags/i }));

    fireEvent.click(getByRole('button', { name: /Ready to join!/i }));

    await waitFor(() => {
      expect(screen.getByText('Error: Unable to create account')).toBeInTheDocument();
    });
  });
});
