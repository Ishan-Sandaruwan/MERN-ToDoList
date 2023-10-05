import { useState } from "react";
import axios from "axios";

function Create(props) {
  const [task, setTask] = useState("");
  const endpoint = "http://localhost:3000/";
  async function handleAdd() {
    if(task.trim() !== "" ){
        await axios.post(endpoint,{task:task});
        setTask("");
        props.onAdd();
    }
  }
  return (
    <div className="create_form">
      <input
        type="text"
        name="todo"
        id="todo"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}

export default Create;
