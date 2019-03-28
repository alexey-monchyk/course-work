const express = require('express');
const expressValidator = require('express-validator');
const { json, urlencoded } = require('body-parser');
const path = require('path');
const { readdirSync } = require('fs');
const cors = require('cors');
const validator = require('./server/middlewares/validator');
require('dotenv').config();
require('express-async-errors');
require('./server/models');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, '/public')));
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(expressValidator());
app.use(validator);

readdirSync('./server/routes')
    .forEach(file => app.use(`/${file.replace('.route.js', '')}`, require(`./server/routes/${file}`)));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(`${__dirname}/client/build/index.html`));
// });

app.use((err, req, res, next) => {
    if (err.message) {
        res.status(403);
        res.json({ error: err.message });
    }

    next(err);
});

module.exports = app;
