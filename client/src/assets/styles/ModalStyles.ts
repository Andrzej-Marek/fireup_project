import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const modalUseStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      outline: "none !important"
    }
  })
);

export const ModalWrapper = styled.div`
  padding: 20px;
  background: ${({ theme }) => theme.color.white};

  h3 {
    text-align: center;
    font-size: 28px;
    margin-bottom: 15px;
  }

  p {
    font-style: italic;
    font-size: 14px;
    text-align: center;
    span {
      font-weight: 700;
    }
  }
`;
