import { DELETE_CATEGORY } from "gql/Mutations";
import { INIT_CATEGORY_ID } from "tests-utils";

export const deleteCategoryMock = {
  request: {
    query: DELETE_CATEGORY,
    variables: {
      categoryId: INIT_CATEGORY_ID
    }
  },
  result: {
    data: {
      deleteCategory: true
    }
  }
};
