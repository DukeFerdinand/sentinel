import { FieldValue } from '@google-cloud/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

import { ApiKey, IssueType } from '../../@generated/graphql';
import { environmentsPath, keysPath } from '../../api/utils';
import { dbConnection } from '../../lib/firestore';

type AuthTuple = [string, string];

const createAuthTuple = (token: string): AuthTuple => {
  const tuple: AuthTuple = token.split('.') as AuthTuple;

  if (!tuple[0] || !tuple[1]) {
    throw new Error('Bad token input');
  }

  return tuple;
};

const getTokenInfo = async (
  projectId: string,
  token: string
): Promise<ApiKey> => {
  const collection = dbConnection().collection(keysPath(projectId));

  const tokenDocs = await collection
    .where('token', '==', token)
    .select('environment', 'name')
    .get();

  if (tokenDocs.empty) {
    throw new Error('Token revoked or invalid');
  }

  const tokenDoc = tokenDocs.docs[0];

  return {
    ...tokenDoc.data(),
    id: tokenDoc.id,
    // To avoid null errors in GQL
    token: '',
  } as ApiKey;
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'Only POST method allowed',
    });
  }

  if (!req.headers.authorization) {
    return res.status(403).json({
      message: 'Authorization token missing or invalid',
    });
  }

  try {
    // First try to parse given auth string
    const [projectId, token] = createAuthTuple(req.headers.authorization);

    // If expected format, try to get data with it
    const tokenInfo = await getTokenInfo(projectId, token);

    // Everything good, get envCollection. Select env doc and issues
    const envCollection = dbConnection().collection(
      environmentsPath(projectId)
    );
    const envDoc = envCollection.doc(tokenInfo.environment);
    const issues = envDoc.collection('issues');

    // TODO: Add req body validation
    console.info(req.body);

    // Create document for new issue
    const issueDoc = issues.doc();
    await issueDoc.create(req.body);

    // Issue created, update the total count for given environment
    envDoc.set(
      {
        total: FieldValue.increment(1),
      },
      { merge: true }
    );

    return res.status(200).json({
      id: issueDoc.id,
    });
  } catch (e) {
    // Token could not be parsed into expected parts
    if (
      e.message === 'Bad token input' ||
      e.message === 'Token revoked or invalid'
    ) {
      return res.status(403).json({
        message: 'Auth token invalid or revoked',
      });
    }

    console.error(e);
    res.status(500).send('Something went wrong');
  }
}
