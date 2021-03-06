const config = require('config');
const kue = require('kue');
const request = require('request-promise-native');
const console = require('tracer').colorConsole();

let queue = kue.createQueue({redis: config.redis});

queue.process(config.kue.queueName, (job, done) => {
    let data = {
        number: job.data.number,
        message: job.data.message
    };

    sendMessageToAlarmo(data)
        .then((res) => {
            console.log(res);
            done();
        })
        .catch((err) => {
            console.log('error:', err);
            done(err);
        });
});

function sendMessageToAlarmo ({number, message}) {
    console.log('start send --');
    console.log('number:', number, 'message:', message);

    let url = config.alarmo.url + number;
    let options = {
        url,
        method: 'post',
        json: true,
        body: {text: message}
    };

    console.log('request options:', options);
    return request(options);
}

console.log('worker start with config:', config);