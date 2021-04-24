import ReposPage from "../pages/repos.page.js";
import UsersPage from "../pages/users.page.js";
import UserDetailsPage from "../pages/user-details.page.js";

const routes = {
  "/": UsersPage,
  "/repos": ReposPage,
  "/users": UsersPage,
  "/user/:id": UserDetailsPage,
};

export default routes;
