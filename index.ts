import colors from 'colors';
import { config } from 'dotenv';
import app from './app';
config();

const db = require('./src/db/db');

const port = process.env.PORT || 5002;

app.listen(port, () => {
	console.log(colors.yellow.bold(`App is running on port ${port}`));
});
