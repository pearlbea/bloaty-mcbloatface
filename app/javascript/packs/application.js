import { App } from "../app";

window.app = new App();

document.addEventListener("DOMContentLoaded", () => {
  app.init();
});
