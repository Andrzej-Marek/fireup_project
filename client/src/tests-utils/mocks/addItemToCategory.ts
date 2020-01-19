import { ADD_ITEM_TO_CATEGORY } from "gql/Mutations";
import {
  NEW_ITEM_NAME,
  INIT_CATEGORY_ID,
  INIT_CATEGORY_NAME,
  NEW_ITEM_ID
} from "tests-utils/config";

export const addItemToCategory = {
  request: {
    query: ADD_ITEM_TO_CATEGORY,
    variables: {
      itemName: NEW_ITEM_NAME,
      categoryId: INIT_CATEGORY_ID
    }
  },
  result: () => {
    return {
      data: {
        addItemToCategory: {
          _id: INIT_CATEGORY_ID,
          categoryName: INIT_CATEGORY_NAME,
          items: [
            {
              _id: NEW_ITEM_ID,
              itemName: NEW_ITEM_NAME
            }
          ]
        }
      }
    };
  }
};
