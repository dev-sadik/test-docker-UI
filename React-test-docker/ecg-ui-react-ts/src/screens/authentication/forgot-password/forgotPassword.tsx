import React, { useState, useEffect } from "react";
import ButtonComponent from "../../../components/button/buttonComponent";
import ErrorLabel from "../../../components/errorLabel/errorLabelComponent";
import TextFieldComponent from "../../../components/textField/textFieldComponent";
import { Strings } from "../../../utils/strings";
import { useParams } from "react-router-dom";
import "./style.css";
import Box from "@material-ui/core/Box";
import {
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import { forgotPasswordService } from "./forgotPasswordService";
import { Email } from "@material-ui/icons";

const ForgotPassword: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState<boolean>(false);
  const[sendMessage,setSendMessage] = useState<string | null>(null);
  const { token, authToken }: { token: string,authToken: string } = useParams();
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setPassword({ ...password, [e.target.name]: e.target.value });
    }
  };
  const validateToken = (token: string,authToken: string) => {
    forgotPasswordService.validateToken({
      token,
      history,
      setError,
      setPassword,
      setFlag,
      password,
      authToken,
    });
  };
  const emailSendFunction = () => {
    if (!email || email === "") {
      setError("Please enter your email id");
      return;
    } else if (!Strings.regEx.email.test(email)) {
      setError(Strings.error.enterEmail);
      return;
    }
    let body = {
      email: email,
      url: "http://localhost:3000/forgot-password",
    };
    setError("");
    forgotPasswordService.sendEmail(body,setError, setSendMessage);
  };
  const updatePasswordFunction = () => {
    if (
      !password.newPassword ||
      !password.confirmPassword ||
      password.newPassword === "" ||
      password.confirmPassword === ""
    ) {
      setError("please enter the password");
      return;
    }
    if (password.newPassword !== password.confirmPassword) {
      setError(
        "Password not matched ! please make sure both the filed have same password"
      );
      return;
    }
    let body = {
      token: password.token,
      newPassword: password.newPassword,
    };
    forgotPasswordService.updatePassword(body, history, setError,authToken);
  };

  useEffect(() => {
    if (token) {
      setFlag(true);
      validateToken(token,authToken);
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Paper elevation={12}>
          {sendMessage !==null ? (
            <>
            <Typography  align="center" color="primary">
              {sendMessage}
          </Typography>
          </>
          ):(
          <>
          {!flag && !token  ? (
            <form className="forgotPasswordContainer" autoComplete="off">
              <Typography color="primary" align="center" variant="h5">
                Forgot your password?
              </Typography>
              <Typography align="center">
                Enter registered email below to recevice reset password link.
              </Typography>
              <TextField
                fullWidth
                type="email"
                id="email"
                label="Email"
                placeholder="Email"
                name="email"
                value={email}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
                onChange={onChangeEvent}
              />
              {error !== "" && <ErrorLabel error={error} />}
              <ButtonComponent
                id="forgotPassword"
                name="forgotPassword"
                variant="contained"
                color="primary"
                value="Send"
                onClickFunction={emailSendFunction}
              />
            </form>
          ) : (
            <>
              {error !=="" && !flag ? (
                <ErrorLabel error={error} />
              ) : (
                <form className="forgotPasswordContainer" autoComplete="off">
                  <Typography color="primary" align="center" variant="h5">
                    Reset Password
                  </Typography>
                  <Typography align="center">
                    Enter your new password below.
                  </Typography>
                  <TextFieldComponent
                    type="password"
                    id="newPassword"
                    label="New Password"
                    placeholder="Enter New Password"
                    name="newPassword"
                    value={password.newPassword}
                    onChangeFunction={onChangeEvent}
                  />
                  <TextFieldComponent
                    type="password"
                    id="confirmPassword"
                    label="Confirm Password"
                    placeholder="Re-Enter Password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChangeFunction={onChangeEvent}
                  />

                  {error !== "" && <ErrorLabel error={error} />}
                  <ButtonComponent
                    id="submit"
                    name="submit"
                    variant="contained"
                    color="primary"
                    value="Change Password"
                    onClickFunction={updatePasswordFunction}
                  />
                </form>
              )}
            </>
          )}
          </>  

          ) }
          
        </Paper>
      </Box>
    </>
  );
};
export default ForgotPassword;
