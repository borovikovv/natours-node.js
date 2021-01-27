const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

process.on('uncaughtRejection', err => {
    console.log(err.name, err.message)
    console.log('UNCAUGHT REJECTION!')
    process.exit(1);
})

const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true 
}).then(conn => {
    console.log('DB connections success!')
})

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log(`App run to port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('UNHANDLER REJECTION!')
    server.close(() => {
        process.exit(1);
    })
})