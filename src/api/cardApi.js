import axiosClient from "./axiosClient";
export const cardApi = {
  create: (payload) => axiosClient.post("/cards", payload).then((r) => r.data),
  update: (id, payload) =>
    axiosClient.patch(`/cards/${id}`, payload).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/cards/${id}`).then((r) => r.data),
};
