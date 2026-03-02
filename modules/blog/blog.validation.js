module.exports = {
  create(req, res, next) {
    const { title, description } = req.body;

    if (!title || typeof title !== 'string') {
      return res.status(400).json({
        message: 'Title is required and must be string'
      });
    }

    if (!description || typeof description !== 'string') {
      return res.status(400).json({
        message: 'Description is required and must be string'
      });
    }

    if (title.length < 3) {
      return res.status(400).json({
        message: 'Title must be at least 3 characters'
      });
    }

    next();
  }
};
