import "./application.scss";
import { Story } from "./story";

export class App {
  private readonly HEADER = ".navbar";

  public init() {
    this.addEventListeners();
    const story = new Story();
    story.init();
  }

  get header() {
    return document.querySelector(this.HEADER);
  }

  addEventListeners(): void {
    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  handleScroll(): void {
    if (window.pageYOffset > 100) {
      this.header.classList.add("shrink");
      this.header.classList.remove("grow");
    } else {
      this.header.classList.remove("shrink");
      this.header.classList.add("grow");
    }
  }
}
