const db = require('../../config/db');

class BlogRepository {
  async create(data) {
    const { rows } = await db.query(
      `INSERT INTO blog (title, description, img_path)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [data.title, data.description, data.img_path]
    );

    return rows[0];
  }

  async findAll() {
    const { rows } = await db.query(
      `SELECT * FROM blog ORDER BY id DESC`
    );
    return rows;
  }

  async findPost(id){
    const { rows } = await db.query(
	`SELECT * FROM blog WHERE id = $1`, [id]
	);
	return rows;

  }

  async deleteFromdb(id){
   const { rows } = await db.query(
     `DELETE FROM blog WHERE id = $1;`, [id]
   );
   return { ok: true }
  }
}

module.exports = new BlogRepository();
