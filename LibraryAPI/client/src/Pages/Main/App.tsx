import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import AuthContext from "../../contexts/auth-context";
import { AppRouter } from "../../components/AppRouter";
import { authService } from "../../services/auth-service";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const autContextValue = useMemo(
    () => ({
      isAuth,
      fullName,
      setIsAuth,
      setFullName,
    }),
    [isAuth, fullName]
  );

  useEffect(() => {
    authService
      .getUserInfo()
      .then((response) => {
        setIsAuth(true);
        setFullName(response.data);
      })
      .catch(() => {});
  });

  return (
    <AuthContext.Provider value={autContextValue!}>
      {/* <div className="login">
        
      </div> */}
      <AppRouter />
    </AuthContext.Provider>
  );
}

export default App;
