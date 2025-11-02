export const authApi = {
  login: async ({ email }) => ({
    id: "u1",
    email,
    name: "Demo User",
    token: "demo-token",
  }),

  register: async ({ email }) => ({
    id: "u1",
    email,
    name: "Demo User",
    token: "demo-token",
  }),
};
