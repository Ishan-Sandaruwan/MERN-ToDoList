import { useEffect, useState } from "react";
import Create from "./assets/Create";
import axios from "axios";

function Home() {
  const endpoint = "http://localhost:3000/";
  const [todos, SetTodos] = useState([]);

  useEffect(() => {
    fetchToDos();
  }, []);

  function fetchToDos() {
    axios
      .get(endpoint)
      .then(function (response) {
        console.log(response.data);
        SetTodos(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleClick(id) {
    axios
      .put(endpoint + id)
      .then(function (response) {
        console.log(response);
        fetchToDos();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function handleDel(id) {
    axios
      .delete(endpoint + id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          fetchToDos();
        } else {
          console.log("Failed to delete todo with ID:", id);
        }
      })
      .catch((err) => {
        console.log("Error deleting todo with ID:", id, err);
      });
  }
  

  return (
    <div className="home">
      <h2>To Do List</h2>
      <Create onAdd={fetchToDos} />
      <div className="task-con">
        {todos.length === 0 ? (
          <p>No Records Yet. Add Items</p>
        ) : (
          todos.map((todo) => {
            return (
              <div key={todo._id} className="task">
                {todo.done === true ? <p>completed</p> : <p>New</p>}
                <div
                  onClick={() => {
                    handleClick(todo._id);
                  }}
                >
                  {todo.task}
                </div>
                <button
                  onClick={() => {
                    handleDel(todo._id);
                  }}
                >
                  delete
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Home;
