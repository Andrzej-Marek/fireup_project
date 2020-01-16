import { Category } from "../models/Category";
import { NOT_FOUND_MESSAGE } from "../config/messages";

export const checkIfCategoryExist = async (categoryId: string) => {
  try {
    let category = await Category.findById(categoryId);

    if (!category) {
      throw new Error(NOT_FOUND_MESSAGE);
    }
    return category;
  } catch (err) {
    throw new Error(err.message);
  }
};
