import { Matcher, MatcherOptions } from "@testing-library/react";

export type getByTestId = (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;
