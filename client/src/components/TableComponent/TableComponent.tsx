import React, { useState, useCallback } from "react";
import styled from "styled-components";
import TableRow from "./TableRow";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_ALL_CATEGORIES } from "gql";
import { LoadingComponent } from "MultiUse";
import { ADD_ITEM_TO_CATEGORY } from "gql/Mutations";
import {
  AddItemToCategoryMutation,
  GetAllCategoriesQuery,
  CategorySchema
} from "generated/graphql";
import ErrorShowComponent from "MultiUse/ErrorShowComponent";
import { ExecutionResult } from "graphql";

const TableComponent: React.FC = () => {
  const [statusPopUp, setStatusPopUp] = useState({
    status: false,
    message: "",
    show: false
  });

  const { status, message, show } = statusPopUp;

  const { loading, data } = useQuery<GetAllCategoriesQuery>(GET_ALL_CATEGORIES);
  const [addItemToCategory] = useMutation<AddItemToCategoryMutation>(
    ADD_ITEM_TO_CATEGORY,
    {
      variables: { categoryId: "5e201a945a220b064f080a07", itemName: "Hello4" }
    }
  );

  const resetStatusPopUp = () =>
    setStatusPopUp(prevState => ({ ...prevState, show: false }));

  const deleteItem = (id: string) => {
    setStatusPopUp({
      message: "Delete success",
      status: true,
      show: true
    });
  };

  const addItemToCategoryFunction = async () => {
    try {
      await addItemToCategory();
    } catch (error) {
      setStatusPopUp({
        message: error.graphQLErrors[0].message,
        status: false,
        show: true
      });
    }
  };

  const displayTableRows = (array: CategorySchema[]) =>
    array.map(el => (
      <TableRow
        key={el._id}
        addItemToArray={addItemToCategoryFunction}
        deleteItem={deleteItem}
        itemsArray={el.items}
        categoryName={el.categoryName}
      />
    ));

  if (!data || loading) {
    return <LoadingComponent />;
  }

  return (
    <Wrapper>
      <TableWrapper>{displayTableRows(data.getAllCategories)}</TableWrapper>
      {/* <Table data={data} addItemToCategory={addItemToCategory} /> */}
      <ErrorShowComponent
        message={message}
        status={status}
        show={show}
        callback={resetStatusPopUp}
      />
    </Wrapper>
  );
};

//TODO: Add a memo to prevent rerenders after some errors
// interface PropsTwo {
//   data: GetAllCategoriesQuery;
//   addItemToCategory: () => Promise<ExecutionResult<AddItemToCategoryMutation>>;
// }
// const Table: React.FC<PropsTwo> = React.memo(({ data, addItemToCategory }) => {
//   const displayTableRows = (array: CategorySchema[]) =>
//     array.map(el => (
//       <TableRow
//         key={el._id}
//         addItemToArray={addItemToCategoryFunction}
//         deleteItem={deleteItem}
//         itemsArray={el.items}
//         categoryName={el.categoryName}
//       />
//     ));

//   const deleteItem = (id: string) => {
//     // setStatusPopUp({
//     //   message: "Delete success",
//     //   status: true,
//     //   show: true
//     // });
//     console.log("deleteItem");
//   };

//   const addItemToCategoryFunction = async () => {
//     try {
//       await addItemToCategory();
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   console.log("RERENDER");
//   return <TableWrapper>{displayTableRows(data.getAllCategories)}</TableWrapper>;
// });

const Wrapper = styled.div`
  padding: 20px 0;
`;
const TableWrapper = styled.div`
  width: 900px;
  margin: 0 auto;
  border: solid 1px ${({ theme }) => theme.color.black};
`;
export default TableComponent;
