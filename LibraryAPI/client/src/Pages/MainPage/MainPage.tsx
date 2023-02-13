import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookComponent } from "../../components/BookComponent";
import AuthContext from "../../contexts/auth-context";
import { CreateModal } from "../../modals/CreateModal";
import BookModel from "../../models/BookModel";
import { authService } from "../../services/auth-service";
import { bookService } from "../../services/book-service";
import "../MainPage/MainPage.scss";

export const MainPage = () => {
  const { isAuth, setIsAuth, setFullName, fullName } = useContext(AuthContext);
  const [books, setBooks] = useState<BookModel[]>([]);
  const navigator = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      const response = await bookService.getUserBooks();
      setBooks(response.data);
    };
    getBooks();
  }, []);
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
    <div key="mainPage">
      <nav className="navbar navbar-light bg-light">
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

      <CreateModal />

      <div className="container listContainer">
        <div className="d-flex flex-row-reverse bd-highlight">
          <div>
            <div className="card">
              <button
                className="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create
              </button>
              {/* <button className="btn btn-outline-danger" type="submit">
                TrashCan
              </button> */}
              <button className="btn btn-danger" type="submit">
                Cancel
              </button>
              <button className="btn btn-outline-danger" type="submit">
                Delete selected
              </button>
              <button className="btn btn-outline-danger" type="submit">
                Clear all
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="column">
              {books.map((book) => {
                return (
                  <>
                    <input
                      key={`${book.id}`}
                      type="checkbox"
                      aria-label="Checkbox for following text input"
                    />
                    <BookComponent
                      key={`${book.id} bookComponet`}
                      {...book}
                    ></BookComponent>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
