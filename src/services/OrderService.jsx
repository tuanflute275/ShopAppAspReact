import * as http from "../common/http-common";

const URLAPI = process.env.REACT_APP_API_ASP;

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/order?sort=Id-DESC`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/order/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const search = async (name, sort, page) => {
  try {
    const params = new URLSearchParams();
    if (name != null) params.append('name', name);
    if (sort != null) params.append('sort', sort);
    if (page != 1) params.append('page', page);
    
    const queryString = params.toString() ? `?${params}` : '';
    const res = await http.get(`${URLAPI}/order${queryString}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/order`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, status) => {
  try {
    const res = await http.put(`${URLAPI}/order/${id}/${status}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/order/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
