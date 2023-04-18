import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3004;

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Package Middleware Test!")
})

app.listen(port, () => {
  console.log(`⚡️[platform api]: running at http://localhost:${port}`);
});