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
