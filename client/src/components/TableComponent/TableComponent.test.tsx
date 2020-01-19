import { cleanup, render, waitForElement } from "@testing-library/react";
import { renderFields } from "tests-utils";
import { getAllCategoriesMock } from "tests-utils/mocks";

afterEach(cleanup);

describe("Apollo testing", () => {
  it("Run <TableComponent /> with loading state", async () => {
    const { getByTestId } = render(renderFields([getAllCategoriesMock]));
    const loadingSpinner = getByTestId("loading-spinner");
    expect(loadingSpinner).toBeTruthy();
  });

  it("Run <TableComponent /> and loads query", async () => {
    const { getByText } = render(renderFields([getAllCategoriesMock]));

    await waitForElement(() => getByText("Categories"));
    expect(getByText("cars")).toBeTruthy();
    expect(getByText("audi")).toBeTruthy();
  });
});
