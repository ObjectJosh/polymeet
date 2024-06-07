import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { getAllUsers, createUser } from '@/services/user_services';

export async function GET() {
    await dbConnect();
    try {
        const users = await getAllUsers();
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
    try {
        const body = await req.json();
        const user = await createUser(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ success: false, error: error.message }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: 'Unknown error' }, { status: 400 });
    }
}