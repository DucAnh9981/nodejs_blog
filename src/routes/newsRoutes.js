const express = require('express');
const router = express.Router();
const db = require('../database');

// Tạo tin tức (Create)
router.post('/news', (req, res) => {
  const { title, content } = req.body;
  db.run(`INSERT INTO news (title, content) VALUES (?, ?)`, [title, content], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

// Lấy danh sách tin tức (Read)
router.get('/news', (req, res) => {
  db.all(`SELECT * FROM news`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Lấy tin tức theo ID (Read one)
router.get('/news/:id', (req, res) => {
  const id = req.params.id;
  db.get(`SELECT * FROM news WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(row);
  });
});

// Cập nhật tin tức (Update)
router.put('/news/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  db.run(`UPDATE news SET title = ?, content = ? WHERE id = ?`, [title, content, id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'News updated successfully' });
  });
});

// Xóa tin tức (Delete)
router.delete('/news/:id', (req, res) => {
  const id = req.params.id;
  db.run(`DELETE FROM news WHERE id = ?`, [id], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'News deleted successfully' });
  });
});

module.exports = router;
