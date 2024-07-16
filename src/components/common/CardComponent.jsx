import React from "react";
import { Card } from "react-bootstrap";

function CardComponent({
  deleteCategoryHandler,
  data,
  clickHandler,
  isFromProduct,
}) {
  return (
    <>
      <Card
        className="rounded-4 productCard"
        style={{ width: "15rem" }}
        onClick={() => {
          isFromProduct && clickHandler(data);
        }}
      >
        <Card.Img
          variant="top"
          src={
            isFromProduct
              ? data?.ProductImageUrl[0].url
              : data?.CategoryPhotoUrl
          }
          className="product-image"
          draggable={false}
        />
        <Card.Body>
          <Card.Title>
            {isFromProduct ? data?.ProductName : data?.CategoryName}
          </Card.Title>
          {isFromProduct && (
            <Card.Text className="float-end">{data?.ProductPrice}</Card.Text>
          )}
          {!isFromProduct && (
            <div className="d-flex justify-content-start align-items-center mt-3 flex-wrap">
              <button className="btn btn-primary me-3 mb-3">Edit</button>
              <button
                className="btn btn-danger mb-3"
                onClick={() => deleteCategoryHandler(data?._id)}
              >
                Delete
              </button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default CardComponent;
