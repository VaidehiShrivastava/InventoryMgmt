import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Typography } from "@mui/material";
import TableLoader from "./TableLoader";
import { useSelector } from "react-redux";
import { CODE } from "../constants/StatusCodes";

export default function InventoryTable(props) {
  const { handleChangeInvData,handleEditEleId, userSwitch } = props;

  const data = useSelector((state)=>state.FinalInventoryData)

  const handleVisiblityIconClick = (id) => {
    const tempData = data.data.map((item, index) => ({
      ...item,
      visibility: item.id === id ? !item.visibility : item.visibility,
    }));

    handleChangeInvData(tempData);
  };

  const handleDeleteIconClick = (id) => {
    const tempData = data.data.filter((item) => item.id !== id);
    handleChangeInvData(tempData);
  };

  const handleEditIconClick = (id) => {
    handleEditEleId(id);
  };

  return (
    <>
    <TableContainer component={Paper} sx={{borderRadius:"10px",marginTop:"30px" }}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography color={"primary"}>Name</Typography></TableCell>
            <TableCell align="center"><Typography color={"primary"}>Category</Typography></TableCell>
            <TableCell align="center"><Typography color={"primary"}>Price</Typography></TableCell>
            <TableCell align="center"><Typography color={"primary"}>Quantity</Typography></TableCell>
            <TableCell align="center"><Typography color={"primary"}>Value</Typography></TableCell>
            <TableCell align="center"><Typography color={"primary"}>Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.status.code === CODE.SUCCESS ? (
            data.data.map((row) => (
              <TableRow
                key={row.name}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  opacity: row.visibility ? 1 : 0.5,
                }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">${row.price}</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{row.value}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <IconButton onClick={()=>handleEditIconClick(row.id)} disabled={userSwitch || !row.visibility}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleVisiblityIconClick(row.id)} disabled={userSwitch}>
                    {row.visibility ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                  <IconButton onClick={() => handleDeleteIconClick(row.id)} disabled={userSwitch} >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {data.status.code === CODE.Loading ? (
                <TableLoader rowsNum={5} />
              ) : <h3 style={{padding:"10px"}}>{data.status.mssg}</h3>}
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
