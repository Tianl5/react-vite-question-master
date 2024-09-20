import { nanoid } from 'nanoid'
import { makeObservable, observable, action, computed } from 'mobx'
export class ObservableTodoStore {
  id = ''
  task = ''
  completed = false

  constructor(task: string) {
    // 可观察属性
    makeObservable(this, {
      task: observable,
      id: observable,
      completed: observable,
      rename: action,
      toggleCompleted: action,
    })
    this.id = nanoid(5)
    this.task = task
  }

  rename(newName: string) {
    this.task = newName
  }

  toggleCompleted() {
    this.completed = !this.completed
  }
}

export class ObservableTodoListStore {
  todos: ObservableTodoStore[] = []

  constructor() {
    makeObservable(this, {
      todos: observable,
      addTodo: action,
      removeTodo: action,
      getCompletedTodosCount: computed,
    })
  }

  // 获取已经完成的todos数量
  getCompletedTodosCount() {
    return this.todos.filter((todo) => todo.completed).length
  }
  addTodo(task: string) {
    const newTodo = new ObservableTodoStore(task)
    this.todos.push(newTodo) // 声明式，像vue 一样
  }

  removeTodo(id: string) {
    const index = this.todos.findIndex((todo) => todo.id === id)
    this.todos.splice(index, 1)
  }
}

const store = new ObservableTodoListStore()

export default store
