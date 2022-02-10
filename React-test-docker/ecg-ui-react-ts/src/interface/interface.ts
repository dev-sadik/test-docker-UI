export type Role = {
  roleId: number;
  roleName: "ADMIN" | "USER";
};
export type PostData = {
  username: string;
  password: string;
};
export type Update = {
  userId: number;
  userName: string;
  email: string;
  roleId : number,
};

export interface User {
  userId: number;
  userName: string;
  email: string;
  roles?: Role;
  roleId: number;
}
export interface SignupProps {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface Users {
  active: number,
  confirmPassword: null,
  email: string,
  passsword: string,
  roleId: number,
  roleName: string,
  userId: number,
  userName: string,
}