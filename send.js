const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const SETTINGS = require('./settings');
const fs = require('fs');
let attachments = [];

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

// attachments
fs.readFile(SETTINGS.path + SETTINGS.filename, SETTINGS.encoding, function read(err, data) {
    if (err) {
        throw err;
    }
    console.log('Source file: ' + SETTINGS.path + SETTINGS.filename);
    console.log('Attachments:');
    // TODO replaceAll and Regex are not really best solutions here...
    var regExp = /src\s*=\s*"?(.+?)["|\s]/g, match;
    while (match = regExp.exec(data)) {
        if (!match[1].startsWith('http')) {
            attachments.push({
                path: SETTINGS.path + match[1],
                cid: match[1]
            });
            console.log(SETTINGS.path + match[1]);
            match[1] = "cid:" + match[1];
        } else {
            console.log("skipped - " + match[1]);
        }
    }
    data = data.replaceAll('src="', 'src="cid:');
    data = data.replaceAll('src="cid:http', 'src="http');
    send(data);
});

function send(content) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SETTINGS.mail.config.auth.user,
            pass: SETTINGS.mail.config.auth.pass
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'Testmail ' + SETTINGS.mail.from,
        to: SETTINGS.to,
        subject: 'Testmail',
        html: content,
        attachments: attachments
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent.');
    });
}