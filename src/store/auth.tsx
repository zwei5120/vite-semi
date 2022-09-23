import React from "react";
import { createContext } from "react";
import type { UserInfo, Permission } from "./type";
import { useUserInfo, usePermissions } from "./userInfo";

export const AuthContext = createContext<{
  userInfo?: UserInfo;
  permissions?: Permission | null;
  useAuth?: (
    page: string,
    authType?: string | string[]
  ) => boolean | (boolean | string)[];
} | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = (props) => {
  const userInfo = useUserInfo((state) => state?.userInfo);
  const [permissions, useAuth] = usePermissions((state) => [state?.permissions, state?.useAuth]);
  console.log('userInfo', userInfo, 'permissions', permissions)

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        permissions,
        useAuth
      }}
    >
      {props?.children}
    </AuthContext.Provider>
  );
};

