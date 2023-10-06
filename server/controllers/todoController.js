const ToDoModel = require("../Models/ToDo");

// save_todo , getAll_todos , updateStatus , deleteTodo

const save_todo = async (req, res) => {
  console.log(req.body);
  try {
    const todo = new ToDoModel({
      task: req.body.task,
    });
    const result = await todo.save();
    res.json(result);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const getAll_todos = async (req, res) => {
  try {
    const result = await ToDoModel.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
};

const updateStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ToDoModel.findByIdAndUpdate(
      id,
      { done: true },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await ToDoModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  save_todo,
  getAll_todos,
  updateStatus,
  deleteTodo,
};
