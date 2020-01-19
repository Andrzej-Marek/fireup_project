import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { TextField, Button, Switch } from "@material-ui/core";
import { ModalFade } from "./ModalFade";
import { MODAL_BACKDROP_SHOW_DOWN_TIME } from "config";
import { FormWrapper, modalUseStyles, ModalWrapper } from "assets/styles";

interface Props {
  open: boolean;
  toggleOpen: () => void;
  categoryName: string | null;
  submitData: (value: string) => void;
}

const AddItemModal: React.FC<Props> = ({
  open,
  toggleOpen,
  categoryName,
  submitData
}) => {
  const classes = modalUseStyles();
  const [value, setValue] = useState("");

  const sendDataHandler = () => {
    submitData(value);
    setValue("");
  };
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={toggleOpen}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: MODAL_BACKDROP_SHOW_DOWN_TIME
      }}
    >
      <ModalFade in={open}>
        <ModalWrapper>
          <h3>Add new item</h3>
          <p>
            You're adding item to category: <span> {categoryName} </span>
          </p>

          <form onSubmit={e => e.preventDefault()}>
            <FormWrapper>
              <TextField
                label="Type item name"
                onChange={e => setValue(e.target.value)}
                autoFocus
                inputProps={{
                  "data-testid": "add-item-input"
                }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => sendDataHandler()}
                type="submit"
                data-testid="add-item-submit-button"
              >
                Add
              </Button>
            </FormWrapper>
          </form>
        </ModalWrapper>
      </ModalFade>
    </Modal>
  );
};

export default AddItemModal;
