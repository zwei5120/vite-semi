import ky from "ky";

export const request = ky.extend({
  prefixUrl: "",
  timeout: 60 * 1000,
  hooks: {
    beforeRequest: [(req) => {
      const token = localStorage.getItem('token')
      if(token) {
        req.headers.set('Authorization', token)
      }
    }]
  },
});
