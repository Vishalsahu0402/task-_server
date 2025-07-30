import comment from "../models/comment.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { projectId } = req.params;

    if (!text) return res.status(400).json({ error: 'Comment text is required' });

    const newComment = new comment({
      text,
      project: projectId,
      user: req.user._id
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment added', comment: newComment });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
