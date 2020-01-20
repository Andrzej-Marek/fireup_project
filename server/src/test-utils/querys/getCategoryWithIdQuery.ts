export const getCategoryWithIdQuery = `
query getCategoryWithItems($categoryId: String!){
  getCategoryWithItems(categoryId: $categoryId) {
    categoryName
    _id
    items {
      itemName
    }
  }
}
`;
