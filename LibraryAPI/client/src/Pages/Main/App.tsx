import { useEffect, useMemo, useState } from "react";
import "./App.scss";
import AuthContext from "../../contexts/auth-context";
import { AppRouter } from "../../components/AppRouter";
import { authService } from "../../services/auth-service";
import { authorService } from "../../services/author-service";
import GenreModel from "../../models/GenreModel";
import AuthorModel from "../../models/AuthorModel";
import { genreService } from "../../services/genre-service";
import InfoContext from "../../contexts/info-context";
import { NavBar } from "../../components/NavBar";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [fullName, setFullName] = useState<string>("");
  const [authors, setAuthors] = useState<AuthorModel[]>([]);
  const [genres, setGenres] = useState<GenreModel[]>([]);
  const autContextValue = useMemo(
    () => ({
      isAuth,
      fullName,
      setIsAuth,
      setFullName,
    }),
    [isAuth, fullName]
  );

  const infoContextValue = useMemo(
    () => ({
      authors,
      genres,
      setAuthors,
      setGenres,
    }),
    [authors, genres]
  );

  useEffect(() => {
    authService
      .getUserInfo()
      .then((response) => {
        setIsAuth(true);
        setFullName(response.data);
      })
      .catch(() => {});

    authorService
      .getAuthors()
      .then((response) => {
        setAuthors(response.data);
      })
      .catch(() => {});

    genreService
      .getGenres()
      .then((response) => {
        setGenres(response.data);
      })
      .catch(() => {});
  }, []);

  return (
    <AuthContext.Provider value={autContextValue!}>
      <InfoContext.Provider value={infoContextValue!}>
        <NavBar></NavBar>
        <AppRouter />
      </InfoContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
