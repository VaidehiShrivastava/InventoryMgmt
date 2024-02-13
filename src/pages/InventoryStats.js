import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PageHeader from "../components/PageHeader";
import UserSwitch from "../components/UserSwitch";
import InventoryTable from "../components/InventoryTable";
import InventoryKPIs from "../components/InventoryKPIs";
import EditInventory from "../components/EditInventory";

import { reduxInventoryData } from "../actions/InventoryStats";
import {CODE,CODEMSG} from "../constants/StatusCodes"


export default function InventoryStats() {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.FinalInventoryData);

  const handleChangeInvData = (data) => {
    if (data.length > 0)
      dispatch(reduxInventoryData({ data: data, code: CODE.SUCCESS, mssg: CODEMSG.SUCCESS }));
    else
      dispatch(
        reduxInventoryData({ data: [], code: CODE.ERROR, mssg: CODEMSG.ERROR })
      );
  };

  const [userSwitch, setUserSwitch] = useState(false);
  const handleUserSwitch = (event) => {
    setUserSwitch(event.target.checked);
  };

  const [editItem, setEditItem] = React.useState({
    value: false,
    id: null,
  });
  const handleEditEleId = (id) => {
    setEditItem({
      value: true,
      id: id,
    });
  };

  const handleCloseEdit = () => {
    setEditItem({
      value: false,
      id: null,
    });
  };
  function handleEditSaveBtnClick(data) {
    const tempData = reduxData.data.map((item) =>
      item.id === data.id
        ? {
            ...item,
            category: data.category,
            price: data.price,
            quantity: data.quantity,
            value: data.value,
          }
        : item
    );
    dispatch(reduxInventoryData({ data: tempData, code: CODE.SUCCESS, mssg: CODEMSG.SUCCESS}));
  }

  async function getTheData() {
    const invData = await fetch(
      "https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory"
    );
    try {
      const data = await invData.json();
      const tempData = data.map((v, index) => ({
        ...v,
        visibility: true,
        id: index,
        price: parseInt(v.price.slice(1)),
      }));
      dispatch(
        reduxInventoryData({ data: tempData, code: CODE.SUCCESS, mssg: CODEMSG.SUCCESS })
      );
    } catch (e) {
      dispatch(
        reduxInventoryData({data: [],code: CODEMSG.SERVER_ERROR,mssg: CODEMSG.SERVER_ERROR})
      );
    }
  }

  useEffect(() => {
    getTheData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserSwitch userSwitch={userSwitch} handleUserSwitch={handleUserSwitch} />
      <PageHeader heading={"Inventory Stats"} />
      <InventoryKPIs />
      <InventoryTable
        userSwitch={userSwitch}
        handleChangeInvData={handleChangeInvData}
        handleEditEleId={handleEditEleId}
      />
      <EditInventory
        open={editItem}
        handleClose={handleCloseEdit}
        handleEditSaveBtnClick={handleEditSaveBtnClick}
      />
    </div>
  );
}
