import React from "react";
import styled from "styled-components";
import { Button, Tooltip } from "@material-ui/core";
import { ResetToDefaultMutation } from "generated/graphql";
import { RESET_TO_DEFAULT } from "gql/Mutations";
import { useMutation } from "@apollo/react-hooks";
import { GET_ALL_CATEGORIES } from "gql";

const Wrapper = styled.div`
  position: fixed;
  bottom: 40px;
  left: 10vw;

  button {
    opacity: 0.4;
    transition: opacity 0.4s;
    :hover {
      opacity: 1;
    }
  }
`;

const ResetButton = () => {
  const [resetToDefaultFields] = useMutation<ResetToDefaultMutation>(
    RESET_TO_DEFAULT
  );

  const resetToDefaultHandler = () => {
    resetToDefaultFields({
      refetchQueries: [{ query: GET_ALL_CATEGORIES }]
    });
  };
  return (
    <Wrapper>
      <Tooltip title="Reset to default fields">
        <Button
          variant="contained"
          color="secondary"
          onClick={resetToDefaultHandler}
        >
          Reset
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

export default ResetButton;
