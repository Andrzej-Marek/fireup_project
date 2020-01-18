import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class SimilarWords {
  @Field()
  word: string;
}
