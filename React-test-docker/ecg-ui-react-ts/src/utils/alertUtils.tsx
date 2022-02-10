
import swal from "sweetalert";


export const alertUtils = {
  confirmationAlert,
  successAlert
};

// interface Props {
//     title : string | undefined,
//     message: string | undefined,
//     icon: "warning" | "success"
//     cancelButtonText: string| boolean,
//     confirmButtonText: string | boolean,
//     dangerMode: boolean
// }

function confirmationAlert(
    title:string, 
    message: string, 
    icon:"warning"|"success", 
    confirmButtonText: string|boolean, 
    cancelButtonText: string|boolean, 
    dangerMode:boolean) {
  return new Promise((resolve, reject) => {
    swal({
      title: title,
      text: message,
      icon: icon,
      buttons: [cancelButtonText, confirmButtonText],
      dangerMode: dangerMode,
    })
      .then((confirm) => {
        if (confirm) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => {});
  });
}

function successAlert(
    title: string, 
    message: string, 
    icon:"warning"|"success", 
    dangerMode: boolean) {
  return new Promise((resolve, reject) => {
    swal({
      title: title,
      text: message,
      icon: icon,
      buttons: [true],
      dangerMode: dangerMode,
    })
      .then((confirm) => {
        if (confirm) {
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(() => {});
  });
}
