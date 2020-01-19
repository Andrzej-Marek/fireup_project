import { Matcher, MatcherOptions } from "@testing-library/react";
export type getByPlaceholder = (
  text: Matcher,
  options?: MatcherOptions | undefined,
  waitForElementOptions?: unknown
) => HTMLElement;
