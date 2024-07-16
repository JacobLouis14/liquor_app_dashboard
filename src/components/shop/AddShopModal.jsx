import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { TextField } from "@mui/material";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStates } from "../../redux/slices/stateSlice";
import { createShopApi } from "../../redux/slices/shopSclice";

function AddShopModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.stateReducer);
  const { loading, status } = useSelector((state) => state.shopReducer);
  // form State
  const [shopName, setShopName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [shopType, setShopType] = useState("");
  const [state, setState] = useState("");

  // options
  const [stateOptions, setStateOption] = useState([]);

  // form validation state
  const [isValidshopName, setisValidShopName] = useState(true);
  const [isValidaddress, setisValidAddress] = useState(true);
  const [isValidlatitude, setisValidLatitude] = useState(true);
  const [isValidlongitude, setisValidLongitude] = useState(true);

  //   category Options
  const categoryOptions = [
    { label: "Ordinary", value: "ordinary" },
    { label: "Premium", value: "premium" },
  ];
  const shopTypeOptions = [
    { label: "Beverage", value: "beverage" },
    { label: "Bar", value: "bar" },
  ];

  const inputValidationHandler = (e) => {
    const inputValue = e.target.value.trim();
    const inputName = e.target.name;
    switch (inputName) {
      case "shopname":
        if (/^[A-za-z ]*$/.test(inputValue)) {
          setShopName(inputValue);
          setisValidShopName(true);
        } else {
          setShopName(inputValue);
          setisValidShopName(false);
        }
        break;
      case "address":
        if (/^[a-zA-Z0-9,: ]*$/.test(inputValue)) {
          setAddress(inputValue);
          setisValidAddress(true);
        } else {
          setAddress(inputValue);
          setisValidAddress(false);
        }
        break;
      case "latitude":
        if (/^[0-9.]*$/.test(inputValue)) {
          setLatitude(inputValue);
          setisValidLatitude(true);
        } else {
          setLatitude(inputValue);
          setisValidLatitude(false);
        }
        break;
      case "longitude":
        if (/^[0-9.]*$/.test(inputValue)) {
          setLongitude(inputValue);
          setisValidLongitude(true);
        } else {
          setLongitude(inputValue);
          setisValidLongitude(false);
        }
        break;
    }
  };

  const initialDataHandler = () => {
    if (data.length < 1) {
      dispatch(fetchAllStates());
    } else {
      const transformedSateOption = data?.map((state) => ({
        label: state.StateName,
        value: state.StateName.toLowerCase(),
      }));
      setStateOption(transformedSateOption);
    }
  };

  // Add Shop Handler
  const submitHandler = async () => {
    try {
      const formData = {
        name: shopName,
        address: address,
        category: category.label,
        latitude: latitude,
        longitude: longitude,
        shopType: shopType.label,
        state: state.label,
      };
      dispatch(createShopApi(formData));
      if (!loading && status >= 200 && status < 300) {
        closeHandler();
      } else if (!loading && status < 200 && status >= 300) {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const closeHandler = () => {
    setShopName("");
    setAddress("");
    setCategory("");
    setLatitude("");
    setLongitude("");
    setShopType("");
    setState("");
    handleClose();
  };

  useEffect(() => {
    initialDataHandler();
  }, [data]);

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Shop</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="shopAddModal">
          <TextField
            className="mb-3 w-100"
            id="outlined-basic"
            label="Shop Name"
            variant="outlined"
            name="shopname"
            value={shopName}
            helperText={!isValidshopName && "Invalid Name"}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => inputValidationHandler(e)}
          />
          <TextField
            className="mb-3 w-100"
            id="outlined-basic"
            label="Address"
            variant="outlined"
            name="address"
            value={address}
            helperText={!isValidaddress && "Invalid Name"}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => inputValidationHandler(e)}
          />
          <TextField
            className="mb-3 w-100"
            id="outlined-basic"
            label="Latitude"
            variant="outlined"
            name="latitude"
            value={latitude}
            helperText={!isValidlatitude && "Invalid Name"}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => inputValidationHandler(e)}
          />
          <TextField
            className="mb-3 w-100"
            id="outlined-basic"
            label="Longitude"
            variant="outlined"
            name="longitude"
            value={longitude}
            helperText={!isValidlongitude && "Invalid Name"}
            FormHelperTextProps={{ sx: { color: "red" } }}
            onChange={(e) => inputValidationHandler(e)}
          />
          <p className="mb-1">Category</p>
          <Select
            className="mb-3"
            value={category}
            onChange={setCategory}
            options={categoryOptions}
          />
          <p className="mb-1">Shop Type</p>
          <Select
            className="mb-3"
            value={shopType}
            onChange={setShopType}
            options={shopTypeOptions}
          />
          <p className="mb-1">State where shop</p>
          <Select
            className="mb-3"
            value={state}
            onChange={setState}
            options={stateOptions}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeHandler}>
          Close
        </Button>
        <Button
          variant="primary"
          disabled={
            !shopName ||
            !address ||
            !category ||
            !latitude ||
            !longitude ||
            !isValidshopName ||
            !isValidaddress ||
            !isValidlatitude ||
            !isValidlongitude
          }
          onClick={submitHandler}
        >
          Add Shop
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddShopModal;
