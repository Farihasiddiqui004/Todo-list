import React, { useReducer, useMemo, useCallback } from "react";
import "./Todos.css";

const initialTodos = [
  {
    id: 1,
    title: "Buy groceries",
    complete: false,
  },
  {
    id: 2,
    title: "pray",
    complete: false,
  },
  {
    id: 3,
    title: "Clean the house",
    complete: false,
  },
  {
    id: 4,
    title: "Finish project report",
    complete: false,
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), title: action.title, complete: false }];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, complete: !todo.complete } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const useExpensiveCalculation = (todos) => {
  return useMemo(() => {
    console.log("Calculating completed todos...");
    return todos.filter((todo) => todo.complete).length;
  }, [todos]);
};

function Todos() {
  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const addTodo = useCallback(() => {
    const title = prompt("Enter a new task:");
    if (title) {
      dispatch({ type: "ADD_TODO", title });
    }
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODO", id });
  }, []);

  const deleteTodo = useCallback((id) => {
    dispatch({ type: "DELETE_TODO", id });
  }, []);

  const completedCount = useExpensiveCalculation(todos);

  return (
    <div>
      <h1>Daily Tasks Tracker</h1>
      <button onClick={addTodo}>Add Task</button>
      <h3>Completed Tasks: {completedCount}</h3>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "10px" }}>
            <label>
              <input
                type="checkbox"
                checked={todo.complete}
                onChange={() => toggleTodo(todo.id)}
              />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)} style={{ marginLeft: "10px" }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;