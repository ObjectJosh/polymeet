import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
    const { method } = req;

    await dbConnect();

    switch (method) {
        case 'POST':
            try {
                const { reportedUserId } = req.body;

                // Find the user being reported and update their numReports field
                const reportedUser = await User.findById(reportedUserId);
                if (!reportedUser) {
                    return res.status(404).json({ success: false, error: 'User not found' });
                }

                // Update numReports and check if it reaches 3
                reportedUser.numReports += 1;
                if (reportedUser.numReports >= 3) {
                    reportedUser.banned = true;
                }

                // Update blockedUserIds
                reportedUser.blockedUserIds.push(req.user._id);

                // Save the changes to the user
                await reportedUser.save();

                return res.status(200).json({ success: true, data: reportedUser });
            } catch (error) {
                return res.status(500).json({ success: false, error: error.message });
            }
        default:
            return res.status(405).json({ success: false, error: `Method ${method} not allowed` });
    }
}
