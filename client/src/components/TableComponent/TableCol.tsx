import { useMutation } from "@apollo/react-hooks";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import AddItemModal from "components/Modals/AddItemModal";
import { SERVER_ERROR_MESSAGE } from "config";
import {
  AddItemToCategoryMutation,
  DeleteCategoryMutation,
  DeleteItemWithIdMutation,
  GetAllCategoriesQuery,
  ItemSchema
} from "generated/graphql";
import { GET_ALL_CATEGORIES } from "gql";
import {
  ADD_ITEM_TO_CATEGORY,
  DELETE_CATEGORY,
  DELETE_ITEM_WITH_ID
} from "gql/Mutations";
import { validateMinAndMaxLenght } from "MultiUse/validateMinAndMaxLenght";
import React, { useState } from "react";
import styled from "styled-components";
import { IStatusPopUp } from "./TableComponent";

const MINIMAL_ITEM_NAME_LONG = 2;
interface Props {
  itemsArray: ItemSchema[];
  categoryName: string;
  categoryId: string;
  setStatusPopUp: (data: IStatusPopUp) => void;
}

const TableCol: React.FC<Props> = ({
  itemsArray,
  categoryName,
  categoryId,
  setStatusPopUp
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [addItemToCategory] = useMutation<AddItemToCategoryMutation>(
    ADD_ITEM_TO_CATEGORY
  );
  const [deleteCategory] = useMutation<DeleteCategoryMutation>(DELETE_CATEGORY);
  const [deleteItemWithId] = useMutation<DeleteItemWithIdMutation>(
    DELETE_ITEM_WITH_ID
  );

  //Map all rows item
  const mapAllItems = () =>
    itemsArray.map(({ itemName, _id }) => (
      <CategoryItem key={_id}>
        <div onClick={() => deleteItemHandler(_id)}>
          <DeleteForeverIcon />
        </div>
        {itemName}
      </CategoryItem>
    ));

  const deleteItemHandler = async (itemId: string) => {
    try {
      await deleteItemWithId({
        variables: { itemId },
        refetchQueries: [{ query: GET_ALL_CATEGORIES }]
      });
    } catch (error) {
      setStatusPopUp({
        message: error?.graphQLErrors[0]?.message,
        status: false,
        show: true
      });
    }
  };

  const addItemToCateogry = async (value: string) => {
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

  const deleteCategoryHandler = async (categoryId: string) => {
    try {
      await deleteCategory({
        variables: { categoryId },
        update: async cache => {
          try {
            let queryData = cache.readQuery<GetAllCategoriesQuery>({
              query: GET_ALL_CATEGORIES
            });
            let newArray = queryData?.getAllCategories.filter(
              el => el._id !== categoryId
            );
            cache.writeQuery<GetAllCategoriesQuery>({
              query: GET_ALL_CATEGORIES,
              data: {
                getAllCategories: newArray as any
              }
            });
          } catch (err) {
            setStatusPopUp({
              message: SERVER_ERROR_MESSAGE,
              status: false,
              show: true
            });
          }
        }
      });
    } catch (error) {
      setStatusPopUp({
        message: error?.graphQLErrors[0]?.message,
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
        submitData={value => addItemToCateogry(value)}
      />

      <TableColWrapper>
        <TableCategory>
          <p>{categoryName}</p>
          <DeleteForeverIcon
            onClick={() => deleteCategoryHandler(categoryId)}
            data-testid={categoryName + "-delete-button"}
          />
        </TableCategory>
        <TableCategoryItems>
          <>
            <AddButton
              onClick={() => setOpenModal(true)}
              data-testid={categoryName + "-add-button"}
            >
              Add +
            </AddButton>
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
  border-bottom: 1px solid ${({ theme }) => theme.color.black};
`;

const TableCategory = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  min-width: 150px;
  max-width: 150px;
  font-weight: 700;
  overflow: hidden;
  svg {
    position: absolute;
    right: 5px;
    cursor: pointer;
  }

  p {
    overflow: hidden;
    max-width: calc(100% - 40px);
    padding-left: 5px;
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
  position: relative;
  margin: 5px;
  padding: 5px 10px;
  min-width: 60px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.color.black};
  border-radius: 22px;
  transition: 0.5s;
  z-index: 22;
  overflow: hidden;

  :hover {
    cursor: pointer;
    border: none;
    border: 1px solid ${({ theme }) => theme.color.red};
    div {
      transform: translateY(0);
    }
  }

  div {
    transform: translateY(-100%);
    transition: transform 0.4s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.color.red};
    border-radius: 22px;
    z-index: 1;

    svg {
      fill: ${({ theme }) => theme.color.white};
      cursor: pointer;
    }
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
  background: transparent;
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
