import AuthModel from "../requests/AuthRequest";
import RegistrationModel from "../models/UserModel";
import { axiosInstance } from "./service-base";

export const authService = {
  async register(userModel: RegistrationModel) {
    return await axiosInstance.post(`Auth/register`, userModel);
  },
  async authenticate(authModel: AuthModel) {
    return await axiosInstance.post(`Auth/login`, authModel);
  },
  async getUserInfo() {
    return await axiosInstance.get(`Auth/getUserInfo`);
  },
  async logout() {
    return await axiosInstance.post(`Auth/logout`);
  },
};
