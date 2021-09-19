import axios from "axios";
import { User } from "../models";

const BaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const _axiosClient = axios.create({
  baseURL: BaseUrl,
});

// #region Calls
export const GetUsers = () => {
  return _axiosClient.get<Array<User>>(`users`);
};
// #endregion
