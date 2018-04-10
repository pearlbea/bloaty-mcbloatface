export class ToDo {
  constructor(private readonly todoText: string) {}
}
//
// export class App {
//   private readonly ADD_TODO_INPUT = ".add-todo";
//
//   public init(): void {
//     this.addEventListeners();
//   }
//
//   private addEventListeners(): void {
//     this.addTodoInput.addEventListener("keydown", this.onEnter.bind(this));
//   }
//
//   get addTodoInput(): HTMLInputElement {
//     return document.querySelector(this.ADD_TODO_INPUT);
//   }
//
//   private onEnter(event): void {
//     if (event.key === "Enter") {
//       this.handleNewToDo(event.target.value);
//     }
//   }
//
//   private handleNewToDo(todo) {
//     console.log(todo);
//   }
// }
