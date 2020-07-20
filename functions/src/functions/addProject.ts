import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

type Data = {
    title: string;
    desc: string;
    github: string;
    url: URL;
};

const addProject: Function = functions
    .region('us-central1', 'europe-west1')
    .https.onCall(async (data: Data) => {
        const { kimp } = require('kimp');
        const moment = require('moment');

        const db = admin.firestore();

        const pattern = new RegExp(
            '^(https?:\\/\\/)?' +
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
                '((\\d{1,3}\\.){3}\\d{1,3}))' +
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
                '(\\?[;&a-z\\d%_.~+=-]*)?' +
                '(\\#[-a-z\\d_]*)?$',
            'i'
        );

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
                    urlGithub: `
                        https://herbievine.com/redirect?t=
                            ${encodeURI(
                                pattern.test(data.github)
                                    ? data.github
                                    : `https://github.com/herbievine/${data.github}`
                            )}
                    `,
                    urlProject: data.url,
                })
                .then(() => {
                    resolve({
                        status: 200,
                    });
                })
                .catch((e: Error) => {
                    reject(e);
                });
        });
    });

export { addProject };
