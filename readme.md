# mailtester

## installation
Before first email, mail tester must be setup to use appropriate mail server in `settings.js` file. 
By default `settings.js` file is ready for gmail account (only username and password required), 
but any other mail server is supported ([nodemailer](https://www.npmjs.com/package/nodemailer#sponsors) is used to actually send emails).

## Usage

### npm test
Sends email, where source file is defined in `settings.js` file.
Non-absolute images must be linked relatively to the file (without './').

### npm start
Starts browserSync on port 3000 with source folder defined in `settings.js`. HTML gets updated in browser on save of file without reload.