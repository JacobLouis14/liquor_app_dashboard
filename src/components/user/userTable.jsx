import React from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";

function UserTable() {
  // user data from redux
  const userData = useSelector((state) => state.userReducer);
  return (
    <>
      {userData.loading == false ? (
        <div className="p-3">
          {userData?.status >= 200 && userData?.status < 300 ? (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>DateOfBirth</th>
                </tr>
              </thead>
              <tbody>
                {userData?.data.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.DateOfBirth}</td>
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

export default UserTable;
