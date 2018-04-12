import "./application.scss";
import { Story } from "./story";

export class App {
  private readonly HEADER = ".navbar";

  public init(): void {
    this.addEventListeners();
    this.initStory();
  }

  get header(): HTMLElement {
    return document.querySelector(this.HEADER);
  }

  private addEventListeners(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  private handleScroll(): void {
    if (window.pageYOffset > 100) {
      this.header.classList.add("shrink");
      this.header.classList.remove("grow");
    } else {
      this.header.classList.remove("shrink");
      this.header.classList.add("grow");
    }
  }

  private initStory(): void {
    const story = new Story();
    story.init();
  }
}

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
