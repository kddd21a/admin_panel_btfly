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

  async delete(req, res){
    if(!req.params){
	return res.status(400).json({ message: 'Nothing to delete' });
    }
	const { id } = req.params;
    	const validatePost = await service.getPost(id);
    if(validatePost.length <= 0){
       return res.status(404).json({ message: 'Nothing to delete', errorCode: 404 })
    }

	const deleted = await service.deletePost(id);
	return res.status(200).json(deleted)

  }
}

module.exports = new BlogController();
