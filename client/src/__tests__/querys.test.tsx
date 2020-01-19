import {
  cleanup,
  fireEvent,
  render,
  waitForDomChange,
  waitForElement
} from "@testing-library/react";
import {
  CATEGORY_NAME,
  INIT_CATEGORY_NAME,
  NEW_ITEM_NAME,
  renderFields
} from "tests-utils";
import {
  createCategoryMock,
  deleteCategoryMock,
  getAllCategoriesMock
} from "tests-utils/mocks";
import { addItemToCategory } from "tests-utils/mocks/addItemToCategory";
afterEach(cleanup);

describe("Querys and Mutations test", () => {
  it("SHOUDL RETURN TRUE", () => {
    expect(true).toBeTruthy();
  });

  it("Should create new category", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(
      renderFields([createCategoryMock, getAllCategoriesMock])
    );

    await waitForElement(() => getByText("Categories"));

    const buttonCategoryAddModal = getByTestId("add-category-modal-toggler");
    fireEvent.click(buttonCategoryAddModal);
    await waitForElement(() => getByText("Add a new category"));

    const categorySubmitButton = getByTestId("add-category-submit-button");
    const categoryInput = getByTestId("add-category-input");

    fireEvent.change(categoryInput, { target: { value: CATEGORY_NAME } });
    fireEvent.click(categorySubmitButton);
    await waitForDomChange();

    expect(getByText("Flowers")).toBeDefined();
  });

  it("Should delete exist category", async () => {
    const { getByText, getByTestId } = render(
      renderFields([
        getAllCategoriesMock,
        createCategoryMock,
        deleteCategoryMock
      ])
    );

    await waitForElement(() => getByText("Categories"));

    const categoryDeleteButton = getByTestId(
      INIT_CATEGORY_NAME + "-delete-button"
    );

    expect(categoryDeleteButton).toBeDefined();

    fireEvent.click(categoryDeleteButton);

    await waitForDomChange();

    expect(getByTestId("no-categories-text")).toBeDefined();
  });

  it("Should add item category", async () => {
    const { getByText, getByTestId } = render(
      renderFields([addItemToCategory, getAllCategoriesMock])
    );

    await waitForElement(() => getByText("Categories"));

    const addItemButton = getByTestId(INIT_CATEGORY_NAME + "-add-button");

    expect(addItemButton).toBeDefined();

    fireEvent.click(addItemButton);

    await waitForElement(() => getByText("Add new item"));
    const addItemInput = getByTestId("add-item-input");
    const addItemSubmitButton = getByTestId("add-item-submit-button");

    expect(addItemInput).toBeDefined();
    expect(addItemSubmitButton).toBeDefined();

    fireEvent.change(addItemInput, { target: { value: NEW_ITEM_NAME } });
    fireEvent.click(addItemSubmitButton);

    await waitForDomChange();
    expect(getByText("Item added!")).toBeDefined();
  });
});
