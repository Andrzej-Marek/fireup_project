export const createCategoryMutation = `
  mutation createCategory($categoryName: String!)  {
      createCategory(categoryName: $categoryName) {
          categoryName
          _id
      }
    }
  `;
