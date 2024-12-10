// src/services/auth.js
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/User.js';
import createHttpError from 'http-errors';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { Session } from '../db/models/Session.js';


// Створення користувача  якщо його немає
//register
export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};


//login
export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({userId: user._id});

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now()+ FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now()+ ONE_DAY),
  });
};

//logout

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({_id: sessionId});
};
