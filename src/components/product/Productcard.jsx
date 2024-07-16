import React, { useState } from "react";
import "./Productcard.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ProductAddModal from "./Productaddmodal";
import Productdetailmodal from "./productdetailmodal";
import CardComponent from "../common/CardComponent";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../../redux/slices/productSlice";

function Productcard({ productData }) {
  const dispatch = useDispatch();
  const [addProductModalShow, setaddProductModalShow] = useState(false);
  const [detailProductModal, setdetailProductModal] = useState(false);
  const [productModalDetails, setproductModalDetails] = useState([]);

  // product Add Modal Handler
  const handleAddProductModalClose = () => setaddProductModalShow(false);
  const handleAddProductModalShow = () => setaddProductModalShow(true);

  // product Detail Modal Handler
  const handleDetailModalClose = () => setdetailProductModal(false);
  const productDetailModalHandler = (data) => {
    setproductModalDetails(data), setdetailProductModal(true);
  };

  // product Delete Handler
  const deleteProductHandler = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <>
      {productData?.length > 0 ? (
        <div className="productCard mt-5 p-4">
          <button
            className="btn mb-4 d-flex btn-add ms-auto"
            onClick={handleAddProductModalShow}
          >
            Add Product
          </button>
          <Container fluid>
            <Row>
              {productData?.map((data, index) => (
                <Col
                  key={index}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4 d-flex justify-content-center flex-wrap"
                >
                  <CardComponent
                    data={data}
                    clickHandler={productDetailModalHandler}
                    isFromProduct={true}
                  />
                </Col>
              ))}
            </Row>
          </Container>
          <ProductAddModal
            show={addProductModalShow}
            handleClose={handleAddProductModalClose}
          />
          {detailProductModal && (
            <Productdetailmodal
              show={detailProductModal}
              handleClose={handleDetailModalClose}
              data={productModalDetails}
              productDeleteHandler={deleteProductHandler}
            />
          )}
        </div>
      ) : (
        <div>No item</div>
      )}
    </>
  );
}

export default Productcard;
