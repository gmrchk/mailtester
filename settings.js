const settings = {
    to: [
        ''                      // insert recipients here (example@example.com)
    ],
    encoding: 'utf-8',
    path: './output/',          // source path for email
    filename: 'index.html',     // source filename for email

    mail: {
        transport: 'SMTP',
        port: 465,
        from: '',               // your email address here (example@gmail.com)
        host: 'smtp.gmail.com', // for gmail only
        config: {
            service: 'Gmail',   // for gmail only
            auth: {
                user: '',       // your email address here
                pass: ''        // your password address here
            }
        },
        defaults: {
            from: ''            // your email address here
        }
    }
}

module.exports = settings;