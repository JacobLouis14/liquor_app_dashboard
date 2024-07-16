import React, { useEffect, useState } from "react";
import ShopTable from "../components/shop/ShopTable";
import AddShopModal from "../components/shop/AddShopModal";
import { useDispatch } from "react-redux";
import { fetchAllShop } from "../redux/slices/shopSclice";

function Shop() {
  const dispatch = useDispatch();
  const [shopAddmodalShow, setshopAddmodalShow] = useState(false);

  // Add Shop Modal Handler
  const shopAddHandleClose = () => setshopAddmodalShow(false);
  const shopAddHandleShow = () => setshopAddmodalShow(true);

  useEffect(() => {
    dispatch(fetchAllShop());
  }, []);

  return (
    <>
      <ShopTable showAddModal={shopAddHandleShow} />
      <AddShopModal show={shopAddmodalShow} handleClose={shopAddHandleClose} />
    </>
  );
}

export default Shop;
