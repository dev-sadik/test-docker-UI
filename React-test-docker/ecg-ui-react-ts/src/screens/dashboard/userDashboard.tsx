import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../components/header/header";
import TitleComponent from "../../components/title/title";
import SubtitleComponent from "../../components/title/subTitle";
import { Role, User } from "../../interface/interface";
import { RouteComponentProps } from "react-router-dom";

const UserDashboard: React.FC<RouteComponentProps> = (props) => {
  
  const [data, setData] = useState({} as User );
  const [role, setRole] = useState({} as Role);

  const disableBackButton = () => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener("popstate", () => {
      props.history.go(1);
    });
  };

  const getData = () => {
    const userData = JSON.parse(localStorage.getItem("user_data") || '{}');
    setData(userData);
    setRole(userData.roles[0]);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    disableBackButton();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header page="Home" />
      <TitleComponent title="Welcome USER" />
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <SubtitleComponent title="User Details" />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>User ID</b>
              </td>
              <td>{data.userId}</td>
            </tr>
            <tr>
              <td>
                <b>Name</b>
              </td>
              <td>{data.userName}</td>
            </tr>
            <tr>
              <td>
                <b>Email</b>
              </td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>
                <b>Role</b>
              </td>
              <td>{role.roleName}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserDashboard;
