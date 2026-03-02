const Minio = require('minio');
const config = require('./index');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: config.minio.port,
  useSSL: false,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

async function ensureBucket() {
  const exists = await minioClient.bucketExists(config.minio.bucket);

  if (!exists) {
    await minioClient.makeBucket(config.minio.bucket);
    console.log(`Bucket ${config.minio.bucket} created`);
  }
}

module.exports = {
  minioClient,
  ensureBucket
};