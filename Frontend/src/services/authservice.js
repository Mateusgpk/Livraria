import request from "./api";

export const registerUser = (userData) => {
    return  request({
  endpoint: "/api/usuarios/registrar",
  method: "POST",
  data: userData});
};

export const loginUser =  (credentials) => {
    return  request({
  endpoint: "/api/usuarios/login",
  method: "POST",
  data: credentials});
}