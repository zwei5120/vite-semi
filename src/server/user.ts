import { request } from "./request";
import type { Response, UserInfo } from '../store/type'

export const apiLogin = (data: {
  username: string
  password: string
}) => {
  return new Promise((resolve) => {
    resolve(true)
  })
  // request.post("/login", {
  //   json: data
  // }).json<Response<UserInfo>>()
}
