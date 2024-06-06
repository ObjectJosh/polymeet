import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET() {
    await dbConnect();
    try {
        const users = await User.find({}); /* find all the data in our database */
        return NextResponse.json({ success: true, data: users });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    try {
        const user = await User.create(body); /* create a new model in the database */
        return NextResponse.json(user, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
}
