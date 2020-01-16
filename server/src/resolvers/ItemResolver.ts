import { NOT_FOUND_MESSAGE } from "./../config/messages";
import { Item } from "../models/Item";
import { ItemSchema } from "../models/Item";
import { Resolver, Query, Arg, Mutation } from "type-graphql";

@Resolver()
export class ItemResovler {
  @Query(() => ItemSchema)
  async findItemWithId(@Arg("itemId") itemId: string) {
    try {
      let item = await Item.findById(itemId);

      if (!item) {
        throw new Error(NOT_FOUND_MESSAGE);
      }
      return item;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => Boolean)
  async deleteItemWithId(@Arg("itemId") itemId: string) {
    try {
      let item = await Item.findById(itemId);

      if (!item) {
        throw new Error(NOT_FOUND_MESSAGE);
      }

      await item.remove();
      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
