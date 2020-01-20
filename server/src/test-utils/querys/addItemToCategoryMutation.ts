export const addItemToCategoryMutation = `
mutation addItemToCategory($itemName: String!, $categoryId: String!){
  addItemToCategory(
    itemName: $itemName
    categoryId: $categoryId
  ) {
    _id
    categoryName
    items {
      _id
      itemName
    }
  }
}

`;
