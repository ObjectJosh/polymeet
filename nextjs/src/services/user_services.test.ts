import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { getAllUsers, createUser, findUserById, findUserByEmail, updateUserById, updateUserByEmail, deleteUserById, deleteUserByEmail } from './user_services';
import User from '../models/User';

console.log("Running user_services.test.ts");

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('User Services Test', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should retrieve all users', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        await createUser(userData);
        const users = await getAllUsers();
        expect(users).toHaveLength(1);
        expect(users[0].email).toBe(userData.email);
    });

    it('should create a new user', async () => {
        const userData = { email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe', password: 'password' };
        const user = await createUser(userData);
        expect(user._id).toBeDefined();
        expect(user.email).toBe(userData.email);
        expect(user.firstName).toBe(userData.firstName);
        expect(user.lastName).toBe(userData.lastName);
    });

    it('should find a user by email', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        await createUser(userData);
        const user = await findUserByEmail(userData.email);
        expect(user).not.toBeNull();
        if (user) {
            expect(user.email).toBe(userData.email);
        }
    });

    it('should find a user by ID', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        const newUser = await createUser(userData);
        const user = await findUserById(newUser._id);
        expect(user).not.toBeNull();
        if (user) {
            expect(user.email).toBe(userData.email);
        }
    });

    it('should update a user by ID', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        const newUser = await createUser(userData);
        const updatedUser = await updateUserById(newUser._id, { lastName: 'Smith' });
        expect(updatedUser).not.toBeNull();
        if (updatedUser) {
            expect(updatedUser.lastName).toBe('Smith');
        }
    });

    it('should update a user by email', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        await createUser(userData);
        const updatedUser = await updateUserByEmail(userData.email, { lastName: 'Smith' });
        expect(updatedUser).not.toBeNull();
        if (updatedUser) {
            expect(updatedUser.lastName).toBe('Smith');
        }
    });

    it('should delete a user by ID', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        const newUser = await createUser(userData);
        const deletedUser = await deleteUserById(newUser._id);
        expect(deletedUser).not.toBeNull();
        const user = await findUserByEmail(userData.email);
        expect(user).toBeNull();
    });

    it('should delete a user by email', async () => {
        const userData = { email: 'john@example.com', firstName: 'John', lastName: 'Doe', password: 'password' };
        await createUser(userData);
        const deletedUser = await deleteUserByEmail(userData.email);
        expect(deletedUser).not.toBeNull();
        const user = await findUserByEmail(userData.email);
        expect(user).toBeNull();
    });
});
