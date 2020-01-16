import { getModelForClass, prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class ItemSchema {
  @Field()
  _id: string;

  @Field()
  @prop()
  public itemName: string;
}

export const Item = getModelForClass(ItemSchema);
