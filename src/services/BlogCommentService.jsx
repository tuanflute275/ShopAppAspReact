import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/blogComment?sort=Id-DESC`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/blogComment/${id}?sort=Id-DESC`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findByUserAndBlogId = async (userId, blogId) => {
  try {
    const res = await http.get(`${URLAPI}/blogComment/${userId}/${blogId}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const search = async (blogId,name, sort, page) => {
  try {
    const params = new URLSearchParams();
    if (name != null) params.append("name", name);
    if (sort != null) params.append("sort", sort);
    if (page != 1) params.append("page", page);

    const queryString = params.toString() ? `?${params}` : "";
    const res = await http.get(`${URLAPI}/blogComment/${blogId}${queryString}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/blogComment`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/blogComment/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/blogComment/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
