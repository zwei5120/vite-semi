import ky from "ky";

export const request = ky.extend({
  prefixUrl: "",
  timeout: 60 * 1000,
  hooks: {
    beforeRequest: []
  }
});
