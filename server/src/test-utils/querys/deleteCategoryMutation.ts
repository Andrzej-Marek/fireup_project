export const deleteCategoryMutation = `
mutation($categoryId: String!) {
  deleteCategory(categoryId: $categoryId)
}
`;
