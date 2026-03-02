const app = require('./app');
const { app: config } = require('./config');
const { ensureBucket } = require('./config/minio');

async function start() {
  await ensureBucket();

  app.listen(config.port, () => {
    console.log(`🚀 Server running on port ${config.port}`);
  });
}

start();