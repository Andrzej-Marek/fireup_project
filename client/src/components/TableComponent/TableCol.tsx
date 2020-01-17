import React, { useState } from "react";
import styled from "styled-components";
import { ItemSchema, AddItemToCategoryMutation } from "generated/graphql";
import AddItemModal from "components/Modals/AddItemModal";
import { ADD_ITEM_TO_CATEGORY } from "gql/Mutations";
import { useMutation } from "@apollo/react-hooks";
import { IStatusPopUp } from "./TableComponent";
import { validateMinAndMaxLenght } from "MultiUse/validateMinAndMaxLenght";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
const MINIMAL_ITEM_NAME_LONG = 2;
interface Props {
  itemsArray: ItemSchema[];
  categoryName: string;
  categoryId: string;
  deleteItem: (type: string, id: string) => void;
  setStatusPopUp: (data: IStatusPopUp) => void;
}

const TableCol: React.FC<Props> = ({
  itemsArray,
  categoryName,
  categoryId,
  deleteItem,
  setStatusPopUp
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [addItemToCategory] = useMutation<AddItemToCategoryMutation>(
    ADD_ITEM_TO_CATEGORY
  );

  //Map all rows item
  const mapAllItems = () =>
    itemsArray.map(({ itemName, _id }) => (
      <CategoryItem onClick={() => deleteItem("Category", _id)} key={_id}>
        {itemName}
      </CategoryItem>
    ));

  const submitData = async (value: string) => {
    const valueValidation = validateMinAndMaxLenght(
      value,
      MINIMAL_ITEM_NAME_LONG
    );

    if (!valueValidation) {
      return setStatusPopUp({
        message: `Item name have to be at least ${MINIMAL_ITEM_NAME_LONG} characters`,
        status: false,
        show: true
      });
    }
    try {
      await addItemToCategory({ variables: { categoryId, itemName: value } });
      setOpenModal(false);
      setStatusPopUp({
        message: "Item added!",
        status: true,
        show: true
      });
    } catch (error) {
      setStatusPopUp({
        message: error.graphQLErrors[0].message,
        status: false,
        show: true
      });
    }
  };

  return (
    <>
      <AddItemModal
        open={openModal}
        toggleOpen={() => setOpenModal(!openModal)}
        categoryName={categoryName}
        submitData={value => submitData(value)}
      />
      <TableColWrapper>
        <TableCategory>
          <p>{categoryName}</p>
          <DeleteForeverIcon />
        </TableCategory>
        <TableCategoryItems>
          <>
            <AddButton onClick={() => setOpenModal(true)}>Add +</AddButton>
            {mapAllItems()}
          </>
        </TableCategoryItems>
      </TableColWrapper>
    </>
  );
};

const TableColWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const TableCategory = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 150px;
  font-weight: 700;
  padding-left: 5px;
  overflow: hidden;
  svg {
    position: absolute;
    right: 5px;
  }

  p {
    overflow: hidden;
    max-width: calc(100% - 40px);
  }
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

export default TableCol;
