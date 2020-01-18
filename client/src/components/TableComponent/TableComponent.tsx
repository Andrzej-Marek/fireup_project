import { useMutation, useQuery } from "@apollo/react-hooks";
import AbsoluteAddButton from "components/Buttons/AbsoluteAddButton";
import AddCategoryModal from "components/Modals/AddCategoryModal";
import { SERVER_ERROR_MESSAGE } from "config";
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
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const { loading, data } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const [addCategory] = useMutation<CreateCategoryMutation>(CREATE_CATEGORY);

  const resetStatusPopUp = () =>
    setStatusPopUp(prevState => ({ ...prevState, show: false }));

  const displayTableCols = (array: CategorySchema[]) =>
    array.map(({ categoryName, items, _id }) => (
      <TableCol
        key={_id}
        itemsArray={items}
        categoryName={categoryName}
        categoryId={_id}
        setStatusPopUp={setStatusPopUp}
      />
    ));

  const createNewCategory = async (categoryName: string) => {
    setLoadingSpinner(true);
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
            setLoadingSpinner(false);
          } catch (e) {
            setStatusPopUp({
              message: SERVER_ERROR_MESSAGE,
              status: false,
              show: true
            });
            setLoadingSpinner(false);
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
      <TableWrapper>
        <TableHead>
          <div className="categories">
            <p> Categories</p>
          </div>
          <div className="keywords">
            {" "}
            <p> Keywords</p>
          </div>
        </TableHead>
        {displayTableCols(data.getAllCategories)}
      </TableWrapper>
      <AbsoluteAddButton
        title="Create new category"
        onClickFunction={() => toggleAddCategoryModal(true)}
      />
      {loadingSpinner && <LoadingComponent />}
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
`;

const TableHead = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
  background: ${({ theme }) => theme.color.primary};

  div {
    font-weight: 700;
    padding: 20px 0;
    p {
      color: white;
    }
  }
  .categories {
    width: 150px;
    border-right: 1px solid ${({ theme }) => theme.color.black};
    display: flex;
    justify-content: center;
  }
  .keywords {
    padding-left: 30px;
  }
`;

export default TableComponent;
