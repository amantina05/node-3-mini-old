const express = require('express');
const bodyParser = require('body-parser');
const mc = require(`./controllers/messages_controller`);
// const port = 1337;
const session = require('express-session');
const createInitialSession = require('./middlewares/session.js');
const filter = require('./middlewares/filter.js');
//config dotenv to use with your secret sesion
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10000 },
  })
);

//add middleware to app that captures req, res and next & calls createIntialSession with req, res & next as args
app.use((rea, res, next) => createInitialSession(req, res, next));
//add middleware to app that captures req, res and next
app.use((req, res, next) => {
  //checks if method request is POST or PUT
  //if it is POST OR PUT call filter with req, res and next
  //otherwise invoke next
  const { method } = req;
  if (method === 'POST' || method === 'PUT') {
    filter(req, res, next);
  } else {
    next();
  }
});

const messagesBaseUrl = '/api/messages';
app.post(messagesBaseUrl, mc.create);
app.get(messagesBaseUrl, mc.read);
//create a get endpoint, that callls the history method from the messages controller
app.get(`${messagesBaseUrl}/history`, mc.history);
app.put(`${messagesBaseUrl}`, mc.update);
app.delete(`${messagesBaseUrl}`, mc.delete);

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}.`);
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
