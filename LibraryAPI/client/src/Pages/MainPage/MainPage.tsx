import { useContext } from "react";
import AuthContext from "../../contexts/auth-context";
import "../MainPage/MainPage.scss";

export const MainPage = () => {
  const { isAuth, fullName } = useContext(AuthContext);
  return (
    <div key="mainPage">
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="card-title">Library</h3>
          <form className="d-flex">
            {isAuth && (
              <div>
                <a className="navbar-brand me-2">{`Wellcome back, ${fullName}!`}</a>
                <button className="btn btn-outline-danger" type="submit">
                  Logout
                </button>
              </div>
            )}
          </form>
        </div>
      </nav>

      <div className="container listContainer">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Welcome to Library</h3>
                <p className="card-text">
                  <strong>Welcome to Library</strong>
                </p>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Welcome to Library</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container listContainer">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Welcome to Library</h3>
                <p className="card-text">
                  <strong>Welcome to Library</strong>
                </p>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Welcome to Library</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
