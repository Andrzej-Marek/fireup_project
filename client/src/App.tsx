import React from "react";
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { Container } from "@material-ui/core";
import TableComponent from "components/TableComponent/TableComponent";
import ResetComponent from "components/Buttons/ResetButton";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <TableComponent />
        <ResetComponent />
      </Container>
    </>
  );
};

export default App;
