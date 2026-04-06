const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const User = require('../../models/User');

let mongod;

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
});

afterEach(async () => {
    await User.deleteMany({});
});

describe('Register user', () => {

    test('POST /api/auth/register - should register a new user successfully', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
        expect(res.body.message).toBe('Registration successful. Please verify your email address.');
        expect(res.body.user).toMatchObject({
            name: 'kinuthia mungai',
            email: 'allankinuthia68@gmail.com',
            role: 'user',
            isEmailVerified: false
        });
    });

    test('POST /api/auth/register - should fail if user already exists', async () => {
        // First registration
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        // Second registration with same email
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('User already exists');
    });

    test('POST /api/auth/register - should fail if required fields are missing', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                email: 'allankinuthia68@gmail.com'
                // missing name and password
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

});

describe('Login user', () => {

    test('POST /api/auth/login - should fail if email is not verified', async () => {
        // Register first
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        // Try to login without verifying email
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.requiresVerification).toBe(true);
    });

    test('POST /api/auth/login - should login successfully when email is verified', async () => {
        // Register
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        // Manually verify the user in the DB (bypass email)
        await User.findOneAndUpdate(
            { email: 'allankinuthia68@gmail.com' },
            { isEmailVerified: true }
        );

        // Login
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe('allankinuthia68@gmail.com');
    });

    test('POST /api/auth/login - should fail with wrong password', async () => {
        await request(app)
            .post('/api/auth/register')
            .send({
                name: 'kinuthia mungai',
                email: 'allankinuthia68@gmail.com',
                password: 'Kinuthia12345'
            });

        await User.findOneAndUpdate(
            { email: 'allankinuthia68@gmail.com' },
            { isEmailVerified: true }
        );

        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'allankinuthia68@gmail.com',
                password: 'wrongpassword'
            });

        expect(res.statusCode).toBe(401);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Invalid credentials');
    });

});