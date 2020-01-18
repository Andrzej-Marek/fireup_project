import {
  prop,
  getModelForClass,
  Ref,
  arrayProp,
  post
} from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { ItemSchema, Item } from "./Item";

@post<CategorySchema>("remove", async function(item) {
  item.items.map(async el => {
    let item = await Item.findById(el);
    item?.remove();
  });
})
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
