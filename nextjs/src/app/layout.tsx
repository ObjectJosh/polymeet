'use client';
// import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
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
        <html lang='en'>
            <KindeProvider
                clientId='6bc13eb11a624633b2c640ad80ec5244'
                domain='https://polymeet.kinde.com'
                logoutUri='http://localhost:3000'
                redirectUri='http://localhost:3000/chat'
            >
                <body className={inter.className}>{children}</body>
            </KindeProvider>
        </html>
    );
}
