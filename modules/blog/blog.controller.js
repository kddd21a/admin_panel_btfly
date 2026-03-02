const service = require('./blog.service');

class BlogController {
  async list(req, res) {
    const posts = await service.getAll();
    res.json(posts);
  }

  async create(req, res) {
    if (!req.file) {
      return res.status(400).json({ message: 'File required' });
    }

    const post = await service.create(req.body, req.file);
    res.status(201).json(post);
  }
}

module.exports = new BlogController();