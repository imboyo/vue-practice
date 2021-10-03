import {Content} from "@/Interfaces/Content";
import {InterfaceTodo} from "@/Interfaces/InterfaceTodo";

export class Todo implements InterfaceTodo {
  private _newTodoValue: string;
  private _todosValue: Content[];

  constructor(newTodoValue: string, todosValue: Content[]) {
    this._newTodoValue = newTodoValue
    this._todosValue = todosValue
  }

  _setNewTodoValue(newValue: string): void {
    this._newTodoValue = newValue
  }

  _setTodosValue(newValue: Content[]): void {
    this._todosValue = newValue
  }

  saveData(): void {
    const storageData = JSON.stringify(this._todosValue)
    localStorage.setItem('todos', storageData)
  }

  addTodo(cb: () => void): void {
    if (this._newTodoValue.length > 0) {
      this._todosValue.push({
        done: false,
        content: this._newTodoValue
      })
      cb()
    }
    this.saveData()
  }

  removeTodo = (index: number): void => {
    this._todosValue.splice(index, 1)
    this.saveData()
  }

  doneTodo = (todo: Content): void => {
    todo.done = !todo.done
    this.saveData()
  }

}

export const defaultData: Content[] = []
export const todosData: Content[] = JSON.parse(localStorage.getItem('todos') as string) || defaultData
