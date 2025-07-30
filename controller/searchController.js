import project from '../models/Project.js';
import User from '../models/User.js';


export const searchUsersOrProjects = async (req, res) => {
  const query = req.query.q?.trim();

  if (!query) {
    return res.status(400).json({ error: "Search query (q) is required" });
  }

  try {
    
    const users = await User.find({
      username: { $regex: query, $options: 'i' }
    }).select('-password');

    const projects = await project.find({
      title: { $regex: query, $options: 'i' }
    }).populate('user', 'name email');

    return res.status(200).json({ users, projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Search failed' });
  }
};
