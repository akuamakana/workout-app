import { User } from '@models/User';
import { v4 } from 'uuid';
import redis from './redis';
import { sendEmail } from './sendEmail';

const sendVerificationEmail = async (user: User) => {
  const token = v4();
  const message = `Click here to confirm your account. This link will expire in 24 hours.`;
  const link = `http://localhost:3000/confirm-account?token=${token}&email=${user.email}`;

  await redis.set(token, user.email, 'EX', 60 * 24);
  await sendEmail(user.email, message, link);
};

export default sendVerificationEmail;
