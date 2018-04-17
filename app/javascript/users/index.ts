import "./polyfills.ts";
import "../theme";
import "./users";

import { AppModule } from "./app/app.module";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("app-users")) {
    platformBrowserDynamic().bootstrapModule(AppModule);
  }
});
