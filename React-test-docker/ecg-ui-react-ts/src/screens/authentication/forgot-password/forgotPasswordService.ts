import { RouteComponentProps } from "react-router-dom";
import { userService } from "../../../services/userService";
import { alertUtils } from "../../../utils/alertUtils";
import { Strings } from "../../../utils/strings";

interface Props {
  token: string;
  authToken: string;
  history: any;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<
    React.SetStateAction<{
      newPassword: string;
      confirmPassword: string;
      token: string;
     
    }>
  >;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
  password: {
    newPassword: string;
    confirmPassword: string;
    token: string;
  };
}

const validateToken = ({
  token,
  history,
  setError,
  setPassword,
  setFlag,
  password,
  authToken,
}: Props) => {
  userService
    .validatePasswordResetToken(token,authToken)
    .then((response) => {
      if (response && response.status === 200) {
        console.log(response.data.object);
        setPassword({ ...password, token: response.data.object });
        return;
      } else {
        console.log(response);
        setFlag(false);
        setError("Link is  expired !");
        alertUtils
          .successAlert(
            Strings.alertBox.linkExpiredTitle,
            "Link is  expired ! please try again ",
            "warning",
            false
          )
          .then((alertResponse) => {})
          .catch(() => {});
        history.push("/");
      }
    })
    .catch((error: Error) => {
      setFlag(false);
      setError("Please try again");
    });
};

const sendEmail = (
  body: { email: string; url: string },
  setError: Props["setError"],
  setSendMessage: React.Dispatch<React.SetStateAction<string | null>>
) => {
  userService
    .forgotPassword(body)
    .then((response) => {
      if (response && response.status === 200) {
        setSendMessage(response.data.message);
        return;
      } else {
        if (response.status === 400) {
          setError(response.message);
          return;
        }
        if (response.status === 500) {
          setError(response.message);
          return;
        }
        setError("There is error, please try again");
      }
    })
    .catch((error: Error) => {});
};
const updatePassword = (
  body: { token: string; newPassword: string },
  history: Props["history"],
  setError: Props["setError"],
  authToken: Props["authToken"]
) => {
  userService
    .updatePassword(body,authToken)
    .then((response) => {
      if (response && response.status === 200) {
        alertUtils
          .successAlert(
            Strings.succesBox.forgotPassword,
            Strings.succesBox.forgotPasswordMessage,
            "success",
            false
          )
          .then((alertResponse) => {})
          .catch(() => {});
        history.push("/");
      } else {
        setError("please try after some time");
      }
    })
    .catch((error: Error) => {});
};

export const forgotPasswordService = {
  validateToken,
  sendEmail,
  updatePassword,
};
