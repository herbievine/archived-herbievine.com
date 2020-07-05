const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.getTweets = functions.https.onCall(async (data, context) => {
    const Twitter = require('twitter');

    const client = new Twitter({
        consumer_key: functions.config().twitter.api_key,
        consumer_secret: functions.config().twitter.api_secret_key,
        access_token_key: functions.config().twitter.access_token,
        access_token_secret: functions.config().twitter.access_token_secret,
    });

    const params = { screen_name: data.username };

    return new Promise((resolve, reject) => {
        client.get(
            'statuses/user_timeline',
            params,
            (error, tweets, response) => {
                if (error) {
                    return reject(error);
                }

                return resolve(tweets);
            }
        );
    });
});

exports.addProject = functions.region('us-central1', 'europe-west1').https.onCall(async (data, context) => {
    const { v4: uuidv4 } = require('uuid');
    const moment = require('moment');

    const db = admin.firestore();

    const id = uuidv4();

    return new Promise((resolve, reject) => {
        db.collection('projects')
            .doc(id)
            .set({
                id: id,
                createdAt: moment().format('MMMM Do YYYY'),
                title: data.title,
                description: data.desc,
                urlPortfolio: `https://herbievine.com/work/${id}`,
                urlGithub: `https://herbievine.com/redirect?t=${encodeURI(`https://github.com/herbievine/${data.github}`)}`,
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
    })
});

exports.sendMail = functions.region('us-central1', 'europe-west1').https.onCall(async (data, context) => {
    const { v4: uuidv4 } = await require('uuid');
    const moment = await require('moment');
    const nodemailer = await require('nodemailer');
    const cors = await require('cors')({ origin: true });

    const template = (email, message, fullName, ref) => {
        return `
            <div style="
                color: #333333;
                font-weight: bold;
                text-align: center;
                font-family: 'Open Sans', sans-serif;
                margin: 30px 0;
                padding: 30px;
            ">
                <h1>You've received a message from ${fullName}</h1>
                <h3 style="
                    padding-bottom: 20px;
                    width: 50%;
                    margin: 0 25%;
                    border-bottom: 1px #333333 solid;
                ">
                    FROM: 
                    <span style="font-weight: lighter !important;">
                        ${email}
                    </span>
                </h3>
                <h3>MESSAGE:</h3>
                <p style="text-align: justify-all !important;">${message}</p>
                <a href="https://console.firebase.google.com/u/0/project/vineherbie-a383a/database/firestore/data~2Fmail~2F${ref}" target="_BLANK">See in Firestore</a>
            </div>
        `;
    };

    const db = admin.firestore();

    const id = uuidv4();

    return new Promise((resolve, reject) => {
        db.collection('mail')
            .doc(id)
            .set({
                id: id,
                sentAt: moment().format('MMMM Do YYYY'),
                fullName: data.fullName,
                email: data.email,
                subject: data.subject,
                message: data.message,
            })
            .then(() => {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'herbievine.contact@gmail.com',
                        pass: functions.config().pass,
                    }
                });

                const mailOptions = {
                    from: `"${data.fullName}" <${data.email}>`,
                    to: 'vineherbie@gmail.com',
                    subject: data.subject,
                    text: `Email: ${data.email} || Message: ${data.message}`,
                    html: template(data.email, data.message, data.fullName, id),
                };

                return transporter.sendMail(mailOptions, (e, i) => {
                    if (e) {
                        return reject(e)
                    } else {
                        return resolve({
                            status: 200,
                        });
                    }
                });
            })
            .catch(e => {
                return reject(e);
            });
    });
});
