import mongoose from 'mongoose';
import { config } from 'dotenv';
config()

let dbUrl: string = process.env.MONGODB_URI || '';

if (process.env.NODE_ENV === 'production') {
    dbUrl = process.env.MONGODB_URI || '';
}

if (process.env.NODE_ENV === 'test') {
    dbUrl = process.env.MONGODB_TEST_URI || '';
}

if (process.env.NODE_ENV === 'development') {
    dbUrl = process.env.MONGODB_DEV_URI || '';
}

if (!dbUrl) {
    console.log('Mongo url not set in env file');
    throw new Error('Mongo url not set in env file');
}
mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
    console.log(`Connected to DB server. (${process.env.NODE_ENV})`);
});

mongoose.connection.on('error', (error: Error) => {
    console.log(`FAILED to connect using mongoose. ${error}`);
});

module.exports = mongoose;