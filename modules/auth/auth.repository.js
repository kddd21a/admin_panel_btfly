const db = require('../../config/db');

class AuthRepository {
  async findByEmail(email) {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return rows[0];
  }

  async create(email, password) {
    const { rows } = await db.query(
      `INSERT INTO users (email, password)
       VALUES ($1, $2)
       RETURNING id, email, created_at`,
      [email, password]
    );
    return rows[0];
  }
}

module.exports = new AuthRepository();