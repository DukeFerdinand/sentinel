import crypto from 'crypto';
import { Firestore } from '@google-cloud/firestore';

export const getDecryptedSecret = (): Record<string, unknown> => {
  if (
    process.env.GCLOUD_ENCRYPTION_KEY &&
    process.env.GCLOUD_ENCRYPTION_IV &&
    process.env.GCLOUD_CREDENTIALS
  ) {
    const algorithm = 'aes-128-cbc';
    const decipher = crypto.createDecipheriv(
      algorithm,
      process.env.GCLOUD_ENCRYPTION_KEY,
      process.env.GCLOUD_ENCRYPTION_IV
    );
    let decrypted = decipher.update(
      process.env.GCLOUD_CREDENTIALS,
      'base64',
      'utf8'
    );

    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
  } else {
    throw new Error('[GCLOUD CREDS] Missing GCloud creds, please check env');
  }
};

export const dbConnection = (): Firestore => {
  return new Firestore({
    projectId: process.env.GCLOUD_PROJECT_ID,
    credentials: getDecryptedSecret(),
  });
};
