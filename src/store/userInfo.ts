import create from "zustand";
import type { UserInfo } from "./type";

export const useUserInfo = create<{
  userInfo: UserInfo;
  getUserInfo?: () => void;
}>((set, get) => ({
  userInfo: {
    name: "123",
    avatar: ''
  },
  getUserInfo: () => {
    console.log("111", get().userInfo.name);
  },
}));

