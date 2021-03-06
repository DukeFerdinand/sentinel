import jwt from 'jsonwebtoken';
import { DefaultObject } from '../../@types/structures';

interface JWT_ENV {
  key: string;
  expires?: string | number;
  algorithm: 'HS256';
}

const getEnv = (): JWT_ENV => {
  if (process.env.JWT_KEY && process.env.JWT_EXPIRES) {
    return {
      key: process.env.JWT_KEY,
      expires: process.env.JWT_EXPIRES,
      algorithm: 'HS256',
    };
  }
  throw new Error('[JWT ERROR] JWT_KEY or JWT_EXPIRES missing in ENV');
};

export const sign = <T extends string | DefaultObject | Buffer>(
  payload: T,
  expiration: string | undefined = '7 days'
): string => {
  const { expires, key, algorithm } = getEnv();
  return jwt.sign(payload, key, {
    algorithm,
    expiresIn: expiration,
  });
};

export const validate = <T extends string | DefaultObject>(
  token: string
): T => {
  const { key, algorithm } = getEnv();
  return jwt.verify(token, key, {
    algorithms: [algorithm],
  }) as T;
};
