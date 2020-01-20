import { buildSchema } from "type-graphql";
import { ItemResovler, CategoryResolver } from "../resolvers";

export const createSchema = () =>
  buildSchema({
    resolvers: [CategoryResolver, ItemResovler]
  });
