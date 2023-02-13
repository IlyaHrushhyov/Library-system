import { useContext, useState } from "react";
import { TextInput } from "../components/TextInput";
import CreateBookRequest from "../requests/CreateBookRequest";
import UpdateBookRequest from "../requests/UpdateBookRequest";
import { bookService } from "../services/book-service";
import "../modals/CreateModal.scss";
import InfoContext from "../contexts/info-context";
import BookModel from "../models/BookModel";

type ValidationError = string | undefined;

interface bookValidationErrorState {
  nameError: ValidationError;
  yearError: ValidationError;
  authorIdError: ValidationError;
  genreIdError: ValidationError;
}

interface CreateBookErrorState {
  errorMessage: ValidationError;
}

const initialCreateBookErrorState: CreateBookErrorState = {
  errorMessage: "",
};

const initialErrorValidationState: bookValidationErrorState = {
  nameError: "",
  yearError: undefined,
  authorIdError: "",
  genreIdError: "",
};

const initialBookState: UpdateBookRequest = {
  id: -1,
  name: "",
  year: 2023,
  authorId: -1,
  genreId: -1,
};

// interface BookState extends BookModel {
//   checked: boolean;
// }

// interface EditModalProps {
//   isCreatePage: boolean;
//   book: BookState;
//   setBooks: (movies: BookState) => void;
// }

