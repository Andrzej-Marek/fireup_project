import React from "react";
import styled from "styled-components";
import { ItemSchema } from "generated/graphql";

interface Props {
  addItemToArray: (itemName: string) => void;
  deleteItem: (id: string) => void;
  itemsArray: ItemSchema[];
  categoryName: string;
}

const TableRow: React.FC<Props> = ({
  deleteItem,
  addItemToArray,
  itemsArray,
  categoryName
}) => {
  const mapAllItems = () =>
    itemsArray.map(({ itemName, _id }) => (
      <CategoryItem onClick={() => deleteItem(_id)} key={_id}>
        {itemName}
      </CategoryItem>
    ));
  return (
    <TableCol>
      <TableCategory>
        <p>{categoryName}</p>
      </TableCategory>
      <TableCategoryItems>
        <>
          <AddButton onClick={() => addItemToArray("NEXT")}>Add +</AddButton>
          {mapAllItems()}
        </>
      </TableCategoryItems>
    </TableCol>
  );
};

const TableCol = styled.div`
  display: flex;
  align-items: center;
`;
const TableCategory = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  font-weight: 700;
`;

const TableCategoryItems = styled.div`
  width: 750px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-left: 1px solid ${({ theme }) => theme.color.black};
  padding: 10px 0 10px 20px;
`;

const CategoryItem = styled.div`
  margin: 5px;
  padding: 5px 10px;
  min-width: 60px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 22px;
  position: relative;
  transition: 0.5s;
  :hover {
    cursor: pointer;
  }
`;

const AddButton = styled.button`
  margin: 5px;
  padding: 5px 15px;
  font-size: 16px;
  font-weight: 700;
  border: 2px solid ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.primary};
  border-radius: 22px;
  transition: 0.3s;
  :focus,
  :active,
  :hover {
    outline: none;
  }

  :hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.primary};
  }
`;

export default TableRow;
