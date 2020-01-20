export const findItemWithIdQuery = `
query findItemWithId($itemId: String!){
  findItemWithId(itemId: $itemId)  {
    _id
    itemName
  }
  }

`;
