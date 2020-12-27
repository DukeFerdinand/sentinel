import { NextApiRequest, NextApiResponse } from 'next';

export default function (req: NextApiRequest, res: NextApiResponse): void {
  if (!req.headers.authorization) {
    res.status(403).json({
      message: 'Authorization token missing or invalid',
    });
    return;
  }
  res.json({
    message: 'graphql!',
  });
}
