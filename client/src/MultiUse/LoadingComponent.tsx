import React from "react";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;

export const LoadingComponent: React.FC = () => {
  return (
    <Wrapper>
      <CircularProgress />
    </Wrapper>
  );
};
