import { gCall, INIT_CATEGORY_NAME } from "./";
import { createCategoryMutation } from "./querys";

export const createNewCategory = async () => {
  return await gCall({
    source: createCategoryMutation,
    variableValues: { categoryName: INIT_CATEGORY_NAME }
  });
};
