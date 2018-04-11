import { Story } from "./story";

export class Home {
  public init() {
    this.initStory();
  }

  initStory(): void {
    const story = new Story();
    story.init();
  }
}
