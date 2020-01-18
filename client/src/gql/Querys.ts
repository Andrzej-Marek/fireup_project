import gql from "graphql-tag";

export const GET_ALL_CATEGORIES = gql`
  query getAllCategories {
    getAllCategories {
      _id
      categoryName
      items {
        _id
        itemName
      }
    }
  }
`;
export const GET_CATEGORY_WITH_ITEMS = gql`
  query getCategoryWithItems($categoryId: String!) {
    getCategoryWithItems(categoryId: $categoryId) {
      categoryName
      _id
      items {
        itemName
      }
    }
  }
`;
