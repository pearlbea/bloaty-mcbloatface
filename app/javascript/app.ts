// Part 2 Extra Credit: This script for animating the header triggers layout.
// Rewrite it so that it is better performing. Hint: avoid using window page offset.
// Another hint: use intersection observer.

import { debounce } from "underscore";
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
    window.addEventListener(
      "scroll",
      debounce(this.handleScroll.bind(this), 50)
    );
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
    new Story().init();
  }
}
