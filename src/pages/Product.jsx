import React, { useEffect, useState } from "react";
import { CardComponent } from "./Dashboard";
import { Col, Row } from "react-bootstrap";
import FilterListIcon from "@mui/icons-material/FilterList";
import "./Product.css";
import Productcard from "../components/product/Productcard";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../redux/slices/productSlice";

function FirstBox({ productLength }) {
  const name = "Products";
  const image =
    "public/Images/olive-oil-green-bottle_24908-83338-removebg-preview.png";
  const number = productLength;
  return <CardComponent name={name} image={image} number={number} />;
}
export function FilterAndSearch({ productSearchHandler }) {
  return (
    <>
      <Col sm={8}>
        <div className="searchContainer mb-4 mx-3 d-flex">
          <input
            type="text"
            placeholder="search"
            className="form-control me-2"
            onChange={(e) => productSearchHandler(e.target.value)}
          />
          <button
            className="btn text-light"
            style={{ backgroundColor: "blueviolet" }}
          >
            Search
          </button>
        </div>
      </Col>
      <Col sm={4}>
        <div className="buttonContainer d-flex justify-content-end justify-content-lg-start me-lg-5">
          <button className="btn me-2">
            <span className="me-2">Filters</span>
            <FilterListIcon />
          </button>
          <button className="btn me-2">Sort By</button>
        </div>
      </Col>
    </>
  );
}

function Product() {
  const dispatch = useDispatch();

  // accesing product data using redux
  const productData = useSelector((state) => state.productReducer);
  const [filteredProductList, setFilteredProductList] = useState([]);

  // product search filter handler
  const productSearchHandler = (searchValue) => {
    let filteredList = productData.data.filter((product) =>
      product.ProductName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredProductList(filteredList);
  };

  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProductList(productData.data);
  }, [productData.data]);

  return (
    <div className="products">
      {productData?.loading == false ? (
        <>
          <Row className="topContainer">
            <Col>
              <FirstBox productLength={productData?.data.length} />
            </Col>
          </Row>
          <Row className="mt-5">
            <FilterAndSearch productSearchHandler={productSearchHandler} />
          </Row>
          <Productcard productData={filteredProductList} />
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default Product;
