import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import { PrivateRoutes, PublicRoutes } from "../routes";

export const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return isAuth ? (
    <Routes>
      {PrivateRoutes.map(({ path, component }) => (
        <Route path={path} element={component} key={component.key} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {PublicRoutes.map(({ path, component }) => (
        <Route path={path} element={component} key={component.key} />
      ))}
    </Routes>
  );
};
