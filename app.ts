import cors from 'cors';
import express, { Express, Request, Response } from 'express';
const userRouter = require('./src/routes/user.routes');

const app: Express = express();
//middlewares
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, World!');
});

app.use('/api/v1/user', userRouter);
export default app;
