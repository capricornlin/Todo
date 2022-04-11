import { createSlice } from "@reduxjs/toolkit";

const getInitailTodo = () => {
  const localTodolist = localStorage.getItem("todoList");
  if (localTodolist) {
    return JSON.parse(localTodolist);
  }
  localStorage.setItem("todoList", JSON.stringify([]));
  return [];
};

const todoSlice = createSlice({
  name: "todos",
  initialState: getInitailTodo(),
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        title: action.payload.title,
        type: action.payload.type,
        priority: action.payload.priority,
        time: new Date().toLocaleString(),
        completed: false,
      };
      state.push(newTodo);
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        //TODO:這邊的spread operator是把action.payload這個object內的屬性提取出來
        //然後變成一個新的object再push進去todoListArr
        todoListArr.push({ ...newTodo });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      } else {
        localStorage.setItem("todoList", JSON.stringify([{ ...newTodo }]));
      }
    },
    deleteTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((item, index) => {
          if (item.id === action.payload) {
            todoListArr.splice(index, 1);
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
      }
      //TODO: 因為filter不會改變原先的array，只會回傳一個新的array，所以我們可以return這個新的array
      //來通知slice我們改變state了
      // return state.filter((todo) => todo.id !== action.payload.id);
      //TODO: payload是傳進來id
      return state.filter((todo) => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
      localStorage.setItem("todoList", JSON.stringify(state));
    },
    updateTodo: (state, action) => {
      const todoList = localStorage.getItem("todoList");
      if (todoList) {
        const todoListArr = JSON.parse(todoList);
        todoListArr.forEach((item, index) => {
          if (item.id === action.payload.id) {
            item.title = action.payload.title;
            item.type = action.payload.type;
            item.completed = action.payload.completed;
            item.priority = action.payload.priority;
          }
        });
        localStorage.setItem("todoList", JSON.stringify(todoListArr));
        console.log("update successfully");
        return todoListArr;
      }
    },
  },
});

export const { addTodo, deleteTodo, toggleComplete, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
