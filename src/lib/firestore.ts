import { Firestore } from '@google-cloud/firestore';

export const dbConnection = (): Firestore =>
  new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_CREDENTIALS,
  });
