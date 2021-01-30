const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const isAuthorization = require('./middlewares/is_authorizathison');
const authRouter = require('./routes/auth/router');
const checkOutAuthMiddleware = require('./routes/auth/check_out_auth');
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
app.use('/test', (req, res) => {
  res.send('Hello server!!--!!')
})
app.use('/auth', authRouter) //як це виправити?
app.use('/', isAuthorization)
app.post('/auth/check-out-auth', checkOutAuthMiddleware)




app.use(notFound);
app.use(errorHandler)

module.exports = app;