import { Matcher, SelectorMatcherOptions } from "@testing-library/react";

export type getByText = (
  text: Matcher,
  options?: SelectorMatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;
