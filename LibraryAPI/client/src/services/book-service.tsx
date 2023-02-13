import { axiosInstance } from "./service-base";
import CreateBookRequest from "../requests/CreateBookRequest";
import GetUserBooksRequest from "../requests/GetUserBooksRequest";
import UpdateBookRequest from "../requests/UpdateBookRequest";
import DeleteBookRequest from "../requests/DeleteBookRequest";

export const bookService = {
  async create(createBookRequest: CreateBookRequest) {
    return await axiosInstance.post(`Book`, createBookRequest);
  },
  async getUserBooks() {
    return await axiosInstance.get(`Book`);
  },
  async update(updateBookRequest: UpdateBookRequest) {
    return await axiosInstance.put(`Book`, updateBookRequest);
  },
  async delete(deleteBookRequest: DeleteBookRequest) {
    return await axiosInstance.put(`Book`, deleteBookRequest);
  },
};
