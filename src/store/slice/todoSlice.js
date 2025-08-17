import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

export const fetchTodos = createAsyncThunk('fetchTodos', async() => {
    const asyncResponse = await axios.get("https://dummyjson.com/todos");
    return asyncResponse.data
})


//Creating slice
const todoReducer = createSlice({
    name : 'Todos',
    initialState : {
        todoList : [],
        loading : false,
        todoListFormApi : [],
        isError : false
    },
    reducers : {
        //Combine the all actions that you need
        addTodo : (state, action) => {
            const newCreatedTodo = {
              id: state.todoList.length === 0 ? 1 : state.todoList.length + 1,
              title: action.payload,
            };
            state.todoList.push(newCreatedTodo) //This is our initial todolist
            return state
        },
        deleteTodo : (state, action) => {
            state.todoList = state.todoList.filter((ele) => ele.id !== action.payload )
            return state
        },
        editTodo : (state, action) => {
          let currentStateTodo = state.todoList
          let currentStateTodoIndex = currentStateTodo.findIndex(item => action.payload.editedTodo === item.id)
          
          //Editing thing is going in this
          currentStateTodo[currentStateTodoIndex] = {
            ...currentStateTodo[currentStateTodoIndex],
            title: action.payload.currentTodo,
          };

          console.log(currentStateTodoIndex);
          
          return state;
        }
    },
    extraReducers : ((builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            console.log(action);
            state.loading = false;
            state.todoListFormApi = action.payload.todos
        })
        builder.addCase(fetchTodos.rejected, (state) => {
            state.isError = true
            state.loading = false
        })
    })
})

export const {addTodo, deleteTodo, editTodo} = todoReducer.actions
export default todoReducer.reducer