import React, { useState, useEffect } from "react";
import Header from "../../components/header/header";
import Form from "../../components/form/form";
import { userService } from "../../services/userService";
import { User } from "../../interface/interface";

const Profile: React.FC = (props) => {
  const [data, setData] = useState({} as User);

  const getData = () => {
    const userData = JSON.parse(localStorage.getItem("user_data") || "{}");
    setData(userData);
    userService
      .getUserData(userData.userId)
      .then((response) => {
        if (response && response.status === 200) {
          setData(response.data.object);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header page="Profile" />
      <Form data={data} />
    </>
  );
};
export default Profile;
