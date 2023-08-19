import api from "@/services/api.js";

export const getShowsByPage = async (page) => {
  try {
    const url = `/shows?page=${page}`;
    const request = await api.get(url);

    return request.data;
  } catch (err) {
    // TODO
  }
  return undefined;
};
