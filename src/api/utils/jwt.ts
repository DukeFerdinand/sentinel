import { err, ok, Result } from '@dukeferdinand/ts-results';
import jwt from 'jsonwebtoken';
import { DefaultObject } from '../../@types/structures';

interface JWT_ENV {
  key: string;
  expires: string | number;
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
  payload: T
): string => {
  const { expires, key, algorithm } = getEnv();
  return jwt.sign(payload, key, {
    algorithm,
    expiresIn: expires,
  });
};

export const validate = async <T extends string | DefaultObject>(
  token: string
): Promise<Result<T, Error>> => {
  const { key, algorithm } = getEnv();
  return new Promise((res, rej) => {
    jwt.verify(
      token,
      key,
      {
        algorithms: [algorithm],
      },
      (error, obj) => {
        if (error) {
          rej(err(error));
        } else {
          res(ok(obj as T));
        }
      }
    );
  });
};
