import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, editTodo, fetchTodos } from '../store/slice/todoSlice.js'
import "./todo.css"

const Todocomponent = () => {
  const[currentTodo, setCurrentTodo] = useState('')
  const [editedTodo, setEditedTodo] = useState(null)

  //Now i need to use useSelector in order to display
  const { todoList, todoListFormApi } = useSelector((state) => state.todo);
  console.log(todoListFormApi, "new")
  //using dispatch hook
  //This hook basically we used when we need to call a fn from the ruducer.
  const dispatch = useDispatch() 

  const handleAddTodo = () => {
    dispatch(addTodo(currentTodo));
    setCurrentTodo('')
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  const handleUpdateTodo = (todo) =>{
    setEditedTodo(todo.id)
    setCurrentTodo(todo.title)
  }

  const handleEditTodo = () =>{
    dispatch(editTodo({ editedTodo, currentTodo }));
    setCurrentTodo('')
    setEditedTodo(null)
  }

  const handleFetchTodos = () => {
    dispatch(fetchTodos())
  }

  return (
    <div className="main">
      <div className="div-1">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <input
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
            type="text"
            name="todo"
            placeholder="Enter your todo"
            className="input-style"
          />
          <button
            disabled={currentTodo == ""}
            onClick={editedTodo ? handleEditTodo : handleAddTodo}
            className="button-style"
          >
            {editedTodo ? "Edit todo" : "Add todo"}
          </button>
        </div>
        <div className="scroll-div">
          <ul
            style={{
              width: "100%",
              listStyle : "none"
            }}
          >
            {todoList.map((todo) => (
              <li
                key={todo.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                    width: "200px",
                    padding: "10px",
                  }}
                >
                  {todo?.title}
                </p>
                <button
                  className="button-style"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  delete
                </button>
                <button
                  className="button-style"
                  onClick={() => handleUpdateTodo(todo)}
                >
                  Update
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="div-2">
        <div>
          <button className="button-style-2" onClick={handleFetchTodos}>
            Fetch list of todos{" "}
          </button>
        </div>
        <div className="scroll-div">
          <ul
            style={{
              width: "100%",
              padding: "20px",
              fontSize: "20px",
              listStyle: "none"
            }}
          >
            {todoListFormApi.map((todo) => (
              <li key={todo.id} st>
                <p
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    padding: "10px",
                  }}
                  >
                {todo.todo}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Todocomponent
