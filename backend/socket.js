const channel = require('./models/channel');
const User = require('./models/user');

let io;

let count = 0;

module.exports.init = server => {
  
    io = require('socket.io')(server);
    console.log('io established ', io);
    
    io.on('connection', client => {
      // count++;
      // if(count == 1)
        // console.log(client);
      console.log('Client connected!', client.id);

      client.on('USER_JOINED', data => {
        console.log('Triggered!');
        const { channelIds, userId } = data;  
        client.userId = userId;
        console.log('client userid', client.userId);
        client.join(userId);
        channelIds.map( id => client.join(id));
        console.log('client rooms: ', client.rooms);
        User.findById(userId).then(user => {
          if(!user){
            throw new Error('User not found');
          }
          user.lastSeen = 'online';
          return user.save();
        })
        .then(user => console.log())
        .catch(err => console.log(err));              // change error handling later
      });

      client.on('TYPING', data => {
        console.log('typing called', data);
        const { senderID, friendID, channelID } = data;
        if(data.friendID != ''){
          // console.log('chlo');
          io.to(data.friendID).emit('TYPING_DM', {
            senderID: senderID,
            receiverID: friendID
          });
        }
        else if(data.channelID != ''){
          io.to(data.channelID).emit('TYPING_CHANNEL', {
            senderID: senderID,
            receiverID: channelID
          });
        }
      });

      client.on('STOP_TYPING', data => {
        console.log('stop typing called', data);
        const { senderID, friendID, channelID } = data;
        if(data.friendID != ''){
          io.to(data.friendID).emit('STOP_TYPING_DM', {
              senderID: senderID,
              receiverID: friendID
          });
        }
        else if(data.channelID != ''){
          io.to(data.channelID).emit('STOP_TYPING_CHANNEL', {
            senderID: senderID,
            receiverID: channelID
          });
        }
      })

      client.on('disconnecting', () => {
        console.log('Disconnected called');
        console.log('client userid disconnect: ', client.userId);

        User.findById(client.userId)
        .then(user => {
          if(!user){
            // throw new Error();
            return;
          }
          user.lastSeen = new Date().toString();
          return user.save();
        })
        .then(user => console.log('User after disconneting: ', user))
        .catch(err => console.log(err));
        // console.log(client.adapter);
      })
    });
}

module.exports.getIO = () => {
  if (!io) {
    console.log('io while returning is: ', io);
    return null;
    // throw new Error('Socket.io not initialized!');
  }
  return io;
}


