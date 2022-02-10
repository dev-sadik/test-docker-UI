import * as React from "react";
import { useState, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import ButtonComponent from "../button/buttonComponent";
import Avatar from "@material-ui/core/Avatar";
import "./style.css";
import { userService } from "../../services/userService";
import { alertUtils } from "../../utils/alertUtils";
import { Strings } from "../../utils/strings";
import { User } from "../../interface/interface";



interface Props  {
  data: User
}
type FormData = {
  name: string,
  email: string,
};

const Form: React.FC<Props> = (props) => {
  const { handleSubmit, control, reset,formState:{errors} } = useForm<FormData>({
    defaultValues: {
      name: props.data.userName,
      email: props.data.email,
    },
  });
  const [readonly, setReadonly] = useState(true);
  const [style, setVariant] = useState<
    "standard" | "outlined" | "filled" | undefined
  >("standard");
  

  const updateFunction: SubmitHandler<FormData> = (data) => {
    console.log(data)
  
    if (!readonly) {
      alertUtils
        .confirmationAlert(
          Strings.alertBox.updateProfileTitle,
          Strings.alertBox.updateProfileMessage,
          "warning",
          "Yes",
          "No",
          false
        )
        .then((alertResponse) => {
          if (alertResponse) {
            updateProfile(data);
          }
        })
        .catch(() => {
          setReadonly(false);
        });
    } else {
      
      setVariant("outlined");
      setReadonly(false);
    }
  };

  const updateProfile = (data: FormData) => {
    let body = {
      userId: props.data.userId,
      userName: data.name,
      email: data.email,
      roleId: props.data.roleId,
    };
    console.log(body);
    userService
      .updateService(body)
      .then((response) => {
        if (response) {
          setReadonly(true);
          alertUtils
            .successAlert(
              Strings.alertBox.updateProfileTitle,
              Strings.succesBox.userInfoUpdateTitle,
              "success",
              false
            )
            .then((alertResponse) => {})
            .catch(() => {});
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    reset({
      name: props.data.userName,
      email: props.data.email,
    });
  }, [props.data.userName, props.data.email]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="card">
      <div>
        <Avatar src="/broken-image.jpg" className="large" />
      </div>
      <form onSubmit={handleSubmit(updateFunction)}>
        <div className="profile">
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Name"
                name="name"
                variant={style}
                value={value}
                InputProps={{
                  readOnly: readonly,
                }}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{ required: "Name required" }}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                label="Email Id"
                name="email"
                variant={style}
                value={value}
                type="email"
                InputProps={{
                  readOnly: readonly,
                }}
                onChange={onChange}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
            rules={{
              required: "Email ID required",
              pattern: {
                value: Strings.regEx.email,
                message: Strings.error.invalidEmail,
              },
            }}
          />
          {readonly ? (
            <ButtonComponent
              id="edit"
              name="edit"
              variant="contained"
              color="primary"
              value="Edit"
              type="submit"
            />
          ) : (
            <ButtonComponent
              id="update"
              name="update"
              variant="contained"
              color="primary"
              value="Update"
              type="submit"
            />
          )}
        </div>
      </form>
    </div>
  );
};
export default Form;
