import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategoryApi,
  fetchAllCategory,
} from "../redux/slices/categoriesSlice";
import CardComponent from "../components/common/CardComponent";
import { Col, Row } from "react-bootstrap";
import AddCategoriesModal from "../components/categories/AddCategoriesModal";

function Categories() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCategory());
  }, []);

  // Category details from redux
  const categoryData = useSelector((state) => state.categoryReducer);

  const [addCategoriesModalshow, setAddCategoriesModalshow] = useState(false);

  const handleClose = () => setAddCategoriesModalshow(false);
  const handleShow = () => setAddCategoriesModalshow(true);

  // category delete handler
  const deleteCategoryHandler = (categoryId) => {
    dispatch(deleteCategoryApi(categoryId));
  };

  return (
    <div className="categoryWrapper my-5 mx-3">
      <button
        className="btn mt-5 mb-4 btn-add ms-auto d-flex"
        onClick={handleShow}
      >
        Add Categories
      </button>
      {categoryData?.loading == false ? (
        <Row>
          {categoryData?.status >= 200 && categoryData?.status < 300 ? (
            <>
              {categoryData?.data?.map((category, index) => (
                <Col
                  key={index}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4 d-flex justify-content-center flex-wrap"
                >
                  <CardComponent
                    deleteCategoryHandler={deleteCategoryHandler}
                    data={category}
                    isFromProduct={false}
                  />
                </Col>
              ))}
            </>
          ) : (
            <div>No item</div>
          )}
        </Row>
      ) : (
        <div>loading</div>
      )}
      <AddCategoriesModal
        show={addCategoriesModalshow}
        handleClose={handleClose}
      />
    </div>
  );
}

export default Categories;
