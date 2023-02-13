import { axiosInstance } from "./service-base";

export const genreService = {
  async getGenres() {
    return await axiosInstance.get(`Genre/getGenres`);
  },
};
