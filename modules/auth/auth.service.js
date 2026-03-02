const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const repo = require('./auth.repository');

class AuthService {
  async register(email, password) {
    const exists = await repo.findByEmail(email);
    if (exists) {
      const err = new Error('User already exists');
      err.status = 400;
      throw err;
    }

    const hash = await bcrypt.hash(password, 10);
    return repo.create(email, hash);
  }

  async login(email, password) {
    const user = await repo.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: config.jwt.expiresIn }
    );

    return { token };
  }
}

module.exports = new AuthService();