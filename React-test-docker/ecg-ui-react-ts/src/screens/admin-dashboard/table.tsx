import React, { useState,useEffect, ReactElement } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { userService } from "../../services/userService";
import EditIcon from "@material-ui/icons/Edit";
import CheckIcon from "@material-ui/icons/Check";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextFieldComponent from "../../components/textField/textFieldComponent";
import CancelIcon from '@material-ui/icons/Cancel';
import { alertUtils } from "../../utils/alertUtils";
import { Strings } from "../../utils/strings";
import { Users } from "../../interface/interface";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
interface Props {
  userData : Users[],
  getDataFunction: () => void
}

const TableComoponent:React.FC<Props> = (props):ReactElement => {
  const [editIdx, setEditIdx] = useState(-1);
  const [role,setRole] = useState<string|unknown>("")
  const [username, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");
  const userD = props.userData.map((user:Users) => {
    let obj = {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      roleName: user.roleName,
    };
    return user;
  });
 
  const [users, setUserData] = useState(userD);

  const startEditing = (i:number) => {
    setEditIdx(i);
    // setIndex(i);
    setUserName(users[i].userName);
    setUserEmail(users[i].email);
    setRole(users[i].roleName);
  };

  const stopEditing = (i:number) => {
    alertUtils
    .confirmationAlert(
      Strings.alertBox.userInfoUpdateTitle,
      Strings.alertBox.userInfoUpdateMessage,
      "warning",
      "Yes",
      "No",
      false
    )
    .then((alertResponse) => {
      if(alertResponse){
       updateFunction(users[i].userId)
    }
    })
    .catch(() => {
      noChanges()  
    }) 
  };
  const updateFunction = (id:number) => {
    console.log('update')

    let body = {
      "userId": id,
      "userName": username,
      "email" : useremail,
      "roleId": role==='ADMIN'? 1 : 2
    }
    userService
      .updateService(body)
      .then((response) => {
        if (response) {
          setEditIdx(-1);
          props.getDataFunction(); 
          alertUtils
            .successAlert(
              Strings.alertBox.userInfoUpdateTitle,
              Strings.succesBox.userInfoUpdateTitle,
              "success",
              false

            )
            .then((alertResponse) => {
            })
            .catch(() => {});
        }
      })
      .catch((error:Error) => {});
  }
  const handleChange = (event: React.ChangeEvent<{
    name?: string | undefined;
    value: unknown;
}>) => {
    setRole(event.target.value);
  };
  const noChanges = () => {
    setEditIdx(-1);
  }

  const onNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setUserName(name);
  };
  const onEmailChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
      
      const email = e.target.value;
      setUserEmail(email)  
  };
  const deleteFunction = (i:number) => {
    const id = users[i].userId;
    alertUtils
    .confirmationAlert(
      'Delete !',
      `Do you want to delete ${users[i].userName} user ?` ,
      "warning",
      "Yes",
      "No",
      true
    )
    .then((alertResponse) => {
      if(alertResponse){
         
       deleteUser(id)
    }
    })
    .catch(() => {
      noChanges()  
    })
    
  }

  const deleteUser = (id:number) => {
    
    userService
      .deleteService(id)
      .then((response) => {
        
        if (response) {
          setEditIdx(-1);
          // setUserData(users.filter(user => user.userId !== id))
          props.getDataFunction();
          alertUtils
            .successAlert(
              "Deleted",
              `User ${users[id-1].userName} deleted`,
              "success",
              false
            )
            .then((alertResponse) => {})
            .catch(() => {});
        }
      })
      .catch((error: Error) => {});

  }
  useEffect(()=>{
      setUserData(userD)
  },[props.userData])


  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User ID</StyledTableCell>
            <StyledTableCell align="center">User Name</StyledTableCell>
            <StyledTableCell align="center">Email ID</StyledTableCell>
            <StyledTableCell align="center">Role</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.length > 0 &&
            users.map((user, index: number) => (
              <TableRow key={user.userId}>
                <TableCell component="th" scope="row">
                  {user.userId}
                </TableCell>
                {editIdx === index ? (
                  <>
                    <TableCell>
                      <TextFieldComponent
                        id = "userName"
                        type="text"
                        name="userName"
                        value={username}
                        onChangeFunction={onNameChange}
                      />
                    </TableCell>
                    <TableCell>
                      <TextFieldComponent
                        id="email"
                        type="email"
                        name="email"
                        value={useremail}
                        onChangeFunction={onEmailChange}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        name="roleName"
                        id="select"
                        value={role}
                        onChange={handleChange}
                      >
                        <MenuItem value="ADMIN">ADMIN </MenuItem>
                        <MenuItem value="USER"> USER </MenuItem>
                      </Select>
                    </TableCell>
                  </>
                ) : (
                  <>
                    <TableCell align="center">{user.userName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.roleName}</TableCell>
                  </>
                )}

                <TableCell align="center" >
                  
                  {editIdx === index ? (
                    <>
                    <IconButton
                      edge="start"
                      color="primary"
                      aria-label="menu"
                      onClick={() => stopEditing(index)}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton
                    edge="start"
                    color="secondary"
                    aria-label="menu"
                    onClick={() => noChanges()}
                  >
                    <CancelIcon />
                  </IconButton>
                  </>
                  ) : <>
                    <IconButton
                      edge="start"
                      color="primary"
                      aria-label="menu"
                      onClick={() => startEditing(index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="start" color="primary" aria-label="menu"
                     onClick={() => deleteFunction(index)}
                    >
                    <DeleteIcon />
                  </IconButton>
                  </>}
                  
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComoponent;
