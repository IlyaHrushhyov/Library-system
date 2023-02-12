import React from "react";
interface IAuthContext {
  isAuth: boolean;
  setIsAuth?: React.Dispatch<React.SetStateAction<boolean>>;
  fullName: string;
  setFullName?: React.Dispatch<React.SetStateAction<string>>;
}

const defaultState = {
  isAuth: false,
  fullName: "",
};

const AuthContext = React.createContext<IAuthContext>(defaultState);

export default AuthContext;
