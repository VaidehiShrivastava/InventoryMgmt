import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid,IconButton,Box } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";

export default function EditInventory(props) {
  const { open, handleClose,handleEditSaveBtnClick } = props;

  const data = useSelector((state)=>state.FinalInventoryData);
  const modalData = data.data.filter((item) => item.id === open.id)[0];

  const [itemData, setItemData] = React.useState({
    id:null,
    name: "",
    category: "",
    price: 0,
    quantity: 0,
    value: "",
  });

  const handleItemChanges = (event, item) => {
    setItemData((prev) => ({
      ...prev,
      [item]: event.target.value,
    }));
  };

  React.useEffect(() => {
    modalData !== undefined &&
      setItemData({
        id: modalData.id,
        name: modalData.name,
        category: modalData.category,
        price: modalData.price,
        quantity: modalData.quantity,
        value: modalData.value,
      });
  }, [modalData]);

  return (
    <React.Fragment>
      <Dialog
        open={open.value}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleEditSaveBtnClick(itemData);
            handleClose();
          },
        }}
      >
        <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center", pr:2}}>
        <DialogTitle>
            Edit product
        </DialogTitle>
        <IconButton onClick={()=>handleClose()} sx={{height:"40px"}}><CloseIcon color="primary"/></IconButton>
        </Box>
        <DialogContent>
          <DialogContentText>{itemData.name}</DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="category"
                name="category"
                label="Category"
                value={itemData.category}
                onChange={(event) => handleItemChanges(event, "category")}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="price"
                name="price"
                label="Price"
                value={itemData.price}
                onChange={(event) => handleItemChanges(event, "price")}
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="quantity"
                name="quantity"
                label="Quantity"
                value={itemData.quantity}
                onChange={(event) => handleItemChanges(event, "quantity")}
                type="number"
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="value"
                name="value"
                label="Value"
                value={itemData.value}
                onChange={(event) => handleItemChanges(event, "value")}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">Cancel</Button>
          <Button type="submit" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
