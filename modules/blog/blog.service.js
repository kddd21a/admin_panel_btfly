const { v4: uuid } = require('uuid');
const { minioClient } = require('../../config/minio');
const config = require('../../config');
const repo = require('./blog.repository');

class BlogService {
  async create(data, file) {
    const extension = file.originalname.split('.').pop();
    const fileName = `${uuid()}.${extension}`;

    await minioClient.putObject(
      config.minio.bucket,
      fileName,
      file.buffer,
      file.size,
      {
        'Content-Type': file.mimetype
      }
    );

    const fileUrl = `${config.minio.bucketBlog}/${fileName}`;

    return repo.create({
      ...data,
      img_path: fileUrl
    });
  }

  async getAll() {
    return repo.findAll();
  }

  async getPost(id) {
   return repo.findPost();
  }

  async deletePost(id) {
    console.log(id)
    repo.deleteFromdb(id);
    return {
	ok: true
  }
 }
}

module.exports = new BlogService();
