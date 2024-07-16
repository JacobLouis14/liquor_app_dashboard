import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Productdetailmodal({ show, handleClose, data, productDeleteHandler }) {
  return (
    <>
      {data ? (
        <Modal centered show={show} onHide={handleClose} size="xl">
          <Modal.Header closeButton>
            <Modal.Title>Product Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                className="d-flex align-items-center justify-content-center"
                lg={6}
              >
                <img
                  src={data?.ProductImageUrl[0]?.url}
                  alt="Product image"
                  className="w-100"
                  draggable={false}
                />
              </Col>
              <Col lg={6}>
                <p>
                  Product Name :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.ProductName}
                  </span>
                </p>
                <p>
                  Brand Name :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.BrandName}
                  </span>
                </p>
                <p>
                  Category :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.Category}
                  </span>
                </p>
                <p>
                  Product Code :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.ProductCode}
                  </span>
                </p>
                <p>
                  Proof :
                  <span className="fs-4 ms-3 fw-semibold">{data?.Proof}</span>
                </p>
                <p>
                  Quantity :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.Quantity}
                  </span>
                </p>
                <p>
                  EDP :
                  <span className="fs-4 ms-3 fw-semibold">{data?.EDP}</span>
                </p>
                <p>
                  Available State :
                  {data?.ProductAvailableState.map((state, index) => (
                    <span
                      key={index}
                      className="fs-4 ms-3 fw-semibold"
                    >{`${state}, `}</span>
                  ))}
                </p>
                <p>
                  Product Price :
                  <span className="fs-4 ms-3 fw-semibold">
                    {data?.ProductPrice}
                  </span>
                </p>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={() => {
                productDeleteHandler(data?._id);
                handleClose();
              }}
            >
              Delete
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div>Something went wrong</div>
      )}
    </>
  );
}

export default Productdetailmodal;
