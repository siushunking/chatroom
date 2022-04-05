import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
const clientSockets = [];

wss.on('connection', function connection(websocket, request) {

  const [, roomId, name] = request.url.split('/');
  console.log({roomId, name})

  clientSockets.push(websocket)

  websocket.on('message', function message(data) {

    const {name, message} = JSON.parse(data)
    console.log({name, message})
    clientSockets.forEach((socket) => {
      socket.send(JSON.stringify({name, message}))
    })
  });

});