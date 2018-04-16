// This allows angular to be loaded twice for illustrative purposes.
import * as _ from "../users";

import { App } from "../app";

document.addEventListener("DOMContentLoaded", () => {
  const app = new App().init();
});

// if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/sw.js').then(registration => {
//       console.log('SW registered: ', registration);
//     }).catch(registrationError => {
//       console.log('SW registration failed: ', registrationError);
//     });
//   });
// }
