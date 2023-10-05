const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoModel = require("./Models/ToDo");
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/mernTodoList", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.post("/", async (req, res) => {
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
});

app.get("/", async (req, res) => {
  try {
    const result = await ToDoModel.find({});
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.put("/:id", async (req, res) => {
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
});

app.delete("/:id",async (req,res)=>{
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
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
