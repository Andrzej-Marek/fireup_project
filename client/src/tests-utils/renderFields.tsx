import React from "react";
import { MockedProvider } from "@apollo/react-testing";
import { ThemeProvider } from "styled-components";
import App from "App";
import { theme } from "theme";

export const renderFields = (mocks: any) => (
  <MockedProvider mocks={mocks} addTypename={false}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </MockedProvider>
);
