import React, { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";

import NumberWithCommas from "../helpers/NumberWithCommas";
import { useSelector } from "react-redux";

export default function InventoryKPIs() {
  const reduxData = useSelector((state) => state.FinalInventoryData);

  const [kpiData, setKPIData] = useState([]);

  useEffect(() => {
    let tempTotalProd = 0,
      tempStoreVal = 0,
      tempOutStock = 0,
      tempCategory = [];

    reduxData.data.forEach((item) => {
      tempTotalProd = tempTotalProd + 1;
      tempStoreVal = tempStoreVal + parseInt(item.price);
      if (item.visibility === false) tempOutStock = tempOutStock + 1;
    });
    tempCategory = [...new Set(reduxData.data.map((item) => item.category))];

    setKPIData([
      {
        name: "Total product",
        count: tempTotalProd,
        icon: <ShoppingCartIcon />,
      },
      {
        name: "Total store value",
        count: NumberWithCommas(tempStoreVal),
        icon: <CurrencyExchangeIcon />,
      },
      {
        name: "Out of stocks",
        count: tempOutStock,
        icon: <RemoveShoppingCartIcon />,
      },
      {
        name: "Number of category",
        count: tempCategory.length,
        icon: <CategoryIcon />,
      },
    ]);
  }, [reduxData]);

  function KPIItem({ name, icon, count }) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          bgcolor: "darkgreen",
          borderRadius: "10px",
        }}
      >
        <div style={{ padding: "15px" }}>{icon}</div>
        <div>
          <p>{name}</p>
          <h3>
            {name === "Total store value" && "$"}
            {count}
          </h3>
        </div>
      </Box>
    );
  }

  return (
    <div>
      <Grid container spacing={2}>
        {kpiData.map((item, index) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={3} xl={3} key={index}>
              <KPIItem name={item.name} icon={item.icon} count={item.count} />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
