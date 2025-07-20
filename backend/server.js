const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const PDFDocument = require('pdfkit');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite DB setup
const db = new sqlite3.Database('students.sqlite', (err) => {
  if (err) return console.error(err.message);
  console.log('📦 Connected to SQLite database');
});

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      roll_number TEXT NOT NULL,
      subject TEXT NOT NULL,
      marks INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Routes

// Add student
app.post('/api/students', (req, res) => {
  const { name, roll_number, subject, marks } = req.body;
  if (!name || !roll_number || !subject || isNaN(marks)) {
    return res.status(400).json({ error: 'All fields required. Marks must be numeric.' });
  }

  const sql = `INSERT INTO students (name, roll_number, subject, marks) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, roll_number, subject, marks], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Student added successfully' });
  });
});

// Get all students
app.get('/api/students', (req, res) => {
  db.all(`SELECT * FROM students ORDER BY created_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Download PDF
app.get('/api/students/pdf', (req, res) => {
  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=students.pdf');
  doc.pipe(res);

  doc.fontSize(20).text('Student Marks Report\n\n');

  db.all(`SELECT * FROM students ORDER BY marks DESC`, [], (err, rows) => {
    if (err) {
      doc.fontSize(14).text('Error generating PDF.');
      doc.end();
      return;
    }

    rows.forEach((s, i) => {
      doc.fontSize(12).text(
        `${i + 1}. ${s.name} | Roll: ${s.roll_number} | Subject: ${s.subject} | Marks: ${s.marks}`
      );
    });

    doc.end();
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
