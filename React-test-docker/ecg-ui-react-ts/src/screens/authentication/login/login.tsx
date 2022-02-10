import React,{useState} from 'react';
import TextFieldComponent from "../../../components/textField/textFieldComponent";
import ButtonComponent from "../../../components/button/buttonComponent";
import ErrorLabel from "../../../components/errorLabel/errorLabelComponent";
import { userService } from '../../../services/userService';
import "./style.css"
import { RouteComponentProps } from 'react-router-dom';
import { Strings } from '../../../utils/strings';
import { Link } from '@material-ui/core';



 const Login : React.FC<RouteComponentProps> = ({history}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState("");
          
    const onChangeEvent = (e:React.ChangeEvent<HTMLInputElement>)=> {
       setError('');
        if (e.target.name === "username") {
          setUsername(e.target.value);
        }
        if (e.target.name === "password") {
          setPassword(e.target.value);
        }
      };

      const loginFunction = () => {
        
        if(!username || username === ""){
          setError(Strings.error.enterUserName);
          return;
        }
        if(!password || password === ""){
          setError("please Enter the Password");
          return;
        }
        let body = {
          "username": username,
          "password": password
        }
        setError(''); 
        
        userService.loginService(body).then((response) => {
          if(response && response.status === 200){
            if(response.data.object.user.roles[0].roleName === 'ADMIN'){
              history.push("/admin-dashboard");
              
            } else {
              history.push("/");
              
            }
          } else {
            if(response.status === 401){
              setError(response.message);
              return
            }
            if(response.status === 500){
              setError(response.message);
              return
            }
            setError('There is error, please try again')
          }
        }).catch((error: Error)=>{
        })

    };
    const goToSignUp = () => {
      history.push("/signup");
    };

    return (
    <>
    <form className="loginContainer" noValidate autoComplete="off">
      <TextFieldComponent
        type="text"
        placeholder="Username"
        id="username"
        label="Username"
        name="username"
        value={username}
        onChangeFunction={onChangeEvent}
      />
      <TextFieldComponent
        type="password"
        placeholder="Password"
        id="password"
        label="Password"
        name="password"
        value={password}
        onChangeFunction={onChangeEvent}
      />
      {error !== "" &&
        <ErrorLabel error={error}/>
      }
       <div className="InlineButton">
        <ButtonComponent
          id="login"
          name="login"
          variant ="contained"
          color="primary"
          value="Login"
          onClickFunction={loginFunction}
        />
       <ButtonComponent
          id="signup"
          name="signup"
          variant="contained"
          color="primary"
          value="Signup"
          onClickFunction={goToSignUp}
        />
      </div>
      <div>
        <Link
         component = "button"
         variant = "body2"
         onClick = {() => {
          history.push("/forgot-password");
         }}
         >
           Forgot Password
         </Link>
      </div> 
    </form>
    </>)
};
export default Login;
