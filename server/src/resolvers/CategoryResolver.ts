import { defaultData } from "../config";
import { generateSimilarItems } from "../utils";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { DELETE_MESSAGE } from "../config";
import { Category, CategorySchema, Item } from "../models";
import { checkIfCategoryExist } from "../utils";

const SIMILAR_ITEMS_COUNT = 10;

@Resolver()
export class CategoryResolver {
  @Query(() => [CategorySchema])
  async getAllCategories(): Promise<CategorySchema[]> {
    try {
      return await Category.find({}).populate("items");
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // getCategoryWithItems Query
  // PARAM: categoryID - categoryID
  // Validation: Check if category exist
  @Query(() => CategorySchema)
  async getCategoryWithItems(
    @Arg("categoryId") categoryId: string
  ): Promise<CategorySchema> {
    try {
      const category = await checkIfCategoryExist(categoryId);

      const populatedCategory = await category.populate("items").execPopulate();
      return populatedCategory;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // createCategory Mutation
  // PARAM:categoryName - Name of new category
  // Validation: Validation is Name already exist
  @Mutation(() => CategorySchema)
  async createCategory(
    @Arg("categoryName") categoryName: string
  ): Promise<CategorySchema> {
    try {
      if (!categoryName.trim()) {
        throw new Error("You have to pass category name");
      }

      const category = await Category.findOne({ categoryName });

      if (category) {
        throw new Error(`Category ${categoryName} already exist.`);
      }

      const newCategory = new Category({ categoryName });

      const arrayWithIds = await generateSimilarItems(
        categoryName,
        SIMILAR_ITEMS_COUNT
      );
      (newCategory.items as any) = arrayWithIds;

      await newCategory.save();

      const populatedCategory = await newCategory
        .populate("items")
        .execPopulate();

      return populatedCategory;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // addItemToCategory Mutation
  // PARAM: itemName & categoryID
  // Validation: Check if category exist
  @Mutation(() => CategorySchema)
  async addItemToCategory(
    @Arg("itemName") itemName: string,
    @Arg("categoryId") categoryId: string
  ): Promise<CategorySchema | Boolean> {
    try {
      const category = await checkIfCategoryExist(categoryId);

      const item = await Item.findOne({ itemName });

      if (item && category.items.includes(item.id)) {
        throw new Error(`Item ${item.itemName} is already in this category`);
      }

      const newItem = new Item({ itemName });

      category.items.unshift(newItem.id);

      await newItem.save();
      await category.save();

      const populatedCategory = await category.populate("items").execPopulate();
      return populatedCategory;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // deleteCategory Mutation
  // PARAM: categoryId
  // Validation: Check if category exist
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("categoryId") categoryId: string
  ): Promise<Boolean> {
    try {
      const category = await checkIfCategoryExist(categoryId, DELETE_MESSAGE);

      await category.remove(err => {
        if (err) {
          throw new Error("Category delete error");
        }
      });

      return true;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Mutation(() => Boolean)
  async resetToDefault(): Promise<boolean> {
    Category.deleteMany({}, err => {
      if (err) {
        throw new Error(err);
      }
    });
    Item.deleteMany({}, err => {
      if (err) {
        throw new Error(err);
      }
    });

    defaultData.forEach(async ({ categoryName, items }) => {
      let category = new Category({ categoryName });
      items.forEach(async ({ itemName }) => {
        const item = new Item({ itemName });
        category.items.push(item.id);
        await item.save();
      });

      await category.save();
    });

    return true;
  }
}
