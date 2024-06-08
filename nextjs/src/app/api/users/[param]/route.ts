import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { findUserById, findUserByEmail, updateUserById, updateUserByEmail, deleteUserById, deleteUserByEmail } from '../../../../services/user_services';

export async function GET(req, { params }) {
    const { param } = params;
    await dbConnect();
    try {
        let user;
        if (param.includes('@')) {
            user = await findUserByEmail(param);
        } else {
            user = await findUserById(param);
        }
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(req, { params }) {
    const { param } = params;
    await dbConnect();
    const body = await req.json();
    try {
        let user;
        if (param.includes('@')) {
            user = await updateUserByEmail(param, body);
        } else {
            user = await updateUserById(param, body);
        }
        if (!user) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: user });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req, { params }) {
    const { param } = params;
    await dbConnect();
    try {
        let deletedUser;
        if (param.includes('@')) {
            deletedUser = await deleteUserByEmail(param);
        } else {
            deletedUser = await deleteUserById(param);
        }
        if (!deletedUser) {
            return NextResponse.json({ success: false, error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}