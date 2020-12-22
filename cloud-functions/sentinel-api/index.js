const { Firestore } = require('@google-cloud/firestore');

const { projectsCountPath } = require('./utils.js');

// The live env already has the keys, test env needs some work
const firestore = process.env.TEST_ENV
  ? new Firestore({
      projectId: 'sentinel-api-dev',
      keyFilename:
        '/home/doug/code/projects/sentinel/cloud-functions/sentinel-api/secrets.json',
    })
  : new Firestore({
      projectId: process.env.GOOGLE_CLOUD_PROJECT || 'sentinel-api-dev',
    });

/**
 * Triggered by a change to a Firestore document.
 *
 * @param {!Object} event The Cloud Functions event.
 */
exports.incCount = async (event) => {
  // const triggerResource = event.resource;

  // console.log(
  //   `Function triggered by event on: ${JSON.stringify(triggerResource)}`
  // );
  // console.log(`Event type: ${event.eventType}`);

  // if (event.oldValue && Object.keys(event.oldValue).length) {
  //   console.log('\nOld value:');
  //   console.log(JSON.stringify(event.oldValue));
  // }

  if (event.value && Object.keys(event.value).length) {
    console.info('[ Project Creation ] => updating count...');
    const data = event.value.fields;

    const countCollection = firestore.collection(
      projectsCountPath(data.createdBy)
    );

    // Get existing doc if available
    const countDocRef = await countCollection.doc('projects');
    const countDoc = await countDocRef.get();

    // Pull data or init empty object
    const countData = countDoc.data() || {};

    // Set data
    const res = await countDocRef.set(
      {
        total: countData.total ? countData.total + 1 : 1,
      },
      { merge: true }
    );

    console.info('[ Project Creation ] => Done updating count');

    return res;
  }
};
