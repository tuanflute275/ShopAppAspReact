import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/products`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/products/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const upload = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/upload-image/product`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/products`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/products/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/products/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
