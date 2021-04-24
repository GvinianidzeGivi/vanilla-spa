"use strict";

import ErrorPage from "./pages/error.page.js";
import NavbarComponent from "./components/navbar.component.js";
import Parser from "./utils/parser.js";
import routes from "./routes/routes.js";

const router = async () => {
  const header = document.getElementById("header");
  const main = document.getElementById("root");

  header.innerHTML = await NavbarComponent.render();
  await NavbarComponent.after_render();

  let request = Parser.parseRequestURL();

  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  let page = routes[parsedURL] ? routes[parsedURL] : ErrorPage;
  main.innerHTML = await page.render();
  await page.after_render();
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
