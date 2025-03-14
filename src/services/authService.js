// src/services/authService.js
const { OAuth2Client } = require('google-auth-library');
const { producer } = require('../config/kafka');

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const loginUser = async (token) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID
        });
        const payload = ticket.getPayload();
        const email = payload.email;

        await producer.send({
            topic: 'user-logins',
            messages: [{ value: JSON.stringify({ email, name: payload.name, timestamp: new Date() }) }]
        });

        return { email, name: payload.name };
    } catch (error) {
        console.error('Error logging in user:', error);
        throw new Error('Authentication failed');
    }
};

module.exports = { loginUser };
