import axiosClient from "./axiosClient";
export const boardApi = {
  getBoardDetails: (id) =>
    axiosClient.get(`/boards/${id}?_embed=lists`).then((r) => r.data),
};
