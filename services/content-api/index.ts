import express, { Express, Request, Response } from 'express';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3003;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Content API!")
})

app.listen(port, () => {
  console.log(`⚡️[content api]: running at http://localhost:${port}`);
});