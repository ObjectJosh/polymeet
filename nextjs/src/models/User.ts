import mongoose from 'mongoose';

export interface User extends mongoose.Document {
    // _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    major?: string;
    year?: string;
    hobbies?: string[];
    classes?: string[];
    clubs?: string[];
    blockedUserIds?: string[];
    banned: boolean;
    createDate: Date;
    lastLoginDate?: Date;
}

const UserSchema = new mongoose.Schema<User>({
    /* _id: {
        type: String,
        required: [true, 'Please provide a user ID for this user.'],
        unique: true,
    }, */
    email: {
        type: String,
        required: [true, 'Please provide an email for this user.'],
        maxlength: [60, 'Email cannot be more than 60 characters'],
        unique: true,
    },
    firstName: {
        type: String,
        required: [true, 'Please provide a first name for this user.'],
        maxlength: [60, 'First name cannot be more than 60 characters'],
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name for this user.'],
        maxlength: [60, 'Last name cannot be more than 60 characters'],
    },
    major: {
        type: String,
        maxlength: [100, 'Major cannot be more than 100 characters'],
    },
    year: {
        type: String,
        maxlength: [20, 'Year cannot be more than 20 characters'],
    },
    hobbies: {
        type: [String],
    },
    classes: {
        type: [String],
    },
    clubs: {
        type: [String],
    },
    blockedUserIds: {
        type: [String],
    },
    banned: {
        type: Boolean,
        default: false,
    },
    createDate: {
        type: Date,
        required: [true, 'Please provide a creation date for this user.'],
        default: Date.now,
    },
    lastLoginDate: {
        type: Date,
    },
});

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
