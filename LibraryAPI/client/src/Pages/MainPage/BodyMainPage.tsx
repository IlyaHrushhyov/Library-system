import { useEffect, useState } from "react";
import { BookComponent } from "../../components/BookComponent";
import { CheckBox } from "../../components/CheckBox";
import BookModel from "../../models/BookModel";
import DeleteBookRequest from "../../requests/DeleteBookRequest";
import { bookService } from "../../services/book-service";

interface BookState extends BookModel {
  checked: boolean;
}

export const BodyMainPage = () => {
  const [books, setBooks] = useState<BookState[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [isCreateModal, setIsCreateModal] = useState<boolean>(false);

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

  return (
    <div>
      <div className="container listContainer">
        <div className="d-flex flex-row-reverse bd-highlight">
          <div>
            <div className="card">
              <button
                className="btn btn-outline-success mb-2"
                data-bs-toggle="modal"
                data-bs-target="#createModal"
                onClick={() => {
                  setIsCreateModal(true);
                  console.log(isCreateModal);
                }}
              >
                Create
              </button>
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
                    <BookComponent book={book}></BookComponent>
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
