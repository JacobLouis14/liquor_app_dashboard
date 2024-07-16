import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { createStateApi } from "../../redux/slices/stateSlice";

function AddStateModal({ handleClose, show }) {
  const dispatch = useDispatch();
  const [stateName, setStateName] = useState("");
  const [isValidStateName, setIsValidStateName] = useState(true);

  //   validation Handler
  const formValueChangeHandler = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z ]*$/.test(value)) {
      setStateName(value);
      setIsValidStateName(true);
    } else {
      setStateName(value);
      setIsValidStateName(false);
    }
  };

  //   add state HAndler
  const addStateHandler = () => {
    const stateData = {
      StateName: stateName,
    };
    dispatch(createStateApi(stateData));
    closeHandler();
  };

  //   remove component state value Handler
  const closeHandler = () => {
    setIsValidStateName(true);
    setStateName("");
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="State Name"
              variant="outlined"
              name="statename"
              helperText={!isValidStateName && "Contains only letters"}
              value={stateName}
              FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => formValueChangeHandler(e)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeHandler}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={!stateName || !isValidStateName}
            onClick={addStateHandler}
          >
            Add State
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddStateModal;
