require('dotenv').config();
const server = require('./app');
const mongoose = require('mongoose');
const chalk = require('chalk');
const emoji = require('node-emoji');

const port = process.env.PORT || 3001;
const dbURL = process.env.DB_URL || "localhost";
const dbPort = process.env.DB_PORT || 27018;
const dbName = process.env.DB_NAME || "testpassport";

server.listen(port, () => {
    mongoose.connect(`mongodb://${dbURL}:${dbPort}/${dbName}`, {useNewUrlParser: true}, err => {
        if (err) {
            throw err;
        }
        console.info(chalk.black.bgMagenta(`${emoji.get('heart')}   App running at ${port}  ${emoji.get('heart')}  
 Good luck! and remember: ${emoji.get('coffee')}   + ${emoji.get('smoking')}  = ${emoji.get('poop')}  `))
    });
});