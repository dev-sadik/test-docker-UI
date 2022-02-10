import React, { useState } from "react";
import "./style.css";
import TextFieldComponent from "../../../components/textField/textFieldComponent";
import ButtonComponent from "../../../components/button/buttonComponent";
import { userService } from "../../../services/userService";
import ErrorLabel from "../../../components/errorLabel/errorLabelComponent";
import { Strings } from "../../../utils/strings";
import { alertUtils } from "../../../utils/alertUtils";
import { RouteComponentProps } from "react-router-dom";

const SignupComponent: React.FC<RouteComponentProps> = ({history}) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  
  const [error, setError] = useState("");
  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('');
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  
  const signupFunction = () => {
    if(!user.firstName || user.firstName === ""){
      setError(Strings.error.enterFirstName);
      return
    }
    if(!user.lastName || user.lastName === ""){
      setError(Strings.error.enterLastName);
      return
    }
    if(!Strings.regEx.email.test(user.email)){
      setError(Strings.error.enterEmail);
      return
    }
    if(!user.password || user.password === ""){
      setError(Strings.error.enterPassword);
      return
    }
    setError('');
    let body = {
      "userName": user.firstName +" "+ user.lastName,
      "email": user.email,
      "password": user.password,
      "confirmPassword": user.password,
    }
    userService.signupService(body).then((response) => {
      if(response && response.status === 200){
        history.push("/");
        alertUtils
        .successAlert(
          Strings.succesBox.signupTitle,
          Strings.succesBox.signupSucessMessage,
          "success",
          false
        )
        .then((alertResponse)=>{
          history.push("/");
        })
        .catch(()=>{});
      } else {
        if(response.status === 401){
          setError(response.message);
          return
        }
        if(response.status === 500){
          setError(response.message);
          return
        }
        setError(response['message'])
      }
    }).catch((error: Error)=>{
    })
    
  };

  return (
    <form
      className="signupContainer"
      noValidate
      autoComplete="off"
    >
      
      <TextFieldComponent
        type="text"
        placeholder="First Name"
        id="FirstName"
        label="First Name"
        name="firstName"
        value={user.firstName}
        required={true}
        onChangeFunction={onChangeEvent}
      />
      <TextFieldComponent
        type="text"
        placeholder="Last Name"
        id="Last Name"
        label="Last Name"
        name="lastName"
        value={user.lastName}
        required={true}
        onChangeFunction={onChangeEvent}
      />
      <TextFieldComponent
        type="email"
        placeholder="abc@gmail.com"
        id="email"
        label="Email"
        name="email"
       
        value={user.email}
        required={true}
        onChangeFunction={onChangeEvent}
      />
      <TextFieldComponent
        type="password"
        placeholder="Password"
        id="password"
        label="Password"
        name="password"
        value={user.password}
        required={true}
        onChangeFunction={onChangeEvent}
      />
      {error !== "" &&
        <ErrorLabel error={error}/>
      }
      <ButtonComponent
        id="signup"
        name="signup"
        variant="contained"
        color="primary"
        value="Signup"
        onClickFunction = {signupFunction}
      />
    </form>
  );
};
export default SignupComponent;
