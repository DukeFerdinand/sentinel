import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../@generated/graphql';
import { TokenStatus } from '../../@types/structures';
import { validate } from '../../api/utils/jwt';
import { dbConnection } from '../../lib/firestore';
import { getCookies } from '../../utils/cookies';

interface InvalidToken {
  error: string;
  code: TokenStatus;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<User | InvalidToken>
): Promise<void> {
  const cookies = getCookies<{ api_token: string }>(req.headers.cookie);

  // General catcher in case there's no token
  if (!req.headers.cookie || !cookies?.api_token) {
    console.info('[ TOKEN MISSING ]');
    return res.status(401).json({
      error: 'Token missing',
      code: TokenStatus.Missing,
    });
  } else {
    try {
      const validUser = validate<User>(cookies.api_token || '');
      const userRef = dbConnection().collection('users').doc(validUser.id);

      // At this point the user data is WORKING, so assume it's good and try to find the data
      const userData = await userRef.get();

      // Partial so we can delete the password
      const data = userData.data() as Partial<User>;

      // This isn't a Graphql route, so we need to manually delete the password
      delete data.password;

      res.status(200).json({ ...data, id: userRef.id } as User);
    } catch (error) {
      // Error message is 'jwt expired'
      if (error.message.includes('expired')) {
        res.status(401).json({
          error: 'Token expired',
          code: TokenStatus.Expired,
        });
      } else {
        // Even if the user data is invalid, that technically falls under "bad token"
        res.status(401).json({
          error: 'Token invalid',
          code: TokenStatus.Invalid,
        });
      }
    }
  }
}
