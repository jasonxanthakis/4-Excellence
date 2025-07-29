const fs = require('fs');
const path = require('path');
require("dotenv").config(); 

const sql = fs.readFileSync(__dirname + '/setup.sql').toString();

const db = require("./connect");

async function setUpAll() {
    await db.query(sql)
        .then(data => console.log("Set-up complete."))
        .catch(error => console.log(error));

    const questions = require('./dump-questions.js');
    filepath = path.join(__dirname, '..', '..', 'server', 'db', 'questions', 'test.json');

    await db.query(questions(filepath))
        .then(data => {
            console.log('Database seeded.');
        })
        .catch(error => console.log(error));

    db.end();
};

setUpAll();