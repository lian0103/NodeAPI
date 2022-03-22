const db = require('../config/db');

class Post {
  constructor(title, body) {
    this.title = title;
    this.body = body;
  }

  save() {
    let date = new Date();
    let created_at = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;

    let sql = `
            INSERT INTO posts(
                title,
                body,
                created_at
            )
            VALUES(
                '${this.title}',
                '${this.body}',
                '${created_at}'
            )
        
        `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = `
        select * from posts
      `;

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `
        SELECT * FROM posts WHERE id = ${id}
      `;

    return db.execute(sql);
  }
}

module.exports = Post;
