import express, { Express, Request, Response, json } from 'express';
import 'dotenv/config';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";
import {authorize, validateScope} from './authorize.js';
import cors from 'cors';

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(json());
//app.use(authorize);
//app.use(validateScope);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("GraphQL API gateway!")
})

const gateway = new ApolloGateway({
  supergraphSdl: new IntrospectAndCompose({
    subgraphs: [
      { name: "platform", url: "http://localhost:3002/graphql" },
      { name: "content", url: "http://localhost:3003/graphql" },
    ],
  }),
});

const server = new ApolloServer({
  gateway,  
});

await server.start();
app.use(
  cors<cors.CorsRequest>({ origin: ['http://localhost:3000', 'https://studio.apollographql.com'] }),
  expressMiddleware(server)  
  );

app.listen(port, () => {
  console.log(`⚡️[gateway]: running at http://localhost:${port}`);
});