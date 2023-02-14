import React from "react";
import AuthorModel from "../models/AuthorModel";
import GenreModel from "../models/GenreModel";
interface IInfoContext {
  authors: AuthorModel[];
  setAuthors?: React.Dispatch<React.SetStateAction<AuthorModel[]>>;
  genres: GenreModel[];
  setFullName?: React.Dispatch<React.SetStateAction<GenreModel[]>>;
}

const defaultState = {
  authors: [],
  genres: [],
};

const InfoContext = React.createContext<IInfoContext>(defaultState);

export default InfoContext;
