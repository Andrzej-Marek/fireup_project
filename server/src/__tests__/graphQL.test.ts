import {
  connect,
  closeDatabase,
  INIT_CATEGORY_NAME,
  INIT_ITEM_NAME,
  createNewCategory
} from "../test-utils";
import { gCall } from "../test-utils";
import { Category } from "../models";
import {
  addItemToCategoryMutation,
  getCategoryWithIdQuery,
  findItemWithIdQuery,
  deleteCategoryMutation
} from "../test-utils/querys";

let newCategory: any;
let newCategoryId: string;

beforeAll(async () => {
  await connect();
  newCategory = await createNewCategory();
  newCategoryId = newCategory.data!.createCategory._id;
});

afterAll(async () =>
  setTimeout(async () => {
    await closeDatabase();
  }, 1000)
);

describe("QraphQL tests without clear", () => {
  it("Create new category and Item and add item to it", async () => {
    expect(newCategory).toMatchObject({
      data: {
        createCategory: {
          categoryName: INIT_CATEGORY_NAME,
          _id: newCategoryId
        }
      }
    });

    // Find created category in DB
    const dbCategory = await Category.findById(newCategoryId);

    expect(dbCategory).toBeDefined();
    expect(dbCategory!.categoryName).toBe(INIT_CATEGORY_NAME);

    // Check category items array length
    const dbCategoryItemsArrayLenght = dbCategory?.items.length;

    // Add item to previusly created category
    await gCall({
      source: addItemToCategoryMutation,
      variableValues: { itemName: INIT_ITEM_NAME, categoryId: newCategoryId }
    });

    const addedItemInDB = await Category.findById(newCategoryId);

    expect(addedItemInDB).toBeDefined();
    // Check if item was added s
    expect(addedItemInDB?.items.length).toBe(
      (dbCategoryItemsArrayLenght as number) + 1
    );
  });

  it("Get all categories", async () => {
    const findedCategory = await gCall({
      source: getCategoryWithIdQuery,
      variableValues: { categoryId: newCategoryId }
    });

    expect(findedCategory).toBeDefined();
    expect(findedCategory.data!.getCategoryWithItems.categoryName).toBe(
      INIT_CATEGORY_NAME
    );
    expect(
      findedCategory.data!.getCategoryWithItems.items.length
    ).toBeGreaterThan(9);
  });

  it("Find Item with ID", async () => {
    const categoryInDb = await Category.findById(newCategoryId);

    expect(categoryInDb).toBeDefined();

    const firstItemId = categoryInDb!.items[0] + "";

    const findedItem = await gCall({
      source: findItemWithIdQuery,
      variableValues: { itemId: firstItemId }
    });

    const { _id, itemName } = findedItem.data!.findItemWithId;
    expect(_id).toBe(firstItemId);
    expect(itemName).toBe(INIT_ITEM_NAME);
  });

  // HAVE TO BE LAST!
  it("Delete created category", async () => {
    const deletedCategory = await gCall({
      source: deleteCategoryMutation,
      variableValues: { categoryId: newCategoryId }
    });

    expect(deletedCategory.data!.deleteCategory).toBeTruthy();
  });
});
