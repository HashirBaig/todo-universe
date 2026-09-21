import api from "../lib/axios";
import { USER } from "./apiUrls";

export type GuestUser = {
  _id: string;
  username: string;
};

export const createGuestUser = () => {
  return api.post<GuestUser>(`${USER}/guest`);
};
