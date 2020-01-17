import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type CategorySchema = {
   __typename?: 'CategorySchema',
  _id: Scalars['String'],
  categoryName: Scalars['String'],
  items: Array<ItemSchema>,
};

export type ItemSchema = {
   __typename?: 'ItemSchema',
  _id: Scalars['String'],
  itemName: Scalars['String'],
};

export type Mutation = {
   __typename?: 'Mutation',
  createCategory: CategorySchema,
  addItemToCategory: CategorySchema,
  deleteCategory: Scalars['Boolean'],
  deleteItemWithId: Scalars['Boolean'],
};


export type MutationCreateCategoryArgs = {
  categoryName: Scalars['String']
};


export type MutationAddItemToCategoryArgs = {
  categoryId: Scalars['String'],
  itemName: Scalars['String']
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['String']
};


export type MutationDeleteItemWithIdArgs = {
  itemId: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  getAllCategories: Array<CategorySchema>,
  getCategoryWithItems: CategorySchema,
  findItemWithId: ItemSchema,
};


export type QueryGetCategoryWithItemsArgs = {
  categoryID: Scalars['String']
};


export type QueryFindItemWithIdArgs = {
  itemId: Scalars['String']
};

export type AddItemToCategoryMutationVariables = {
  itemName: Scalars['String'],
  categoryId: Scalars['String']
};


export type AddItemToCategoryMutation = (
  { __typename?: 'Mutation' }
  & { addItemToCategory: (
    { __typename?: 'CategorySchema' }
    & Pick<CategorySchema, '_id' | 'categoryName'>
    & { items: Array<(
      { __typename?: 'ItemSchema' }
      & Pick<ItemSchema, '_id' | 'itemName'>
    )> }
  ) }
);

export type CreateCategoryMutationVariables = {
  categoryName: Scalars['String']
};


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'CategorySchema' }
    & Pick<CategorySchema, 'categoryName' | '_id'>
    & { items: Array<(
      { __typename?: 'ItemSchema' }
      & Pick<ItemSchema, '_id' | 'itemName'>
    )> }
  ) }
);

export type GetAllCategoriesQueryVariables = {};


export type GetAllCategoriesQuery = (
  { __typename?: 'Query' }
  & { getAllCategories: Array<(
    { __typename?: 'CategorySchema' }
    & Pick<CategorySchema, '_id' | 'categoryName'>
    & { items: Array<(
      { __typename?: 'ItemSchema' }
      & Pick<ItemSchema, '_id' | 'itemName'>
    )> }
  )> }
);


export const AddItemToCategoryDocument = gql`
    mutation addItemToCategory($itemName: String!, $categoryId: String!) {
  addItemToCategory(itemName: $itemName, categoryId: $categoryId) {
    _id
    categoryName
    items {
      _id
      itemName
    }
  }
}
    `;
export type AddItemToCategoryMutationFn = ApolloReactCommon.MutationFunction<AddItemToCategoryMutation, AddItemToCategoryMutationVariables>;
export type AddItemToCategoryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddItemToCategoryMutation, AddItemToCategoryMutationVariables>, 'mutation'>;

    export const AddItemToCategoryComponent = (props: AddItemToCategoryComponentProps) => (
      <ApolloReactComponents.Mutation<AddItemToCategoryMutation, AddItemToCategoryMutationVariables> mutation={AddItemToCategoryDocument} {...props} />
    );
    
export type AddItemToCategoryProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddItemToCategoryMutation, AddItemToCategoryMutationVariables> & TChildProps;
export function withAddItemToCategory<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddItemToCategoryMutation,
  AddItemToCategoryMutationVariables,
  AddItemToCategoryProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddItemToCategoryMutation, AddItemToCategoryMutationVariables, AddItemToCategoryProps<TChildProps>>(AddItemToCategoryDocument, {
      alias: 'addItemToCategory',
      ...operationOptions
    });
};
export type AddItemToCategoryMutationResult = ApolloReactCommon.MutationResult<AddItemToCategoryMutation>;
export type AddItemToCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<AddItemToCategoryMutation, AddItemToCategoryMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($categoryName: String!) {
  createCategory(categoryName: $categoryName) {
    categoryName
    _id
    items {
      _id
      itemName
    }
  }
}
    `;
export type CreateCategoryMutationFn = ApolloReactCommon.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;
export type CreateCategoryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCategoryMutation, CreateCategoryMutationVariables>, 'mutation'>;

    export const CreateCategoryComponent = (props: CreateCategoryComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCategoryMutation, CreateCategoryMutationVariables> mutation={CreateCategoryDocument} {...props} />
    );
    
export type CreateCategoryProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateCategoryMutation, CreateCategoryMutationVariables> & TChildProps;
export function withCreateCategory<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateCategoryMutation,
  CreateCategoryMutationVariables,
  CreateCategoryProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateCategoryMutation, CreateCategoryMutationVariables, CreateCategoryProps<TChildProps>>(CreateCategoryDocument, {
      alias: 'createCategory',
      ...operationOptions
    });
};
export type CreateCategoryMutationResult = ApolloReactCommon.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const GetAllCategoriesDocument = gql`
    query getAllCategories {
  getAllCategories {
    _id
    categoryName
    items {
      _id
      itemName
    }
  }
}
    `;
export type GetAllCategoriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>, 'query'>;

    export const GetAllCategoriesComponent = (props: GetAllCategoriesComponentProps) => (
      <ApolloReactComponents.Query<GetAllCategoriesQuery, GetAllCategoriesQueryVariables> query={GetAllCategoriesDocument} {...props} />
    );
    
export type GetAllCategoriesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetAllCategoriesQuery, GetAllCategoriesQueryVariables> & TChildProps;
export function withGetAllCategories<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables,
  GetAllCategoriesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetAllCategoriesQuery, GetAllCategoriesQueryVariables, GetAllCategoriesProps<TChildProps>>(GetAllCategoriesDocument, {
      alias: 'getAllCategories',
      ...operationOptions
    });
};
export type GetAllCategoriesQueryResult = ApolloReactCommon.QueryResult<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;