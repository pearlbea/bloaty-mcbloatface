export class Story {
  private TOP_LEVEL_COMMENTS = ".top";

  public init() {
    this.addEventListeners();
  }

  get top_level_comments(): NodeList {
    return document.querySelectorAll(this.TOP_LEVEL_COMMENTS);
  }

  private addEventListeners() {
    Array.prototype.forEach.call(this.top_level_comments, top => {
      top.addEventListener("click", this.toggleSection);
    });
  }

  private toggleSection() {
    console.log("click");
  }
}
