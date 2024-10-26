import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/productImage`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (productId) => {
  try {
    const res = await http.get(`${URLAPI}/productImage/${productId}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findByImageId = async (imageId) => {
  try {
    const res = await http.get(`${URLAPI}/productImage/image/${imageId}`);
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
      `${URLAPI}/productImage/${productId}${queryString}`
    );
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/productImage`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const updateSingleImage = async (data) => {
  try {
    const res = await http.put(`${URLAPI}/productImage`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/productImage/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
