import gql from "graphql-tag";

export const ADD_ITEM_TO_CATEGORY = gql`
  mutation addItemToCategory($itemName: String!, $categoryId: String!) {
    addItemToCategory(itemName: $itemName, categoryId: $categoryId) {
      _id
      categoryName
      items {
        _id
        itemName
      }
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($categoryName: String!) {
    createCategory(categoryName: $categoryName) {
      categoryName
      _id
      items {
        _id
        itemName
      }
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId)
  }
`;

export const DELETE_ITEM_WITH_ID = gql`
  mutation deleteItemWithId($itemId: String!) {
    deleteItemWithId(itemId: $itemId)
  }
`;

export const RESET_TO_DEFAULT = gql`
  mutation resetToDefault {
    resetToDefault
  }
`;
