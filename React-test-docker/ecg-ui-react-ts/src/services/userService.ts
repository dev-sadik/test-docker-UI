import axios from "axios";
import { Strings } from "../utils/strings";
import { localStorageService } from "./localStorage";
import { PostData, SignupProps, Update } from "../interface/interface";
export const userService = {
  loginService,
  isLogin,
  signupService,
  getUserData,
  getAllUsers,
  updateService,
  deleteService,
  forgotPassword,
  validatePasswordResetToken,
  updatePassword,
};
let applicationConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
let applicationAuthConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(
      localStorage.getItem("access_token") || "{}"
    )}`,
  },
};

function loginService(postData: PostData) {
  return axios
    .post(Strings.baseUrl + Strings.api.login, postData, applicationConfig)
    .then((response) => {
      if (response && response.status && response.status === 200) {
        let { object } = response.data;

        localStorageService.setAccessToken(object.authData.access_token);
        localStorageService.setRefreshToken(object.authData.refresh_token);
        localStorageService.setUserData(object.user);
      }
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });
}
function forgotPassword(postData: { email: string , url : string}) {
  return axios
    .post(
      Strings.baseUrl + Strings.api.forgotPassword,
      postData,
      applicationConfig
    )
    .then((response) => {
      
      return response
      
    })
    .catch((error) => {
      
      return error.response.data;
    });
}
function validatePasswordResetToken(token:string,authToken: string){
  applicationAuthConfig.headers.Authorization = `Bearer ${authToken}`;
  return axios
  .get(Strings.baseUrl + Strings.api.forgotPasswordTokenValidate + token,applicationAuthConfig)
  .then((response)=>{
   console.log(response);
    return response
  })
  .catch((error) => {
    return error.response.data;
  });
}

function signupService(postData: SignupProps) {
  return axios
    .post(Strings.baseUrl + Strings.api.signup, postData, applicationConfig)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
      return error.response.data;
    });
}

function getUserData(id: number) {
  setTimeout(() => {});
  return axios
    .get(Strings.baseUrl + Strings.api.getUserData + id, applicationAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data;
    });
}

function getAllUsers() {
  applicationAuthConfig.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("access_token") || "{}"
  )}`;
  return axios
    .get(Strings.baseUrl + Strings.api.getAllUsers, applicationAuthConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
}

function updateService(postData: Update) {
  return axios
    .put(
      Strings.baseUrl + Strings.api.updateUser,
      postData,
      applicationAuthConfig
    )
    .then((response) => {
      console.log(response)
      return response;
    })
    .catch((error) => {
      console.log(error.response)
      return error.response.data;
    });
}
function updatePassword(postData:{token:string,newPassword: string},authToken:string){
  applicationAuthConfig.headers.Authorization = `Bearer ${authToken}`;
  return axios
  .post(Strings.baseUrl +  Strings.api.updatePassword, postData,applicationAuthConfig)
  .then((response) => {
      
    return response
    
  })
  .catch((error) => {
    
    return error.response.data;
  });
}

function deleteService(id: number) {
  return axios
    .get(
      Strings.baseUrl + Strings.api.deleteUser + `/${id}`,
      applicationAuthConfig
    )
    .then((response) => {
      console.log(response.data);
      return response;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error.response.data;
    });
}

function isLogin() {
  if (localStorage.getItem("access_token")) {
    return true;
  }
  return false;
}
