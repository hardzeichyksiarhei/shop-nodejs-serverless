export const routes = {
  products: {
    getAll: "/products",
    getById: (id: string) => `/products/${id}`,
  },
};
