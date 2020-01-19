import { CATEGORY_NAME, CATEGORY_ID } from "tests-utils/config";
import { CREATE_CATEGORY } from "gql/Mutations";

export const createCategoryMock = {
  request: {
    query: CREATE_CATEGORY,
    variables: {
      categoryName: CATEGORY_NAME
    }
  },
  result: () => {
    return {
      data: {
        createCategory: {
          categoryName: CATEGORY_NAME,
          _id: CATEGORY_ID,
          items: []
        }
      }
    };
  }
};
