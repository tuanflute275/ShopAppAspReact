import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/productDetail`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findByAttributeId = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/productDetail/detail/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/productDetail/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const search = async (productId, page) => {
  try {
    const params = new URLSearchParams();
    if (page != 1) params.append("page", page);

    const queryString = params.toString() ? `?${params}` : "";
    const res = await http.get(
      `${URLAPI}/productDetail/${productId}${queryString}`
    );
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/productDetail`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/productDetail/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/productDetail/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
