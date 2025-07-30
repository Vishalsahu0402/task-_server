import project from "../models/Project.js";

import Comment from '../models/comment.js';
import User from '../models/User.js';

export const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveLink } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const newProject = new project({
      title,
      description,
      githubLink,
      liveLink,
      user: req.user._id
    });

    await newProject.save();

    res.status(201).json({ message: 'Project created successfully', project: newProject });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// 🔍 Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await project.find()
      .populate('user', 'username email')
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔍 Get single project with comments
export const getProjectWithComments = async (req, res) => {
  try {
    const project = await project.findById(req.params.id).populate('user', 'username');
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const comments = await Comment.find({ project: project._id })
      .populate('user', 'username')
      .sort({ createdAt: -1 });

    res.json({ project, comments });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
