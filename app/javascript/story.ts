// Part 2 Extra Credit: The code below adds a DOM element to each top-level comment
// on initial render. How might you make this more performant?

export class Story {
  public init() {
    this.addExpanders();
  }
  get topLevelComments(): NodeList {
    return document.querySelectorAll(".top");
  }

  private get innerComments(): HTMLLIElement[] {
    let comments = [];
    Array.prototype.forEach.call(this.topLevelComments, comment => {
      if (comment.querySelector(".list-group-item")) {
        comments.push(comment.querySelector(".list-group"));
        this.addButton(comment);
      }
    });
    return comments;
  }

  private addExpanders(): void {
    Array.prototype.forEach.call(this.innerComments, comment => {
      comment.classList.add("hidden");
    });
  }

  private addButton(comment: HTMLUListElement) {
    let button: HTMLElement = document.createElement("button");
    button.innerText = "more";
    button.classList.add("btn", "btn-link");
    button.addEventListener("click", this.expandComment);
    comment.appendChild(button);
  }

  private expandComment(event) {
    let parent = event.target.parentNode;
    let subcomments = parent.querySelector(".comment ul.list-group");
    let classes = subcomments.classList;

    if (classes.contains("hidden")) {
      classes.remove("hidden");
      event.target.innerText = "less";
    } else {
      classes.add("hidden");
      event.target.innerText = "more";
    }
  }
}
