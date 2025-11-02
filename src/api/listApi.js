import axiosClient from "./axiosClient";
export const listApi = {
  create: (payload) => axiosClient.post("/lists", payload).then((r) => r.data),
  update: (id, payload) =>
    axiosClient.patch(`/lists/${id}`, payload).then((r) => r.data),
};
