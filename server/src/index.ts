import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import { dbConnect } from "./config";
import { createSchema } from "./utils";

const main = async () => {
  require("dotenv").config();
  dbConnect();
  const schema = await createSchema();

  const apolloServer = new ApolloServer({ schema });

  const app = express();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}/graphql`));
};

main();
