import React from "react";
import styled from "styled-components";
import Snackbar from "@material-ui/core/Snackbar";

const Wrapper = styled.div<Bool>`
  .MuiSnackbarContent-root {
    background: ${({ status, theme }) =>
      status ? theme.color.green : theme.color.red};
  }
`;

interface Bool {
  status: boolean;
}
interface Props {
  message: string;
  status: boolean;
  show: boolean;
  callback: () => void;
}
const ErrorShowComponent = ({ message, status, show, callback }: Props) => {
  return (
    <Wrapper status={status!}>
      <Snackbar
        autoHideDuration={4000}
        open={show}
        onClose={callback}
        message={message}
      />
    </Wrapper>
  );
};

export default ErrorShowComponent;
