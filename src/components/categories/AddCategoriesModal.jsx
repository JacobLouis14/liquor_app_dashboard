import { TextField } from "@mui/material";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ImageGrid } from "../product/Productaddmodal";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryApi } from "../../redux/slices/categoriesSlice";

function AddCategoriesModal({ data, show, handleClose }) {
  const dispatch = useDispatch();
  const { loading, status } = useSelector((state) => state.categoryReducer);

  const [uploadedImage, setUploadedImage] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  // Image upload Handler
  const imageUploadHandler = (e) => {
    let imageUrl = [];
    let selectedImageObject = [];
    if (e.target.files.length) {
      const targetedFile = Array.from(e.target.files);
      targetedFile.forEach((file) => {
        imageUrl.push(URL.createObjectURL(file));
        selectedImageObject.push(file);
      });
      setUploadedImage(imageUrl);
      setSelectedImage(selectedImageObject);
    }
  };

  //   data remove Handler
  const dataRemoveHandler = () => {
    setUploadedImage([]);
    setSelectedImage([]);
    setCategoryName("");
  };

  //   form Field HAndler
  const formFieldOnChangeHandler = (value) => {
    setCategoryName(value);
  };

  //   submit ahndler
  const submitHandler = () => {
    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("categoryImage", selectedImage[0]);
    dispatch(addCategoryApi(formData));
    if (!loading && status >= 200 && status < 300) {
      dataRemoveHandler();
      handleClose();
    } else if (!loading && status < 200 && status >= 300) {
      alert("Something went wrong");
    }
  };
  return (
    <div>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={categoryName || ""}
              name="categoryname"
              FormHelperTextProps={{ sx: { color: "red" } }}
              onChange={(e) => formFieldOnChangeHandler(e.target.value)}
            />
            <h6 className="my-4">Select Category Photo</h6>
            <input
              type="file"
              name="categoryImage"
              className="mb-3"
              onChange={(e) => imageUploadHandler(e)}
            />
            <ImageGrid uploadedImages={uploadedImage} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose(), dataRemoveHandler();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={submitHandler}>
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddCategoriesModal;
