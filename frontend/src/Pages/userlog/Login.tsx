import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { googleLoginServer, UserLogin } from "../../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../reduxhook/hooks";
import { FlexBox } from "../../Styles/Themes/styledComp";

// Google login
// https://livefiredev.com/in-depth-guide-sign-in-with-google-in-a-react-js-application/

const UserForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.userReducer);

  const signinHandler = () => {
    setLoading(true);
    const login = async () => {
      await dispatch(UserLogin({ email: email, password: password })).then(
        (response) => {
          if ("error" in response)
            warningMessage("Error! Your email or password are not correct.");
          setLoading(false);
        }
      );
    };
    login();
  };

  const warningMessage = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };
  
  const onSuccessDo = (res: CredentialResponse) => {
    var access_token = res.credential;
    if (access_token)
      dispatch(googleLoginServer(access_token)).then((res) => {
        if ("error" in res) warningMessage("Access token not valid!.");
      });
    else {
      warningMessage("Login failed!.");
    }
  };

  useEffect(() => {
    if (user.name !== "Guest") {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 3,
      }}
    >
      <NavLink to="/">
        {" "}
        <Box className="logo_img" sx={{ width: 220, height: 50 }}></Box>
      </NavLink>
      <Paper sx={{ marginTop: 5, maxWidth: 500 }} component="form">
        <Typography variant="h5" sx={{ marginTop: 3, marginLeft: 5 }}>
          {" "}
          Sign In
        </Typography>
        <Divider sx={{ margin: 1 }} />
        <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft: 5 }}>
          {" "}
          Enter your email address
        </Typography>
        <TextField
          sx={{ marginLeft: 5, marginTop: 1, minWidth: 300 }}
          required
          type="email"
          placeholder="useremail@example.com"
          autoComplete={"on"}
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Typography variant="subtitle2" sx={{ marginTop: 2, marginLeft: 5 }}>
          {" "}
          Enter your password
        </Typography>
        <TextField
          sx={{ marginLeft: 5, marginTop: 1, minWidth: 300 }}
          required
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            marginTop: 7,
            marginBottom: 2,
          }}
        >
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={(e) => {
              signinHandler();
            }}
          >
            Continue
          </LoadingButton>
          <Typography
            variant="caption"
            margin={2}
            color="#FF5F1F"
            whiteSpace={"normal"}
            textAlign={"center"}
          >
            {" "}
            By continuing, I agree to Amr’s Privacy Policy and Terms of Use.
          </Typography>
        </Box>

        <Box sx={{ marginLeft: 4, marginRight: 4, marginBottom: 4 }}>
          <Divider>
            {" "}
            <Typography variant="caption">New to Amr's store</Typography>{" "}
          </Divider>
          <FlexBox>
            <Button
              disabled={loading}
              variant="contained"
              sx={{ marginTop: 1, width: 300 }}
              onClick={() => navigate("/signup")}
            >
              Create your new account
            </Button>
          </FlexBox>
          <FlexBox sx={{marginTop: 2}}>
            <GoogleLogin
              theme="filled_blue"
              text="signin_with"
              shape="circle"
              onSuccess={(credentialResponse) =>
                onSuccessDo(credentialResponse)
              }
              onError={() => warningMessage("Failed to login")}
            />
          </FlexBox>
        </Box>
      </Paper>
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

const Login = () => {
  return <UserForm />;
};

export default Login;
