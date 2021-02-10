module.exports = {
  init: httpServer => {
    return require('socket.io')(httpServer);
  }
};