import Task from '../models/Task.js';

// @desc    Get all tasks for user
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
    try {
      const tasks = await Task.find({ userId: req.user.id });
  
      const priorityOrder = { high: 1, medium: 2, low: 3 };
  
      tasks.sort((a, b) => {
        const pA = priorityOrder[a.priority] ?? 99;
        const pB = priorityOrder[b.priority] ?? 99;
  
        if (pA !== pB) return pA - pB;              
        return b.createdAt - a.createdAt;         
      });

      res.json(tasks);
    } catch (err) {
      next(err);
    }
  };

export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({
      userId: req.user.id,
      title,
      description,
      priority
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Update task (toggle, edit)
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task removed', id: req.params.id });
  } catch (err) {
    next(err);
  }
};
