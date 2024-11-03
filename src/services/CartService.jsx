import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/cart`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findByUserId = async (userId) => {
  try {
    const res = await http.get(`${URLAPI}/cart/${userId}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/cart`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, type) => {
  try {
    const res = await http.put(`${URLAPI}/cart/${id}/${type}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/cart/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
