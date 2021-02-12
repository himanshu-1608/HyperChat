// module.exports = {
//   init: httpServer => {
//     return require('socket.io')(httpServer);
//   }
// };

let socket;

exports.setSocket = (currSocket) => {
  socket = currSocket;
}

exports.getSocket = () => socket;