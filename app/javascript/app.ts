import { Story } from "./story";

export class App {
  public init() {
    console.log("initing app");
    const story = new Story();
    story.init();
  }
}
