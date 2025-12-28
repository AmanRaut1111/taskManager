const express = require("express");
const Task = require("../models/Task");
const userAuth = require("../middleware/userAuth");

const taskRouter = express.Router();

taskRouter.post("/create", userAuth, async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required...!",
        status: false,
        statusCode: 400,
      });
    }

    const task = new Task({
      title,
      description,
      priority,
      status,
      userId: req.user.userId,
    });

    const data = await task.save();

    res.status(201).json({
      message: "Task Created Successfully...!",
      status: true,
      statusCode: 201,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});

taskRouter.get("/filter", userAuth, async (req, res) => {
  try {
    const {
      status,
      priority,
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const filter = { userId: req.user.userId };
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const tasks = await Task.find(filter)
      .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      message: "Tasks Fetched Successfully...!",
      status: true,
      statusCode: 200,
      total: tasks.length,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});

taskRouter.get("/get/:id", userAuth, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found...!",
        status: false,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Task Fetched Successfully...!",
      status: true,
      statusCode: 200,
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});

taskRouter.put("/update/:id", userAuth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      req.body,
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task Not Found...!",
        status: false,
        statusCode: 404,
      });
    }

    res.status(200).json({
      message: "Task Updated Successfully...!",
      status: true,
      statusCode: 200,
      data: task,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      status: false,
      statusCode: 500,
    });
  }
});

taskRouter.delete("/delete/:id", userAuth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task Not Found...!",
        status: false,
        statusCode: 404,
      });
    }
    res.status(200).json({
      message: "Task Deleted Successfully...!",
      status: true,
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",

      status: false,
      statusCode: 500,
    });
  }
});

module.exports = taskRouter;
