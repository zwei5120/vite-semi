import create from "zustand";

export const useUserInfo = create<{
  userInfo: { name: string };
  getUserInfo?: () => void;
}>((set, get) => ({
  userInfo: {
    name: "qq",
    age: 12,
  },
  getUserInfo: () => {
    console.log("111", get().userInfo.name);
  },
}));

export const userA = create<{ say: () => void }>((set, get) => ({
  say: () => {
    console.log("222", useUserInfo.getState());
  },
}));
