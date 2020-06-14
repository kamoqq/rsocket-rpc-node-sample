const express = require('express');
const http = require('http');
const { RSocketServer, BufferEncoders } = require('rsocket-core');
const RSocketWebsocketServer = require('rsocket-websocket-server').default;
const { RequestHandlingRSocket } = require('rsocket-rpc-core');

const HelloService = require('./HelloService');
const { HelloServer } = require('./protos/helloworld_rsocket_pb');

const app = express();

app.use(express.static('public'));

const server = http.createServer(app);

const transportOpts = {
  server,
  path: '/rsocket'
};
const transport = new RSocketWebsocketServer(transportOpts, BufferEncoders);

const getRequestHandler = () => {
  const service = new RequestHandlingRSocket();
  const helloService = new HelloService();
  service.addService('helloworld.Hello', new HelloServer(helloService));
  return service;
};

const rSocketServer = new RSocketServer({ transport, getRequestHandler });

server.listen(3000, () => {
  rSocketServer.start();
  console.log(`Server started on port 3000`);
});