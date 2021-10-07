const express = require('express');
const path = require('path');
const config = require('config');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const expressBusboy = require('express-busboy');
const mongoose = require('mongoose');
const api = require('./routes');

const app = express();

mongoose.connect(config.get('MONGODB.HOST'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/apidoc', express.static('apidoc'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({
    extended: false,
    limit: '50mb',
}));
expressBusboy.extend(app, {
    upload: true,
});

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));

app.use('/', api);

module.exports = app;
