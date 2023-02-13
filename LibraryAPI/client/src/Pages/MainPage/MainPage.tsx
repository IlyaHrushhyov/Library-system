import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookComponent } from "../../components/BookComponent";
import { CheckBox } from "../../components/CheckBox";
import AuthContext from "../../contexts/auth-context";
import { EditModal } from "../../modals/EditModal";
import BookModel from "../../models/BookModel";
import DeleteBookRequest from "../../requests/DeleteBookRequest";
import { authService } from "../../services/auth-service";
import { bookService } from "../../services/book-service";
import "../MainPage/MainPage.scss";

interface BookState extends BookModel {
  checked: boolean;
}

export const MainPage = () => {
  const { isAuth, setIsAuth, setFullName, fullName } = useContext(AuthContext);
  const [books, setBooks] = useState<BookState[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const navigator = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      if (!isDataLoaded) {
        const response = await bookService.getUserBooks();
        setBooks(response.data.map((item) => ({ ...item, checked: false })));
        setIsDataLoaded(true);
      }
    };
    getBooks();
  }, [isDataLoaded]);

  const handleDeleteBooks = () => {
    if (confirm("Are you sure to delete?")) {
      const deleteBookRequest: DeleteBookRequest = {
        ids: books.filter((b) => b.checked).map((b) => b.id),
      };
      bookService
        .delete(deleteBookRequest)
        .then(() => {
          setIsDataLoaded(false);
        })
        .catch((error) => {});
    }
  };

  const handleCheck = (isChecked: boolean, bookId: string) => {
    console.log(isChecked, bookId);

    setBooks(
      books.map((x) => ({
        ...x,
        checked: x.id === bookId ? isChecked : x.checked,
      }))
    );
  };

  const handleClearAll = () => {
    setBooks(books.map((b) => ({ ...b, checked: false })));
    console.log(books);
  };

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

      <EditModal />

      <div className="container listContainer">
        <div className="d-flex flex-row-reverse bd-highlight">
          <div>
            <div className="card">
              <button
                className="btn btn-outline-success mb-2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Create
              </button>
              {/* <button className="btn btn-outline-danger" type="submit">
                TrashCan
              </button> */}
              {/* <button className="btn btn-danger" type="submit">
                Cancel
              </button> */}
              <button
                className="btn btn-outline-danger"
                onClick={handleDeleteBooks}
                type="submit"
              >
                Delete selected
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <button
              className="btn btn-outline-danger mb-4 mt-4"
              onClick={handleClearAll}
              type="submit"
            >
              Clear all
            </button>
            <div className="column">
              {books.map((book) => {
                return (
                  <div key={book.id}>
                    <CheckBox
                      checked={book.checked}
                      onChange={() => handleCheck(!book.checked, book.id)}
                    />
                    <BookComponent {...book}></BookComponent>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
