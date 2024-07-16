import React, { useEffect, useState } from "react";
import StateTable from "../components/location/stateTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStates } from "../redux/slices/stateSlice";
import AddStateModal from "../components/state/AddStateModal";

function State() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllStates());
  }, []);

  // Accesing state from redux
  const stateData = useSelector((state) => state.stateReducer);

  const [addStateShowModal, setAddStateShowModal] = useState(false);

  const handleClose = () => setAddStateShowModal(false);
  const handleShow = () => setAddStateShowModal(true);

  return (
    <div className="m-5">
      <button
        className="btn mt-5 mb-4 btn-add ms-auto d-flex"
        onClick={handleShow}
      >
        Add State
      </button>
      {!stateData?.loading ? (
        <StateTable stateData={stateData} />
      ) : (
        <div>loading</div>
      )}
      <AddStateModal show={addStateShowModal} handleClose={handleClose} />
    </div>
  );
}

export default State;
