import {Content} from "@/Interfaces/Content";

export interface InterfaceTodo {
  _setNewTodoValue(newValue: string): void

  _setTodosValue(newValue: Content[]): void

  saveData(): void

  addTodo(cb: () => void): void

  removeTodo(index: number): void

  doneTodo(todo: Content): void
}
