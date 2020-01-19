import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  FormGroup,
  TextField,
  Button
} from "@material-ui/core";
import { MODAL_BACKDROP_SHOW_DOWN_TIME } from "config";
import { ModalFade } from "./ModalFade";
import { FormWrapper, ModalWrapper, modalUseStyles } from "assets/styles";

interface Props {
  open: boolean;
  toggle: () => void;
  onSubmit: (categoryName: string) => void;
}

const AddCategoryModal: React.FC<Props> = ({ open, toggle, onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");
  const classes = modalUseStyles();

  const submitButtonClick = () => {
    onSubmit(categoryName);
    toggle();
    setCategoryName("");
  };
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={toggle}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: MODAL_BACKDROP_SHOW_DOWN_TIME
      }}
    >
      <ModalFade in={open}>
        <ModalWrapper>
          <h3>Add a new category</h3>
          <form onSubmit={e => e.preventDefault()}>
            <FormWrapper>
              <FormGroup>
                <TextField
                  label="Category name"
                  value={categoryName}
                  onChange={e => setCategoryName(e.target.value)}
                  autoFocus
                  inputProps={{
                    "data-testid": "add-category-input"
                  }}
                />
              </FormGroup>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={submitButtonClick}
                data-testid="add-category-submit-button"
              >
                Add new category
              </Button>
            </FormWrapper>
          </form>
        </ModalWrapper>
      </ModalFade>
    </Modal>
  );
};

export default AddCategoryModal;
