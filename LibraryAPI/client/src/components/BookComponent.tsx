import BookModel from "../models/BookModel";

export const BookComponent = (props: BookModel) => {
  return (
    <div className="card">
      <div className="row"></div>
      <div className="card-header">
        <div className="row mx-md-n5">
          <h3 className="card-title col px-md-5">{props.name}</h3>
          <button
            className="col  btn btn-sm btn-outline-secondary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Update
          </button>
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{props.authorName}</h3>
        <h4 className="card-title">{props.year}</h4>
        <p className="card-title">{props.id}</p>
      </div>
    </div>
  );
};
