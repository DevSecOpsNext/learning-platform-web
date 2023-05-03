import express, { Express, Request, Response, json } from 'express';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from "@apollo/server";
import gql from 'graphql-tag';
import { expressMiddleware } from '@apollo/server/express4';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3002;

app.use(json());

// The GraphQL schema
const typeDefs = gql`
  type Query {
    helloPlatform: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    helloPlatform: () => 'Platform API!',
  },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

await server.start();
app.use(expressMiddleware(server));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Platform API!")
})

app.listen(port, () => {
  console.log(`⚡️[platform api]: running at http://localhost:${port}`);
});