export const CreateModal = () => {
  const [book, setBook] = useState<UpdateBookRequest>(initialBookState);
  const [errorValidationState, setErrorValidationState] =
    useState<bookValidationErrorState>(initialErrorValidationState);
  const [createBookErrorState, setCreateBookErrorState] =
    useState<CreateBookErrorState>(initialCreateBookErrorState);

  const { genres, authors } = useContext(InfoContext);

  const [isCreatePage, setIsCreatePage] = useState<boolean>(true);

  const isNameValid = (name: string) => {
    if (name.length >= 1) {
      console.log("name is valid");
    } else {
      console.log("name is not valid");
    }
    return name.length >= 1;
  };

  const handleNameChange = (name: string) => {
    setBook({ ...book, name: name });
    if (isNameValid(name)) {
      setErrorValidationState({
        ...errorValidationState,
        nameError: undefined,
      });
    } else {
      setErrorValidationState({
        ...errorValidationState,
        nameError: "Name is not valid",
      });
    }
  };

  const isYeardValid = (year: number) => {
    const date = new Date();
    if (year >= 1 && year <= date.getFullYear()) {
      console.log("year is valid");
    } else {
      console.log("year is not valid");
    }
    return year >= 1 && year <= date.getFullYear();
  };

  const handleYearChange = (year: number) => {
    setBook({ ...book, year: year });
    if (isYeardValid(year)) {
      setErrorValidationState({
        ...errorValidationState,
        yearError: undefined,
      });
    } else {
      setErrorValidationState({
        ...errorValidationState,
        yearError: "Year is not valid",
      });
    }
  };

  const isAuthorIdValid = (authorId: number) => {
    if (authorId >= 0) {
      console.log("authorId is valid");
    } else {
      console.log("authorId is not valid");
    }
    return authorId >= 0;
  };

  const isGenreIdValid = (genreId: number) => {
    if (genreId >= 0) {
      console.log("genreId is valid");
    } else {
      console.log("genreId is not valid");
    }
    return genreId >= 0;
  };

  const handleSetGenreInBook = (genreName: string) => {
    const genreId = genres.find((genre) => genre.name === genreName)?.id;
    setBook({ ...book, genreId: genreId! });
    if (isGenreIdValid(Number(genreId))) {
      setErrorValidationState({
        ...errorValidationState,
        genreIdError: undefined,
      });
    } else {
      console.log("genreId is not valid");
      setErrorValidationState({
        ...errorValidationState,
        genreIdError: "genreId is not valid",
      });
    }
  };

  const handleSetAuthorInBook = (fullName: string) => {
    const authorId = authors.find((author) => author.fullName === fullName)?.id;
    setBook({ ...book, authorId: authorId! });
    if (isAuthorIdValid(Number(authorId))) {
      setErrorValidationState({
        ...errorValidationState,
        authorIdError: undefined,
      });
    } else {
      setErrorValidationState({
        ...errorValidationState,
        authorIdError: "authorId is not valid",
      });
    }
  };

  const handleCreate = () => {
    console.log("creation");
    const createRequest: CreateBookRequest = {
      name: book.name,
      year: book.year,
      authorId: book.authorId,
      genreId: book.genreId,
    };
    bookService
      .create(createRequest)
      .then((response) => {
        console.log("created");
      })
      .catch((error) => {
        console.log("error", error.response.data.Message);
        setCreateBookErrorState({ errorMessage: error.response.data.Message });
      });
  };

  const handleUpdate = () => {
    console.log("update");
    const updateRequest: UpdateBookRequest = {
      id: book.id,
      name: book.name,
      year: book.year,
      authorId: book.authorId,
      genreId: book.genreId,
    };
    bookService
      .update(updateRequest)
      .then(() => {
        resetForm();
      })
      .catch((error) => {
        console.log("error");
        setCreateBookErrorState({ errorMessage: error.response.data.Message });
      });
  };

  const isFormInvalid = () => {
    console.log(typeof errorValidationState.nameError !== "undefined");
    console.log(typeof errorValidationState.yearError !== "undefined");
    console.log(typeof errorValidationState.genreIdError !== "undefined");
    console.log(typeof errorValidationState.authorIdError !== "undefined");

    return (
      typeof errorValidationState.nameError !== "undefined" ||
      typeof errorValidationState.yearError !== "undefined" ||
      typeof errorValidationState.genreIdError !== "undefined" ||
      typeof errorValidationState.authorIdError !== "undefined"
    );
  };

  const resetForm = () => {
    setBook(initialBookState);
    setCreateBookErrorState(initialCreateBookErrorState);
    setErrorValidationState(initialErrorValidationState);
  };

  return (
    <div
      className="modal fade"
      id="createModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {isCreatePage ? (
              <h5 className="modal-title" id="exampleModalLabel">
                Create book
              </h5>
            ) : (
              <h5 className="modal-title" id="exampleModalLabel">
                Update book
              </h5>
            )}

            <button
              onClick={resetForm}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-2 mr-3">
            {createBookErrorState.errorMessage && (
              <div className="alert alert-danger">
                {createBookErrorState.errorMessage}
              </div>
            )}

            <div className="p-2 mr-3">
              <TextInput
                type="text"
                value={book.name}
                onChange={(value) => handleNameChange(String(value))}
                placeholder="Name"
                error={errorValidationState.nameError}
              />
            </div>

            <div className="p-2 mr-3">
              <TextInput
                type="number"
                value={book.year}
                onChange={(value) => handleYearChange(Number(value))}
                placeholder="Year"
                error={errorValidationState.yearError}
              />
            </div>

            <div className="p-2 mr-3">
              <select
                onChange={(e) => handleSetGenreInBook(e.target.value)}
                className="form-select"
                placeholder="Genre"
              >
                <option disabled selected hidden>
                  Genre
                </option>
                {genres.map((genre) => {
                  return <option key={genre.id}>{genre.name}</option>;
                })}
              </select>
            </div>

            <div className="p-2 mr-3">
              <select
                onChange={(e) => handleSetAuthorInBook(e.target.value)}
                className="form-select"
              >
                <option disabled selected hidden>
                  Author
                </option>
                {authors.map((author) => {
                  return <option key={author.id}>{author.fullName}</option>;
                })}
              </select>
            </div>

            {/* <TextInput
              value={creds.login}
              onChange={(value) => handleLoginChange(value)}
              placeholder="Login"
              error={credsErrorState.loginError}
            /> */}
            {/* <TextInput
              value={book.password}
              onChange={(value) => handlePasswordChange(value)}
              placeholder="Password"
              error={credsErrorState.passwordError}
            /> */}
          </div>
          <div className="modal-footer">
            <button
              onClick={resetForm}
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            {isCreatePage ? (
              <button
                disabled={isFormInvalid()}
                onClick={() => handleCreate()}
                className="btn btn-primary"
              >
                Create
              </button>
            ) : (
              <button
                disabled={isFormInvalid()}
                onClick={() => handleUpdate()}
                className="btn btn-primary"
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
