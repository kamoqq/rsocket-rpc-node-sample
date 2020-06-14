const { HelloResponse } = require('./protos/helloworld_pb');
const { Single, Flowable } = require('rsocket-flowable');

class HelloService {
  constructor() {}

  sayHello(message, metadata) {
    const name = message.getName() || 'world';
    let response = new HelloResponse();
    response.setMessage(`Hello ${name}!`);
    return Single.of(response);
  }
};

module.exports = HelloService;