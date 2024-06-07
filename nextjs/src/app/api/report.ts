import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { findUserById, updateUserById } from '../../services/user_services';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { reportedUserId } = req.body;

                const reportedUser = await findUserById(reportedUserId);
                if (!reportedUser) {
                    return res.status(404).json({ success: false, error: 'User not found' });
                }

                reportedUser.numReports += 1;
                if (reportedUser.numReports >= 3) {
                    reportedUser.banned = true;
                }
                reportedUser.blockedUserIds.push(req.user._id);

                const updatedUser = await updateUserById(reportedUserId, reportedUser);
                return res.status(200).json({ success: true, data: updatedUser });
            } catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        default:
            return res.status(405).json({ success: false, error: `Method ${method} not allowed` });
    }
}