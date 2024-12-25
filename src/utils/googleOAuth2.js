// src/utils/googleOAuth2.js
import { OAuth2Client } from 'google-auth-library'
import createHttpError from 'http-errors';


const googleOAuth2Client = new OAuth2Client({
    clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    redirectUri: process.env.GOOGLE_AUTH_REDIRECT_URL,
})


export const generateAuthUr = () => {
    return googleOAuth2Client.generateAuthUrl({
        scope: [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ]
    })
}

export const validateCode = async (code) => {
    const response = await googleOAuth2Client.getToken(code);
    if (!response.tokens.id_token) throw createHttpError(401, 'Unauthorized');

    const ticket = await googleOAuth2Client.verifyIdToken({
        idToken: response.tokens.id_token,
    });
    return ticket;
};

export const getFullNameFromGoogleTokenPayload = (payload) => {
    let fullName = 'Guest';
    if (payload.given_name && payload.family_name) {
        fullName = `${payload.given_name} ${payload.family_name}`;
    } else if (payload.given_name) {
        fullName = payload.given_name;
    }

    return fullName;
}

