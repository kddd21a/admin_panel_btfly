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

    const fileUrl = `http://${config.minio.endPoint}:${config.minio.port}/${config.minio.bucket}/${fileName}`;

    return repo.create({
      ...data,
      img_path: fileUrl
    });
  }

  async getAll() {
    return repo.findAll();
  }
}

module.exports = new BlogService();