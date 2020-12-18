import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../@generated/graphql';
import { validate } from '../../api/utils/jwt';
import { getCookies } from '../../utils/cookies';

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<User>
): Promise<void> {
  const cookies = getCookies<{ api_token: string }>(req.headers.cookie);
  const result = await validate(cookies.api_token);
  console.info(result);
  res.status(200);
}
