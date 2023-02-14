import { axiosInstance } from "./service-base";

export const authorService = {
  async getAuthors() {
    return await axiosInstance.get(`Author/getAuthors`);
  },
};
