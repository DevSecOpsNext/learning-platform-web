import express, { Express, Request, Response } from 'express';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3002;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Platform API!")
})

app.listen(port, () => {
  console.log(`⚡️[platform api]: running at http://localhost:${port}`);
});