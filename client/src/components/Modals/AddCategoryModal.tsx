import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  FormGroup,
  TextField,
  Button
} from "@material-ui/core";
import { MODAL_BACKDROP_SHOW_DOWN_TIME, MIN_CATEGORY_LENGHT } from "config";
import { ModalFade } from "./ModalFade";
import { FormWrapper, ModalWrapper, modalUseStyles } from "assets/styles";
import { ErrorShow } from "assets/styles/ErrorShow";
import { validateMinAndMaxLenght } from "MultiUse/validateMinAndMaxLenght";
interface Props {
  open: boolean;
  toggle: () => void;
  onSubmit: (categoryName: string) => void;
}

const AddCategoryModal: React.FC<Props> = ({ open, toggle, onSubmit }) => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState<null | string>(null);
  const classes = modalUseStyles();

  const submitButtonClick = () => {
    if (!validateMinAndMaxLenght(categoryName, MIN_CATEGORY_LENGHT)) {
      return setError(
        `Category name should be at least ${MIN_CATEGORY_LENGHT} characters long`
      );
    }
    onSubmit(categoryName);
    togleFunction();
    setCategoryName("");
  };

  const togleFunction = () => {
    toggle();
    setCategoryName("");
    setError(null);
  };
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={togleFunction}
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
                  error={!!error}
                />
                <ErrorShow>{error && error}</ErrorShow>
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
