const express = require("express");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.post("/", todoController.save_todo);
router.get("/", todoController.getAll_todos);
router.put("/:id", todoController.updateStatus);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
