import Login from "../Pages/Login/Login";
import { MainPage } from "../Pages/MainPage/MainPage";

export const PrivateRoutes = [
  { path: "/main", component: <MainPage /> },
  { path: "*", component: <MainPage /> },
];
export const PublicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "*", component: <Login /> },
];
