import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

/* Get a user by their ID or email */
export async function GET(req, { params }) {
    const { param } = params;
    await dbConnect();
    try {
        let user;
        if (param.includes('@')) {
            // If the parameter includes '@', it's likely an email
            user = await User.findOne({ email: param });
        } else {
            // Otherwise, treat it as an ID
            user = await User.findById(param);
        }
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

/* Edit a user by their ID or email */
export async function PUT(req, { params }) {
    const { param } = params;
    await dbConnect();
    const body = await req.json();
    try {
        let user;
        if (param.includes('@')) {
            // If the parameter includes '@', it's likely an email
            user = await User.findOneAndUpdate({ email: param }, body, {
                new: true,
                runValidators: true,
            });
        } else {
            // Otherwise, treat it as an ID
            user = await User.findByIdAndUpdate(param, body, {
                new: true,
                runValidators: true,
            });
        }
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

/* Delete a user by their ID or email */
export async function DELETE(req, { params }) {
    const { param } = params;
    await dbConnect();
    try {
        let deletedUser;
        if (param.includes('@')) {
            // If the parameter includes '@', it's likely an email
            deletedUser = await User.deleteOne({ email: param });
        } else {
            // Otherwise, treat it as an ID
            deletedUser = await User.deleteOne({ _id: param });
        }
        if (!deletedUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
