import React, { useContext, useState } from "react";
import { TextInput } from "../../components/TextInput";
import AuthContext from "../../contexts/auth-context";
import AuthRequest from "../../requests/AuthRequest";
import RegisterRequest from "../../requests/RegisterRequest";
import { authService } from "../../services/auth-service";
import "../Login/Login.scss";
import "../../Pages/Main/App.scss";
import { useNavigate } from "react-router-dom";

type ValidationError = string | undefined;

interface credsErrorState {
  fullNameError: ValidationError;
  loginError: ValidationError;
  passwordError: ValidationError;
}

interface AuthErrorState {
  errorMessage: ValidationError;
}

const initialAuthErrorState: AuthErrorState = {
  errorMessage: "",
};

const initialCredsErrorState: credsErrorState = {
  fullNameError: "",
  loginError: "",
  passwordError: "",
};

const initialCredsState: RegisterRequest = {
  fullName: "",
  login: "",
  password: "",
};

const Login = () => {
  const navigator = useNavigate();
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [creds, setCreds] = useState<RegisterRequest>(initialCredsState);
  const [credsErrorState, setCredsErrorState] = useState<credsErrorState>(
    initialCredsErrorState
  );
  const [authErrorState, setAuthErrorState] = useState<AuthErrorState>(
    initialAuthErrorState
  );

  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);

  const isLoginValid = (login: string) => {
    if (login.length >= 6) {
      console.log("login is valid");
    } else {
      console.log("login is not valid");
    }
    return login.length >= 6;
  };

  const handleLoginChange = (login: string) => {
    setCreds({ ...creds, login: login });
    if (isLoginValid(login)) {
      setCredsErrorState({ ...credsErrorState, loginError: undefined });
    } else {
      setCredsErrorState({
        ...credsErrorState,
        loginError: "Login is not valid",
      });
    }
  };

  const isPasswordValid = (password: string) => {
    if (password.length >= 6) {
      console.log("password is valid");
    } else {
      console.log("password is not valid");
    }
    return password.length >= 6;
  };

  const handlePasswordChange = (password: string) => {
    setCreds({ ...creds, password: password });
    if (isPasswordValid(password)) {
      setCredsErrorState({ ...credsErrorState, passwordError: undefined });
    } else {
      setCredsErrorState({
        ...credsErrorState,
        passwordError: "Password is not valid",
      });
    }
  };

  const isFullNameValid = (fullName: string) => {
    if (fullName.length >= 1) {
      console.log("fullName is valid");
    } else {
      console.log("fullName is not valid");
    }
    return fullName.length >= 1;
  };

  const handleFullNameChange = (fullName: string) => {
    setCreds({ ...creds, fullName: fullName });
    if (isFullNameValid(fullName)) {
      setCredsErrorState({ ...credsErrorState, fullNameError: undefined });
    } else {
      setCredsErrorState({
        ...credsErrorState,
        fullNameError: "FullName is not valid",
      });
    }
  };

  const handleLogIn = () => {
    console.log("123");
    let authRequest: AuthRequest = {
      login: creds.login,
      password: creds.password,
    };
    authService
      .authenticate(authRequest)
      .then((response) => {
        //setIsAuth!(true);
        navigator("/mainPage");
      })
      .catch((error) => {
        console.log("error", error.response.data.Message);
        setAuthErrorState({ errorMessage: error.response.data.Message });
      });
  };

  const handleRegister = () => {
    authService
      .register(creds)
      .then(() => {
        resetForm();
        setIsLoginPage(true);
      })
      .catch((error) => {
        console.log("error");
        setAuthErrorState({ errorMessage: error.response.data.Message });
      });
  };

  const isFormInvalid = () => {
    if (isLoginPage) {
      return (
        typeof credsErrorState.loginError !== "undefined" ||
        typeof credsErrorState.passwordError !== "undefined"
      );
    } else {
      return (
        typeof credsErrorState.loginError !== "undefined" ||
        typeof credsErrorState.passwordError !== "undefined" ||
        typeof credsErrorState.fullNameError !== "undefined"
      );
    }
  };

  const resetForm = () => {
    setCreds(initialCredsState);
    setCredsErrorState(initialCredsErrorState);
    setAuthErrorState(initialAuthErrorState);
  };

  return (
    <div className="login" key="login">
      <div className="center">
        {isLoginPage ? (
          <div style={{ textAlign: "center" }}>Login</div>
        ) : (
          <div style={{ textAlign: "center" }}>Register</div>
        )}

        {authErrorState.errorMessage && (
          <div className="alert alert-danger">
            {authErrorState.errorMessage}
          </div>
        )}

        {!isLoginPage && (
          <TextInput
            value={creds.fullName}
            onChange={(value) => handleFullNameChange(value)}
            placeholder="Full name"
            error={credsErrorState.fullNameError}
          />
        )}

        <TextInput
          value={creds.login}
          onChange={(value) => handleLoginChange(value)}
          placeholder="Login"
          error={credsErrorState.loginError}
        />
        <TextInput
          value={creds.password}
          onChange={(value) => handlePasswordChange(value)}
          placeholder="Password"
          error={credsErrorState.passwordError}
        />
        {isLoginPage ? (
          <button
            disabled={isFormInvalid()}
            onClick={() => handleLogIn()}
            className="btn btn-primary"
          >
            Log in
          </button>
        ) : (
          <button
            disabled={isFormInvalid()}
            onClick={() => handleRegister()}
            className="btn btn-primary"
          >
            Register
          </button>
        )}

        {isLoginPage ? (
          <button
            onClick={() => {
              setIsLoginPage(false);
              resetForm();
            }}
            className="btn btn-primary"
          >
            Register now
          </button>
        ) : (
          <button
            onClick={() => {
              setIsLoginPage(true);
              resetForm();
            }}
            className="btn btn-primary"
          >
            Back to login page
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
