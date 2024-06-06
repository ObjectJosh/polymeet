import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { IError } from '@/types/types';

export async function GET() {
    await dbConnect();
    try {
        const users = await User.find({}); // Find all users
        return NextResponse.json({ success: true, data: users });
    } catch (error: IError){
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const user = await User.create(body); // Create a new user
        return NextResponse.json({ success: true, data: user }, { status: 201 });
    } catch (error: IError) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
