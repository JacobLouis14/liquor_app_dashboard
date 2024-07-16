import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../redux/slices/productSlice";
import { fetchAllShop } from "../redux/slices/shopSclice";
import { fetchAllUsers } from "../redux/slices/userSlice";

export function CardComponent({ name, image, number }) {
  return (
    <div
      className="cardComp ps-2 pe-5 py-3 m-4 d-flex rounded-4"
      style={{ backgroundColor: "white", width: "250px" }}
    >
      <img
        src={image}
        alt="product Image"
        style={{ height: "100px", width: "100px" }}
        className="me-3"
        draggable={false}
      />
      <div className="cardDetails">
        <h3 className="fw-bold fs-1">{number}</h3>
        <h6 className="text-secondary">{name}</h6>
      </div>
    </div>
  );
}

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct());
    dispatch(fetchAllShop());
    dispatch(fetchAllUsers());
  }, []);

  const overallData = [
    {
      name: "Produts",
      image: "Images/olive-oil-green-bottle_24908-83338-removebg-preview.png",
      number: useSelector((state) => state.productReducer.data.length),
    },
    {
      name: "Store",
      image: "Images/store.png",
      number: useSelector((state) => state.shopReducer.data.length),
    },
    {
      name: "Users",
      image: "Images/users.png",
      number: useSelector((state) => state.userReducer.data.length),
    },
  ];

  return (
    <div className="dashboard">
      <div className="welcomeText ms-4">
        <h2>Hi,Welcome back</h2>
      </div>
      <Row className="content-1 mt-5">
        {overallData?.map((data, index) => (
          <Col
            key={index}
            className="d-flex justify-content-center align-items-center"
            md={4}
            sm={6}
          >
            <CardComponent
              name={data.name}
              image={data.image}
              number={data.number}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Dashboard;
