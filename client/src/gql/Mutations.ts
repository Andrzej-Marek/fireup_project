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
