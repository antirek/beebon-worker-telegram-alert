module.exports = {
    "telegram-alert": {
    	url: "http://192.168.241.9:3030/send/"
    },
    redis: {
    	host: 'localhost',
    	port: 6379
    },
    kue: {
        queueName: "beebon_telegram_bot"
    }
};