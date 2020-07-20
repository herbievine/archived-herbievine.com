const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const sendMail = require('./functions/sendMail');
exports.sendMail = sendMail.sendMail;

const addProject = require('./functions/addProject');
exports.addProject = addProject.addProject;
