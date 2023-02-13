import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/auth-context";
import { authService } from "../services/auth-service";

export const NavBar = () => {
  const { isAuth, setIsAuth, setFullName, fullName } = useContext(AuthContext);
  const navigator = useNavigate();
  const resetAuthContext = () => {
    authService
      .logout()
      .then(() => {
        setIsAuth!(false);
        setFullName!("");
        console.log(isAuth);
        navigator("/login");
      })
      .catch();
  };

  return (
    <nav className="navbar navbar-light bg-light" key="nav">
      <div className="container-fluid">
        <h3 className="card-title">Library</h3>

        {isAuth && (
          <div>
            <a className="navbar-brand me-2">{`Wellcome back, ${fullName}!`}</a>
            <button
              className="btn btn-danger"
              onClick={resetAuthContext}
              type="submit"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
