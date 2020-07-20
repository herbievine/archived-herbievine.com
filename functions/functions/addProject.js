const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.addProject = functions
    .region('us-central1', 'europe-west1')
    .https.onCall(async (data, context) => {
        const { kimp } = require('kimp');
        const moment = require('moment');

        const db = admin.firestore();

        const id = kimp.v4();

        return new Promise((resolve, reject) => {
            db.collection('projects')
                .doc(id)
                .set({
                    id: id,
                    createdAt: moment().format('MMMM Do YYYY'),
                    title: data.title,
                    description: data.desc,
                    urlPortfolio: `https://herbievine.com/work/${id}`,
                    urlGithub: `https://herbievine.com/redirect?t=${encodeURI(
                        `https://github.com/herbievine/${data.github}`
                    )}`,
                    urlProject: data.url,
                })
                .then(() => {
                    return resolve({
                        status: 200,
                    });
                })
                .catch(e => {
                    console.log(e);
                    return reject(e);
                });
        });
    });