const connect = require('mongoose').connect

const connectWithRetry = () => {

    const dbUrl = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@0.0.0.0:27017/${MONGO_INITDB_DATABASE}?authSource=admin`

    connect(dbUrl, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected!');
    })
    .catch((err) => {
        console.error('Failed to connect to mongo on startup - retrying in 1 sec', err);
        setTimeout(connectWithRetry, 1000);
    })
}

module.exports = connectWithRetry