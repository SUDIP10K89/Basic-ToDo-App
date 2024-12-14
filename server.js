const express = require("express");
const mongoose = require("mongoose");
const Task = require("./models/Task");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;
const MONGO_URI = "mongodb://127.0.0.1:27017/todoDB";

//MongoDb Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("mongodb Connected");
  })
  .catch((err) => console.log(err));

//Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

////Testing Task.js mongoose model
// app.post("/test-task",async (req,res) => {
//     const testTask = new Task ({title:"Sample Task"});
//     await testTask.save();
//     res.json(testTask);
// })

//Route to create new task
app.post("/tasks", async (req, res) => {
  try {
    const { title } = req.body;
    const newTask = new Task({ title });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Failed to create task" });
  }
});
//Route to get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});
//Route to update task
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const { isCompleted } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { isCompleted },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
});
//Route to delete a task
app.delete("/tasks/:id",async (req,res) => {
    try {
        const {id} = req.params;
        await Task.findByIdAndDelete(id);
        res.status(200).json({message:"Task deleted successfully"});
    } catch (error) {
        return res.status(500).json({error:"Failed to delete task"});
    }
})

app.listen(PORT, () => {
  console.log("Server started on 5000");
});
