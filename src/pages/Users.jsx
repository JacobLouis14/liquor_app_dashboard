import React, { useEffect } from "react";
import UserTable from "../components/user/userTable";
import { useDispatch } from "react-redux";
import { fetchAllUsers } from "../redux/slices/userSlice";

function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, []);

  return (
    <>
      <div className="userWrapper my-5 mx-3">
        <UserTable />
      </div>
    </>
  );
}

export default Users;
