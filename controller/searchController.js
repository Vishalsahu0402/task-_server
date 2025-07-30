import project from '../models/project.js';
import User from '../models/User.js';

export const searchUsersAndProjects = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const regex = new RegExp(query, 'i'); // case-insensitive partial match

    // 🔍 Find users by username
    const users = await User.find({ username: regex }).select('username email role');

    // 🔍 Find projects by title
    const projects = await project.find({ title: regex }).populate('user', 'username');

    res.json({ users, projects });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
