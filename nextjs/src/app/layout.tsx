'use client';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// };

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className='dark'>
            <KindeProvider
                clientId={process.env.NEXT_PUBLIC_KINDE_CLIENT_ID}
                domain={process.env.NEXT_PUBLIC_KINDE_ISSUER_URL}
                logoutUri={process.env.NEXT_PUBLIC_KINDE_POST_LOGOUT_REDIRECT_URL}
                redirectUri={process.env.NEXT_PUBLIC_KINDE_POST_LOGIN_REDIRECT_URL}
            >
                <body className={inter.className}>
                    {children}
                    <Toaster />
                </body>
            </KindeProvider>
        </html>
    );
}
