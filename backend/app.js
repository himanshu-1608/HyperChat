const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const channelRoutes = require('./routes/channel');
const messageRoutes = require('./routes/message');

const { MONGODB_URI } = require('./keyInfo');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/user', userRoutes);
app.use('/channel', channelRoutes);
app.use('/message', messageRoutes);

mongoose.connect(MONGODB_URI)
.then(() => {
    app.listen(8080);
    console.log('Connected!');
})
.catch(err => console.log(err));