import create from "zustand";
import type { UserInfo, Permission } from "./type";

export const useUserInfo = create<{
  userInfo: UserInfo;
  getUserInfo?: () => Promise<boolean>;
}>((set, get) => ({
  userInfo: {
    name: "123",
    avatar: "",
  },
  getUserInfo: () => {
    return new Promise((resolve) => {
      set((state) => {
        state.userInfo = {
          name: "qq",
          avatar: "",
        };
        return state;
      });
      resolve(true)
    });
  },
}));

export const usePermissions = create<{
  permissions: Permission | null;
  fetchPermissions?: () => Promise<boolean>;
  useAuth?: (
    page: string,
    authType?: string | string[]
  ) => boolean | (boolean | string)[];
}>((set, get) => ({
  permissions: null,
  fetchPermissions: () => {
    const userId = useUserInfo?.getState()?.userInfo?.name;
    // 调用接口获取用户权限
    return new Promise((resolve) => {
      set((state) => {
        const map = new Map();
        map.set("home", ["read", "write"]);
        console.log('map', map)
        state.permissions = map;
        return state;
      });
      resolve(true)
    })
  },
  useAuth: (page, authType) => {
    const permissions = get().permissions;
    if (!authType) {
      return permissions?.get(page) ?? false;
    } else if (typeof authType === "string") {
      const arr = permissions?.get(page);
      if (!arr || arr?.length == 0) {
        return false;
      }
      return !!arr?.includes(authType);
    } else if (Array.isArray(authType)) {
      const arr = permissions?.get(page);
      const auth = authType?.map((key) => {
        return !!arr?.includes(key);
      });
      return auth;
    }
    return false;
  },
}));
