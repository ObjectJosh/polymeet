import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
    await dbConnect();
    try {
        const users = await User.find({}); // Find all users
        return NextResponse.json({ success: true, data: users.map((user) => user.appeal) }); // Extract appeals from users
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { email, appealText } = await req.json(); // Extract email and appeal from the request body
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        user.appeal = appealText; // Update the user's appeal with the provided text
        await user.save();
        return NextResponse.json({ success: true, data: user.appeal }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
}
