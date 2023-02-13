import { FC } from "react";
import { useNavigate } from "react-router-dom";
import BookModel from "../models/BookModel";

interface BookComponetProps {
  book: BookModel;
}

export const BookComponent: FC<BookComponetProps> = (props) => {
  const navigator = useNavigate();
  return (
    <div className="card">
      <div className="row"></div>
      <div className="card-header">
        <div className="row mx-md-n5">
          <h3 className="card-title col px-md-5">{props.book.name}</h3>
          <button
            className="col  btn btn-sm btn-outline-secondary"
            onClick={() => navigator(`/edit/${props.book.id}`)}
          >
            Update
          </button>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{props.book.authorName}</h3>
        <h4 className="card-title">{props.book.year}</h4>
        <p className="card-title">{props.book.id}</p>
      </div>
    </div>
  );
};
