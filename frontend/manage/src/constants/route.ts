const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  MY_PROJECT: "/projects",
  NEW_PROJECT: "/projects/new",
  PROJECT_DETAIL: "/projects/:id",
  GET_PROJECT_DETAIL: (id: number) => `/projects/${id}`,
  SCRIPT_PUBLISHING: "/projects/:id/guide",
  GET_SCRIPT_PUBLISHING: (id: number) => `/projects/${id}/guide`
};

export { ROUTE };
