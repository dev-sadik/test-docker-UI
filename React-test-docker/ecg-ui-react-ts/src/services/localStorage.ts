import { User } from "../interface/interface";

export const localStorageService = {
    setAccessToken,
    setRefreshToken,
    setUserData,
    logout
  };
  function setAccessToken(token:string) {
    localStorage.setItem("access_token", JSON.stringify(token));
  }
  
  function setRefreshToken(token:string) {
    localStorage.setItem("refresh_token", token);
  }
  
  function setUserData(data:User) {
    localStorage.setItem("user_data", JSON.stringify(data));
  }
  
  function logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_data');
  }
  