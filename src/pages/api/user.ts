import { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../store';

export default function (
  req: NextApiRequest,
  res: NextApiResponse<User>
): void {
  res.json({
    username: 'Duke_Ferdinand',
  });
}
