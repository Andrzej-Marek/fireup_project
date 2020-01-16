import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { buildSchema } from "type-graphql";
import { dbConnect } from "./config/dbConnent";
import { CategoryResolver } from "./resolvers";

const main = async () => {
  dbConnect();
  const schema = await buildSchema({
    resolvers: [CategoryResolver]
  });

  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}/graphql`));
};

main();
