const functions = require('firebase-functions');

exports.sendMail = functions
    .region('us-central1', 'europe-west1')
    .https.onCall(async (data, context) => {
        const { kimp } = await require('kimp');
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

        const id = kimp.v4();

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
                            user: functions.config().email.email,
                            pass: functions.config().email.pass,
                        },
                    });

                    const mailOptions = {
                        from: `"${data.fullName}" <${data.email}>`,
                        to: functions.config().email.my-email,
                        subject: data.subject,
                        text: `Email: ${data.email} || Message: ${data.message}`,
                        html: template(
                            data.email,
                            data.message,
                            data.fullName,
                            id
                        ),
                    };

                    return transporter.sendMail(mailOptions, (e, i) => {
                        if (e) {
                            return reject(e);
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
