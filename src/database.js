const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); 

db.serialize(() => {

  db.run(`
    CREATE TABLE news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
