import { Storage } from '@google-cloud/storage';

import { getDecryptedSecret } from './firestore';

export const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  credentials: getDecryptedSecret(),
});
