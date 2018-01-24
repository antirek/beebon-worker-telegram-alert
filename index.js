const config = require('config');
const kue = require('kue');
const request = require('request-promise-native');
const console = require('tracer').colorConsole();

let queue = kue.createQueue({redis: config.redis});

queue.process(config.kue.queueName, (job, done) => {
    sendMessageToTelegram(job.data.number, job.data.message);
    done()
});

function sendMessageToTelegram (number, message) {
    console.log('start send --');
    console.log('number:', number, 'message:', message);

    let url = config['telegram-alert'].url + number;
    let options = {
        url,
        method: 'post',
        json: true,
        body: {text: message}
    };

    console.log('request options:', options);

    return request(options)
        .then(console.log)
        .catch(console.log)
}

console.log('worker start');