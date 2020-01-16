import React from "react";
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { Container } from "@material-ui/core";
import TableComponent from "components/TableComponent/TableComponent";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Container>
        <TableComponent />
      </Container>
    </>
  );
};

export default App;
