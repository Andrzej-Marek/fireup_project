import { useMutation, useQuery } from "@apollo/react-hooks";
import AbsoluteAddButton from "components/Buttons/AbsoluteAddButton";
import AddCategoryModal from "components/Modals/AddCategoryModal";
import {
  CategorySchema,
  CreateCategoryMutation,
  GetAllCategoriesQuery
} from "generated/graphql";
import { GET_ALL_CATEGORIES } from "gql";
import { CREATE_CATEGORY } from "gql/Mutations";
import { LoadingComponent } from "MultiUse";
import ErrorShowComponent from "MultiUse/ErrorShowComponent";
import React, { useState } from "react";
import styled from "styled-components";
import TableCol from "./TableCol";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

export interface IStatusPopUp {
  status: boolean;
  message: string;
  show: boolean;
}
const TableComponent: React.FC = () => {
  const [statusPopUp, setStatusPopUp] = useState<IStatusPopUp>({
    status: false,
    message: "",
    show: false
  });
  const [addCategoryModal, toggleAddCategoryModal] = useState(false);

  const { loading, data } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const [addCategory] = useMutation<CreateCategoryMutation>(CREATE_CATEGORY);

  const resetStatusPopUp = () =>
    setStatusPopUp(prevState => ({ ...prevState, show: false }));

  const deleteHandler = (type: string, id: string) => {
    setStatusPopUp({
      message: "Delete success",
      status: true,
      show: true
    });
  };

  const displayTableCols = (array: CategorySchema[]) =>
    array.map(({ categoryName, items, _id }) => (
      <TableCol
        key={_id}
        deleteItem={deleteHandler}
        itemsArray={items}
        categoryName={categoryName}
        categoryId={_id}
        setStatusPopUp={setStatusPopUp}
      />
    ));

  const createNewCategory = async (categoryName: string) => {
    try {
      await addCategory({
        variables: { categoryName },
        update: async (cache, { data }) => {
          try {
            let queryData = cache.readQuery<GetAllCategoriesQuery>({
              query: GET_ALL_CATEGORIES
            });

            cache.writeQuery<GetAllCategoriesQuery>({
              query: GET_ALL_CATEGORIES,
              data: {
                getAllCategories: [
                  ...queryData!.getAllCategories,
                  data!.createCategory
                ]
              }
            });
          } catch (e) {
            console.log(e.message);
          }
        }
      });
    } catch (error) {
      setStatusPopUp({
        message: error.graphQLErrors[0].message,
        status: false,
        show: true
      });
    }
  };

  if (!data || loading) {
    return <LoadingComponent />;
  }

  if (data.getAllCategories.length === 0) {
    return (
      <>
        <h1>You don't have any categories, add one</h1>
        <AbsoluteAddButton
          title="Create new category"
          onClickFunction={() => toggleAddCategoryModal(true)}
        />
        <AddCategoryModal
          open={addCategoryModal}
          toggle={() => toggleAddCategoryModal(!addCategoryModal)}
          onSubmit={categoryName => createNewCategory(categoryName)}
        />
      </>
    );
  }

  const { status, message, show } = statusPopUp;
  return (
    <Wrapper>
      <DeleteForeverIcon onClick={() => deleteHandler("Category", "123232")} />
      <TableWrapper>{displayTableCols(data.getAllCategories)}</TableWrapper>
      <AbsoluteAddButton
        title="Create new category"
        onClickFunction={() => toggleAddCategoryModal(true)}
      />
      <AddCategoryModal
        open={addCategoryModal}
        toggle={() => toggleAddCategoryModal(!addCategoryModal)}
        onSubmit={categoryName => createNewCategory(categoryName)}
      />
      <ErrorShowComponent
        message={message}
        status={status}
        show={show}
        callback={resetStatusPopUp}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 0;
`;
const TableWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  border: solid 1px ${({ theme }) => theme.color.black};
`;

export default TableComponent;
