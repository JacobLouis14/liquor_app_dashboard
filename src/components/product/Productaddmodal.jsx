import React, { useEffect, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { Col, Container, Image, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategory } from "../../redux/slices/categoriesSlice";
import { fetchAllStates } from "../../redux/slices/stateSlice";
import { addProduct } from "../../redux/slices/productSlice";

/*-------------------------------Image Grid-------------------------------- */

export function ImageGrid({ uploadedImages, imageRemoveHandler }) {
  return (
    <Container fluid>
      <Row className="image-grid">
        {uploadedImages?.map((value, index) => (
          <Col
            key={index}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="mb-4 position-relative"
          >
            {imageRemoveHandler && (
              <span
                className="remove-button position-absolute top-0"
                onClick={() => imageRemoveHandler(index)}
              >
                &times;
              </span>
            )}
            <img src={value} alt="uploaded" className="uploaded-image mt-4" />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

/*-------------------------------Modal-------------------------------- */
function ProductAddModal({ show, handleClose }) {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const category = useSelector((state) => state.categoryReducer);
  const state = useSelector((state) => state.stateReducer);
  const { loading, status } = useSelector((state) => state.productReducer);

  // Modal State
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCode, setProductCode] = useState("");
  const [brandName, setBrandName] = useState("");
  const [quntity, setQuantity] = useState("");
  const [proof, setProof] = useState("");
  const [EDP, setEDP] = useState("");
  const [categorySelected, setCategorySelecteed] = useState(null);
  const [stateSelected, setStateSelecteed] = useState([]);
  const [uploadedImages, setUploadedImage] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  // options
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [stateOptions, setStateoptions] = useState([]);
  // Validation State
  const [isValidproductName, setisValidproductName] = useState(true);
  const [isValidproductPrice, setisValidproductPrice] = useState(true);
  const [isValidproductCode, setisValidproductCode] = useState(true);
  const [isValidbrandName, setisValidbrandName] = useState(true);
  const [isValidquntity, setisValidquantity] = useState(true);
  const [isValidproof, setisValidproof] = useState(true);
  const [isValidEDP, setisValidEDP] = useState(true);

  // Image upload Handlers
  const imageUploadHandler = (e) => {
    e.preventDefault();
    const selectedFileURLs = [];
    const selectedFileObjects = [];

    if (e.target.files.length) {
      const targetedFiles = Array.from(e.target.files); // Convert FileList to Array

      targetedFiles.forEach((file) => {
        selectedFileURLs.push(URL.createObjectURL(file));
        selectedFileObjects.push(file);
      });

      // Flatten the array before setting the state to avoid nested arrays
      setSelectedImages((prevData) => [...prevData, ...selectedFileObjects]);
      setUploadedImage((prevImage) => prevImage.concat(selectedFileURLs));
    }
  };

  const imageRemoveHandler = (index) => {
    setUploadedImage((prevImages) => prevImages.filter((_, i) => i != index));
    setSelectedImages((prevData) => prevData.filter((_, i) => i != index));
    fileInputRef.current.value = "";
  };

  // Input Validation
  const inputboxValidation = (e) => {
    const inputValue = e.target.value.trim();
    switch (e.target.name) {
      case "productname":
        if (/^[A-Z\s a-z]*$/.test(inputValue)) {
          setProductName(inputValue);
          setisValidproductName(true);
        } else {
          setProductName(inputValue);
          setisValidproductName(false);
        }
        break;

      case "productprice":
        if (/^[0-9]*$/.test(inputValue)) {
          setProductPrice(inputValue);
          setisValidproductPrice(true);
        } else {
          setProductPrice(inputValue);
          setisValidproductPrice(false);
        }
        break;

      case "productcode":
        if (/^[0-9a-zA-Z ]*$/.test(inputValue)) {
          setProductCode(inputValue);
          setisValidproductCode(true);
        } else {
          setProductCode(inputValue);
          setisValidproductCode(false);
        }
        break;

      case "brandname":
        if (/^[A-Za-z0-9 ]*$/.test(inputValue)) {
          setBrandName(inputValue);
          setisValidbrandName(true);
        } else {
          setBrandName(inputValue);
          setisValidbrandName(false);
        }
        break;

      case "quantity":
        if (/^[0-9]*$/.test(inputValue)) {
          setQuantity(inputValue);
          setisValidquantity(true);
        } else {
          setQuantity(inputValue);
          setisValidquantity(false);
        }
        break;

      case "proof":
        if (/^[0-9.]*$/.test(inputValue)) {
          setProof(inputValue);
          setisValidproof(true);
        } else {
          setProof(inputValue);
          setisValidproof(false);
        }
        break;

      case "edp":
        if (/^[0-9.]*$/.test(inputValue)) {
          setEDP(inputValue);
          setisValidEDP(true);
        } else {
          setEDP(inputValue);
          setisValidEDP(false);
        }
        break;

      default:
        break;
    }
  };

  // ADD product handler
  const addProductHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("productPrice", productPrice);
      formData.append("productCode", productCode);
      formData.append("brandName", brandName);
      formData.append("quantity", quntity);
      formData.append("proof", proof);
      formData.append("EDP", EDP);
      formData.append("category", categorySelected.value);
      stateSelected.forEach((item) => {
        formData.append("productAvailableState", item.label);
      });
      selectedImages.forEach((file) => {
        formData.append(`Images`, file);
      });
      dispatch(addProduct(formData));
      if (!loading && status >= 200 && status < 300) {
        stateClear();
        handleClose();
      } else if (!loading && status < 200 && status >= 300) {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // function for clearing state value
  const stateClear = () => {
    setProductName("");
    setProductPrice("");
    setProductCode("");
    setBrandName("");
    setQuantity("");
    setProof("");
    setEDP("");
    setCategorySelecteed(null);
    setStateSelecteed([]);
    setUploadedImage([]);
    setSelectedImages([]);
    setisValidproductName(true);
    setisValidproductPrice(true);
    setisValidproductCode(true);
    setisValidbrandName(true);
    setisValidquantity(true);
    setisValidproof(true);
    setisValidEDP(true);
  };

  const initialDataHandler = () => {
    // category data handling
    if (category.data.length < 1) {
      dispatch(fetchAllCategory());
    } else {
      let transformedCategory = category?.data?.map((cat) => ({
        label: cat.CategoryName,
        value: cat.CategoryValue,
      }));
      transformedCategory = transformedCategory?.filter(
        (val) => val.value != "all"
      );
      setCategoryOptions(transformedCategory);
    }
    // State data Handling
    if (state.data.length < 1) {
      dispatch(fetchAllStates());
    } else {
      let transformedState = state?.data?.map((eachState) => ({
        label: eachState.StateName,
        value: eachState.StateName.toLowerCase(),
      }));
      setStateoptions(transformedState);
    }
  };

  useEffect(() => {
    initialDataHandler();
  }, [category, state]);

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalContainer">
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Product Name"
              variant="outlined"
              placeholder="eg: Black Label"
              name="productname"
              value={productName}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidproductName && "Invalid Name"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Product Price"
              variant="outlined"
              placeholder="eg: 2000"
              name="productprice"
              value={productPrice}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidproductPrice && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Product Code"
              variant="outlined"
              placeholder="eg: 0X12345"
              name="productcode"
              value={productCode}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidproductCode && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Brand Name"
              variant="outlined"
              placeholder="eg: Deagio"
              name="brandname"
              value={brandName}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidbrandName && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Quantity (ml)"
              variant="outlined"
              placeholder="eg: 1000, 750"
              name="quantity"
              value={quntity}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidquntity && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="Proof"
              variant="outlined"
              placeholder="eg: 75"
              name="proof"
              value={proof}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidproof && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <TextField
              className="mb-3 w-100"
              id="outlined-basic"
              label="EDP"
              variant="outlined"
              placeholder="eg: 550.34"
              name="edp"
              value={EDP}
              onChange={(e) => inputboxValidation(e)}
              helperText={!isValidEDP && "Invalid Price"}
              FormHelperTextProps={{ sx: { color: "red" } }}
            />
            <p className="mb-1">Category</p>
            <Select
              className="mb-3"
              value={categorySelected}
              onChange={setCategorySelecteed}
              options={categoryOptions}
            />
            <p className="mb-1">State Available</p>
            <Select
              className="mb-3"
              value={stateSelected}
              onChange={setStateSelecteed}
              options={stateOptions}
              isMulti
            />
            <p className="mb-1">Upload Images</p>
            <input
              type="file"
              name="Images"
              className="mb-3"
              onChange={(e) => {
                imageUploadHandler(e);
              }}
              multiple
              ref={fileInputRef}
            />
            <ImageGrid
              uploadedImages={uploadedImages}
              imageRemoveHandler={imageRemoveHandler}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              stateClear();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={
              !isValidproductName ||
              !isValidproductPrice ||
              !isValidproductCode ||
              !isValidbrandName ||
              !isValidquntity ||
              !isValidproof ||
              !isValidEDP ||
              !productName ||
              !productPrice ||
              !productCode ||
              !brandName ||
              !quntity ||
              !proof ||
              !EDP
            }
            variant="primary"
            onClick={(e) => {
              addProductHandler(e);
            }}
          >
            Add Products
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProductAddModal;
