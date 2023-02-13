import { axiosInstance } from "./service-base";
import CreateBookRequest from "../requests/CreateBookRequest";
import UpdateBookRequest from "../requests/UpdateBookRequest";
import DeleteBookRequest from "../requests/DeleteBookRequest";
import BookModel from "../models/BookModel";
import GetBookRequest from "../requests/GetBookRequest";

export const bookService = {
  async create(createBookRequest: CreateBookRequest) {
    return await axiosInstance.post(`Book`, createBookRequest);
  },
  async getUserBooks() {
    return await axiosInstance.get<BookModel[]>(`Book/getUserBooks`);
  },
  async getBook(getBookRequest: GetBookRequest) {
    return await axiosInstance.get<UpdateBookRequest>(
      `Book/getBook?id=${getBookRequest.id}`
    );
  },
  async update(updateBookRequest: UpdateBookRequest) {
    return await axiosInstance.put(`Book`, updateBookRequest);
  },
  async delete(deleteBookRequest: DeleteBookRequest) {
    return await axiosInstance.delete(`Book`, {
      data: deleteBookRequest,
    });
  },
};
