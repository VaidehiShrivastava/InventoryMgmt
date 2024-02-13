import * as React from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import { Box } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function UserSwitch(props) {
  const { userSwitch, handleUserSwitch } = props;
  return (
    <Box sx={{display:"flex",justifyContent:"flex-end"}}>
    <FormControl component="fieldset" >
      <FormGroup
        aria-label="position"
        row
        sx={{ display: "flex", alignItems: "center" }}
      >
        <h5>Admin</h5>
        <FormControlLabel
          checked={userSwitch}
          onChange={handleUserSwitch}
          control={<Switch color="primary" sx={{ marginRight: "20px" }} />}
          label=""
          labelPlacement="start"
        />
        <h5>User</h5>
      </FormGroup>
    </FormControl>
    </Box>
  );
}
