export type UserInfo = {
  name: string;
  avatar: string;
};

// 针对页面，用列表[read, write]来表示进入和操作的权限
export type Permission = Map<string, string[]>;

export interface Response<T = unknown> {
  data?: T;
  code: number;
  message: string;
  success: boolean;
}
