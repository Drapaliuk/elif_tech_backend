const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const isAuthorization = require('./middlewares/is_authorizathison');
const authRouter = require('./routes/auth/router')
const errorHandler = require('./errors_handlers/errors_handler');
const notFound = require('./errors_handlers/404');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}

app.use(cors(corsOptions));
app.use('/auth', authRouter)

app.use(notFound);
app.use(errorHandler)

module.exports = app;