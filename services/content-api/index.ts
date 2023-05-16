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
    getStackList: [Stack],
    getStackById(id: Int!): Stack,
    searchStacksByTitle(title: String!): [Stack!]!
  }

  type Stack {
    id: String,
    title: String,
    body: String,
    discord: String,
    skill: String,
    category: [String]
  }

`;

const stackList = [
  { id: 1, title: 'kubernetes basic pipelines 1', body: 'johndoe@example.com', discord: 'https://discord.gg/2YHSAey', skill: 'kubernetes', category: ['kubernetes', 'devops', 'cloud'] },
  { id: 2, title: 'kubernetes basic pipelines 2', body: 'johndoe@example.com', discord: 'https://discord.gg/2YHSAey', skill: 'kubernetes', category: ['kubernetes', 'devops', 'cloud'] },
  { id: 3, title: 'kubernetes basic pipelines 3', body: 'johndoe@example.com', discord: 'https://discord.gg/2YHSAey', skill: 'kubernetes', category: ['kubernetes', 'devops', 'cloud'] },
];

const resolvers = {
  Query: {
    getStackList: () => {       
      return stackList;
    },
    getStackById: (_: any, { id }: { id: number }) => {
      return stackList.find((stack) => stack.id === id);
    },
    searchStacksByTitle: (_: any, { title }: { title: string }) => {
      const searchTerm = title.toLowerCase();      
      const matchingStacks = stackList.filter(stack => {
        const lowerCaseName = stack.title.toLowerCase();
        return lowerCaseName.includes(searchTerm);
      });
      return matchingStacks;
    },
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