import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const login = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/auth/login`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const register = async (data) => {
  try {
    const res = await http.save(`${URLAPI}auth/register`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const forgotPassword = async (data) => {
  try {
    const res = await http.save(`${URLAPI}auth/forgotPassword`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const changePassword = async (userId, data) => {
  try {
    const res = await http.save(`${URLAPI}auth/forgotPassword/${userId}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
