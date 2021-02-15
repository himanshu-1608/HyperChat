const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { setIo } = require('./socket');
const authRoutes = require('./routes/auth-routes');
const userRoutes = require('./routes/user-routes');
const channelRoutes = require('./routes/channel-routes');
const { updateUserDeliveredTimes, findUserChannels, updateUserLastSeen } = require('./utils/db-utils');
const { mongoUrl } = require('./config');

const app = express();
let io;

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
    setIo(io);
    socket.on('USER_JOINED', async userID => {
        socket.join(userID);
        socket.userID = userID;
        const channelIDs = await findUserChannels(userID);
        if(channelIDs) channelIDs.map(channelID => socket.join(''+channelID));
        updateUserDeliveredTimes(userID);
    });

    socket.on('TYPING', data => {
        const { receiverID } = data;
        socket.to(receiverID).emit('TYPING', data);
    })

    socket.on('STOP_TYPING', data => {
        const { receiverID } = data;
        socket.to(receiverID).emit('STOP_TYPING', data);
    })

    socket.on('disconnect', (reason) => {
        console.log('why disconnect: ', reason);
        updateUserLastSeen(socket.userID);
    })
}

const startServer = ()=> {
    const server = app.listen(8080);
    console.log('Server working');
    io = require('socket.io')(server);
    io.on('connection', connection);
}

mongoose.connect(mongoUrl)
.then(() => {
    console.log('DB Connected!');
    startServer();
})
.catch(err => console.log("Mongo Connection Error: ", err));