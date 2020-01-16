import { prop, getModelForClass, Ref, arrayProp } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ItemSchema } from "./Item";

@ObjectType()
export class CategorySchema {
  @Field()
  _id: string;

  @Field()
  @prop()
  public categoryName: string;

  @Field(() => [ItemSchema])
  @arrayProp({ itemsRef: ItemSchema })
  public items: Ref<ItemSchema>[];
}

export const Category = getModelForClass(CategorySchema);
