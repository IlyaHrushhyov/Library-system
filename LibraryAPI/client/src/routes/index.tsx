import { EditPage } from "../Pages/EditPage/EditPage";
import Login from "../Pages/Login/Login";
import { BodyMainPage } from "../Pages/MainPage/BodyMainPage";

export const PrivateRoutes = [
  { path: "/main", component: <BodyMainPage /> },
  { path: "/edit/:id", component: <EditPage /> },
  { path: "*", component: <BodyMainPage /> },
];
export const PublicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "*", component: <Login /> },
];
