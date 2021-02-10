
import openSocket from 'socket.io-client';

let socket;

export const init = () => {
    socket  = openSocket('http://localhost:8080');
}

export const getSocket = () => socket;

