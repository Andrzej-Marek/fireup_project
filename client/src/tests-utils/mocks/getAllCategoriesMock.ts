import { GET_ALL_CATEGORIES } from "gql";
import { INIT_CATEGORY_NAME, INIT_CATEGORY_ID } from "tests-utils";

export const getAllCategoriesMock = {
  request: {
    query: GET_ALL_CATEGORIES,
    variables: {}
  },
  result: {
    data: {
      getAllCategories: [
        {
          _id: INIT_CATEGORY_ID,
          categoryName: INIT_CATEGORY_NAME,
          items: [
            {
              _id: "5e244c57cde44e0429996f36",
              itemName: "audi"
            },
            {
              _id: "5e244c57cde44e0429996f37",
              itemName: "bmw"
            },
            {
              _id: "5e244c57cde44e0429996f38",
              itemName: "tires"
            }
          ]
        }
      ]
    }
  }
};
