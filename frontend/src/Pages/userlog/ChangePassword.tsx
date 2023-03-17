import { LoadingButton } from "@mui/lab";
import { Alert, Box, Grid, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordServer } from "../../redux/reducers/userReducer";
import { useAppDispatch } from "../../reduxhook/hooks";
import GridItem from "../../Styles/Themes/gridTheme";
import { UserPasswordType } from "../../Types/user";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const editPassword = () =>{
    setLoading(true)
    const passRequest: UserPasswordType = {
      oldpassword : oldPassword,
      newpassword: newPassword
    }

    dispatch(changePasswordServer(passRequest)).then((res)=>{
        if("error" in res){
            setMessage("Error! Your old password is not correct.");
            setOpen(true);
        }
        else{
            navigate("/");
        }
        setLoading(false);
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        mt: 28,
      }}
    >
      <Grid container sx={{ maxWidth: 500 }} rowSpacing={2}>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>
              Old password
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <TextField
              variant="standard"
              type={showOldPassword ? "text" : "password"}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick= {()=> setShowOldPassword(!showOldPassword)}
                      onMouseDown={()=> setShowOldPassword(!showOldPassword)}
                    >
                      {showOldPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            ></TextField>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>
              New password
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <TextField
              variant="standard"
              type={showNewPassword ? "text" : "password"}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{ // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick= {()=> setShowNewPassword(!showNewPassword)}
                      onMouseDown={()=> setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              required
            ></TextField>
          </GridItem>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LoadingButton
              loading={loading}
              variant="outlined"
              onClick={() => editPassword()}
            >
              {" "}
              Edit profile{" "}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
      
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity={"error"}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChangePassword;

