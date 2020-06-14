import RSocketWebSocketClient from 'rsocket-websocket-client';
import { BufferEncoders } from 'rsocket-core';
import { RpcClient } from 'rsocket-rpc-core';

import { HelloClient } from './protos/helloworld_rsocket_pb';
import { HelloRequest } from './protos/helloworld_pb';

(async () => {
  const transportOpts = { url: 'ws://localhost:3000/rsocket' };
  const transport = new RSocketWebSocketClient(transportOpts, BufferEncoders);

  const clientOpts = {
    setup: {
      keepAlive: 10000,
      lifetime: 20000,
    },
    transport,
  };
  const client = new RpcClient(clientOpts);
  const rsocket = await client.connect();

  const helloService = new HelloClient(rsocket);

  const exec = async () => {
    const name = document.getElementById('name').value;

    const request = new HelloRequest();
    request.setName(name);

    const response = await helloService.sayHello(request);

    console.log(response.getMessage());
  };

  document.getElementById('exec').addEventListener('click', exec);
})();
