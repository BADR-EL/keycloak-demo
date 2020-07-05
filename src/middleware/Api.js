import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8081",
  responseType: "json",
  timeout: 1000 * 10,
});

const get = (url, { params, body }, method, keycloak) => {
  return keycloak
    .updateToken(10)
    .then(() => {
      if (method === "post") {
        return client
          .post(url, body, {
            headers: {
              Authorization: "Bearer " + keycloak.token,
            },
          })
          .then(({ data }) => data);
      } else {
        return client
          .get(url, {
            headers: {
              Authorization: "Bearer " + keycloak.token,
            },
          })
          .then(({ data }) => data);
      }
    })
    .catch((error) => {
      throw error; // you need to handle the error
    });
};

export const getResource = (key) =>
  get("/api/v1/SecuredResource", {}, "get", key);
