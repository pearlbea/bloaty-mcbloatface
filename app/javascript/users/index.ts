import "./polyfills.ts";

import "../theme";
import "./users";

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.module";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("app-users")) {
    platformBrowserDynamic().bootstrapModule(AppModule);
  }
});
