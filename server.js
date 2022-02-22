require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const router = require('./routes/index.js');

const PORT = process.env.PORT || 3000;

const sessionObj = {
  secret: 'kong',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({ checkPeriod: 1000 * 60 * 5 }),
  cookie: {
    maxAge: 1000 * 60 * 5,
  },
};

const app = express();

app.set('view engine', 'html');
nunjucks.configure('views', { express: app });

app.use(express.static('public'));

app.use(session(sessionObj));

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT);
