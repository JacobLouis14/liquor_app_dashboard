import React from "react";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deleteStateApi } from "../../redux/slices/stateSlice";

function StateTable({ stateData }) {
  const dispatch = useDispatch();

  // edit handler
  const editHandler = (stateId) => {};

  // delete handler
  const deleteHandler = (stateId) => {
    dispatch(deleteStateApi(stateId));
  };

  return (
    <>
      {stateData?.status >= 200 && stateData?.status < 300 ? (
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>State Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stateData?.data.map((state, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{state.StateName}</td>
                <td className="d-flex justify-content-evenly">
                  <button
                    className="btn btn-primary me-2 "
                    onClick={() => editHandler(state._id)}
                  >
                    <EditIcon /> Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(state._id)}
                  >
                    <DeleteIcon /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div>No Data</div>
      )}
    </>
  );
}

export default StateTable;
