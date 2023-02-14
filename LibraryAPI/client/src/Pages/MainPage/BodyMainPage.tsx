import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookComponent } from "../../components/BookComponent";
import { CheckBox } from "../../components/CheckBox";
import BookModel from "../../models/BookModel";
import DeleteBookRequest from "../../requests/DeleteBookRequest";
import { bookService } from "../../services/book-service";

interface BookState extends BookModel {
  checked: boolean;
}

export const BodyMainPage = () => {
  const navigator = useNavigate();
  const [books, setBooks] = useState<BookState[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

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
    if (confirm("Are you sure?")) {
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

  return (
    <div>
      <div className="container listContainer">
        <div className="d-flex flex-row-reverse bd-highlight">
          <div className="card" style={{ minWidth: "20px", marginTop: "16px" }}>
            <button
              className="btn btn-success "
              style={{ minWidth: "130px" }}
              onClick={() => navigator("/create")}
            >
              Create
            </button>
            {books.length != 0 && (
              <button
                className="btn btn-danger"
                style={{ marginTop: "10px" }}
                onClick={handleDeleteBooks}
                type="submit"
                disabled={!books.some((book) => book.checked)}
              >
                Delete selected
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {books.length != 0 && (
              <button
                className="btn btn-danger mb-4 mt-4"
                onClick={handleClearAll}
                type="submit"
                disabled={!books.some((book) => book.checked)}
              >
                Clear all
              </button>
            )}

            <div className="column" style={{ marginTop: "8px" }}>
              {books.length != 0 ? (
                books.map((book) => {
                  return (
                    <div key={book.id}>
                      <CheckBox
                        checked={book.checked}
                        onChange={() => handleCheck(!book.checked, book.id)}
                      />
                      <BookComponent book={book}></BookComponent>
                    </div>
                  );
                })
              ) : (
                <div className="card">
                  <div className="row"></div>
                  <div className="card-header">
                    <div className="row mx-md-n5">
                      <h3 className="card-title col px-md-5">No data</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
