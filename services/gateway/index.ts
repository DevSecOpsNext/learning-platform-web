import express, { Express, Request, Response } from 'express';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3001;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("GraphQL API gateway!")
})

app.listen(port, () => {
  console.log(`⚡️[gateway]: running at http://localhost:${port}`);
});