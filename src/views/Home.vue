<template>
  <h1>ToDo App</h1>
  <form @submit.prevent="addTodo">
    <label for="new-todo">New ToDo</label>
    <input id="new-todo" type="text" name="newTodo" autocomplete="off" v-model.lazy="newTodo">
    <button>Add Todo</button>
  </form>

  <h2>ToDo List</h2>
  <ul>
    <li v-for="(todo, index) in todos" :key="index">
      <span :class="{ done: todo.done}" @click="doneTodo(todo)">{{ todo.content }}</span>
      <button @click="removeTodo(index)">Remove</button>
    </li>
  </ul>
  <h4 v-if="todos.length === 0">Empty List</h4>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue';
import {Todo, todosData} from "@/Global/todo";

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {
    const newTodo = ref('')
    const todos = ref(todosData)

    let ClsTodo = new Todo(newTodo.value, todos.value)

    // Must use watch for updating value in class instance - Because value newTodo is never updated in class
    watch(newTodo, (currentValue, oldValue) => {
      currentValue != oldValue && ClsTodo._setNewTodoValue(newTodo.value)
    })
    const addTodo = (): void => ClsTodo.addTodo(() => newTodo.value = '')

    return {
      newTodo,
      todos,
      addTodo,
      removeTodo: ClsTodo.removeTodo,
      doneTodo: ClsTodo.doneTodo
    }
  }
});
</script>
