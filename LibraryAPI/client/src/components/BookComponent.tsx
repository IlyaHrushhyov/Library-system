import BookModel from "../models/BookModel";

export const BookComponent = (props: BookModel) => {
  return (
    <div className="card">
      <div className="row"></div>
      <div className="card-header">
        <h3 className="card-title">{props.name}</h3>
      </div>
      <div className="card-body">
        <h3 className="card-title">{props.authorName}</h3>
        <h4 className="card-title">{props.year}</h4>
        <p className="card-title">{props.id}</p>
      </div>
    </div>
  );
};
