const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// const { setSocket } = require('./socket');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const channelRoutes = require('./routes/channel-routes');

const { mongoUrl } = require('./config');

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/channels', channelRoutes);

app.use((error, req, res, next) => {
    const status = error.code || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({
        errorMessage: message
    });
});

const connection = (socket) => {
    console.log('New client connected: ', socket.id);
    setSocket(socket);
}

const startServer = ()=> {
    const server = app.listen(8080);
    console.log('Server working');
    // io = require('socket.io')(server);
    // io.on('connection', connection);
}

mongoose.connect(mongoUrl)
.then(() => {
    console.log('DB Connected!');
    startServer();
})
.catch(err => console.log("Mongo Connection Error: ", err));