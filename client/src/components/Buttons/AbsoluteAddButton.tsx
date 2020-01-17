import React from "react";
import styled from "styled-components";
import { Fab, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

interface Props {
  title: string;
  onClickFunction: () => void;
}
const AbsoluteAddButton: React.FC<Props> = ({ title, onClickFunction }) => {
  return (
    <AddCategoryButtonWrapper>
      <Tooltip title={title}>
        <Fab color="primary" aria-label="add" onClick={() => onClickFunction()}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </AddCategoryButtonWrapper>
  );
};

const AddCategoryButtonWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 10vw;
`;
export default AbsoluteAddButton;
