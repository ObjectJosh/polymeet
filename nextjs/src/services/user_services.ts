import User, { User as UserType } from '../models/User';

export async function getAllUsers(): Promise<UserType[]> {
    return await User.find({});
}

export async function createUser(userData: Partial<UserType>): Promise<UserType & {_id: string}> {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser as UserType & {_id: string};
}

export async function findUserById(id: string): Promise<UserType | null> {
    return await User.findById(id);
}

export async function findUserByEmail(email: string): Promise<UserType | null> {
    return await User.findOne({ email });
}

export async function updateUserById(id: string, updateData: Partial<UserType>): Promise<UserType | null> {
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
}

export async function updateUserByEmail(email: string, updateData: Partial<UserType>): Promise<UserType | null> {
    return await User.findOneAndUpdate({ email }, updateData, { new: true, runValidators: true });
}

export async function deleteUserById(id: string): Promise<UserType | null> {
    return await User.findByIdAndDelete(id);
}

export async function deleteUserByEmail(email: string): Promise<UserType | null> {
    return await User.findOneAndDelete({ email });
}
