import {
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import GridItem from "../../Styles/Themes/gridTheme";
import { editUserServer } from "../../redux/reducers/userReducer";
import { UserType } from "../../Types/user";

const Profile = () => {
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch()

  const [editUser, setEditUser] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>(user.name);
  const [userEmail, setUserEmail] = useState<string>(user.email);
  const [userPassword, setUserPassword] = useState<string>(user.password);
  const [loading, setLoading] = useState<boolean>(false)

  const toggleEdit = () => {
    setEditUser(!editUser);
    setUserName(user.name);
    setUserEmail(user.email);
    setUserPassword(user.password);
  };

  const editUserInfo = () =>{
    setLoading(true)
    const newUser: UserType = {
      ...user
    }

    newUser.email = userEmail;
    newUser.name = userName;
    newUser.password = userPassword;
    dispatch(editUserServer(newUser)).then((res)=>{
      setEditUser(false)
      setLoading(false)
    })
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 30,
      }}
    >
      <Grid container sx={{ maxWidth: 500 }} rowSpacing={2}>
        <Grid item xs={12}>
          <Box sx={{ position: "relative" }}>
            {user.avatar ? (
              <Box
                component="img"
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                  position: "absolute",
                  bottom: 0,
                  left: "5%",
                }}
                src={user.avatar}
              ></Box>
            ) : (
              <Box className="login_img" sx={{ width: 100, height: 120 }}></Box>
            )}
            <IconButton
              sx={{
                position: "absolute",
                right: 10,
                bottom: -5,
                borderBottom: 2,
              }}
              disabled={loading}
              color={editUser ?  "secondary" : "primary"}
              onClick={() => {
                toggleEdit();
              }}
            >
              <EditIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: 45 }}>
            <Typography sx={{ border: 2, borderRadius: 5 }}>
              User name
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: 45 }}>
            {editUser ? (
              <TextField
                variant="standard"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              ></TextField>
            ) : (
              <Typography>{user.name}</Typography>
            )}
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>ID</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: 45 }}>
            <Typography>{user.id}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>
              User email
            </Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: 45 }}>
          {editUser ? (
              <TextField
                variant="standard"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                required
              ></TextField>
            ) : (
              <Typography>{user.email}</Typography>
            )}
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>Role</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: "100%" }}>
            <Typography>{user.role}</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem>
            <Typography sx={{ border: 2, borderRadius: 5 }}>Password</Typography>
          </GridItem>
        </Grid>
        <Grid item xs={6}>
          <GridItem sx={{ height: 45}}>
          {editUser ? (
              <TextField
                variant="standard"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                required
              ></TextField>
            ) : (
              <Typography>{"************"}</Typography>
            )}
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
            <LoadingButton loading={loading} variant="outlined" onClick={()=>editUserInfo()}> Edit profile </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
