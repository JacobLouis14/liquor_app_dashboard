import React from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deletShopApiHandler } from "../../redux/slices/shopSclice";

function ShopTable({ showAddModal }) {
  const dispatch = useDispatch();
  // Shop data from redux
  const shopData = useSelector((state) => state.shopReducer);

  // shop edit Handler
  const editHandler = (id) => {
    console.log(id);
  };

  // shop delete Handler
  const deleteHandler = (id) => {
    dispatch(deletShopApiHandler(id));
  };

  return (
    <>
      {shopData.loading == false ? (
        <div className="mt-5 p-4">
          <button
            className="btn mb-4 d-flex btn-add ms-auto"
            onClick={showAddModal}
          >
            Add Shop
          </button>
          {shopData?.status >= 200 && shopData?.status < 300 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Category</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Shop_Type</th>
                  <th>State</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {shopData?.data.map((shop, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{shop.Name}</td>
                    <td>{shop.Address}</td>
                    <td>{shop.Category}</td>
                    <td>{shop.Latitude}</td>
                    <td>{shop.Longitude}</td>
                    <td>{shop.Shop_Type}</td>
                    <td>{shop.State}</td>
                    <td className="d-flex justify-content-evenly">
                      <button
                        className="btn btn-primary me-2 "
                        onClick={() => editHandler(shop._id)}
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteHandler(shop._id)}
                      >
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No item</div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
}

export default ShopTable;
