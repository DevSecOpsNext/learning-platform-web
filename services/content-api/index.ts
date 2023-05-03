import express, { Express, Request, Response, json } from 'express';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { ApolloServer } from "@apollo/server";
import gql from 'graphql-tag';
import { expressMiddleware } from '@apollo/server/express4';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3003;

app.use(json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).send("Content API!")
})

// The GraphQL schema
const typeDefs = gql`
  type Query {
    helloContent: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    helloContent: () => 'Content API!',
  },
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

await server.start();
app.use(expressMiddleware(server));

app.listen(port, () => {
  console.log(`⚡️[content api]: running at http://localhost:${port}`);
});