import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header/header";
import TableComponent from "./table";
import LoaderComponent from "../../components/loader/loader";
import TitleComponent from "../../components/title/title";
import { userService } from "../../services/userService";
import { RouteComponentProps } from "react-router-dom";
import { Users } from "../../interface/interface";

const AdminDashboard:React.FC<RouteComponentProps> = ({history}) => {
  const [data, setData] = useState([] as Users[]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    
    userService.getAllUsers().then((res) => {
      
      setData(res.data.object);
      setLoading(false);
    })
    .catch((error: Error) => {
      setLoading(false);
    });
  };

  const disableBackButton = () => {
    
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", () => {
      history.go(1);
    });
  };

  useEffect(() => {
    disableBackButton();
    
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (localStorage.getItem("user_data") === null) {
      history.push("/login");
    }
    getData();
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header page="HOME" />
      <TitleComponent title="Welcome ADMIN" />
      {loading ? <LoaderComponent /> : <TableComponent userData={data} getDataFunction={getData} />}
    </>
  );
};

export default AdminDashboard;
