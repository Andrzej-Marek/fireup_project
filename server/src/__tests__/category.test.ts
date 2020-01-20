import {
  connect,
  clearDatabase,
  closeDatabase,
  INIT_CATEGORY_NAME
} from "../test-utils";
import { gCall } from "../test-utils";
import { Category } from "../models";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const createCategoryMutation = `
mutation createCategory($categoryName: String!)  {
    createCategory(categoryName: $categoryName) {
        categoryName
        _id
    }
  }
`;

describe("Category tests ", () => {
  it("Create new category", async () => {
    const newCategory = await gCall({
      source: createCategoryMutation,
      variableValues: { categoryName: INIT_CATEGORY_NAME }
    });

    const newCategoryId = newCategory.data!.createCategory._id;

    expect(newCategory).toMatchObject({
      data: {
        createCategory: {
          categoryName: INIT_CATEGORY_NAME,
          _id: newCategoryId
        }
      }
    });

    const dbCategory = await Category.findById(newCategoryId);

    expect(dbCategory).toBeDefined();
    expect(dbCategory!.categoryName).toBe(INIT_CATEGORY_NAME);
  });
});
