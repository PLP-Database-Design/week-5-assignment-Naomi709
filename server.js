const express = require('express')
// const app = express()


// Question 1 goes here


// Question 2 goes here


// Question 3 goes here


// Question 4 goes here



// listen to the server
// const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})

DB_USERNAME=root
DB_HOST=localhost
DB_PASSWORD=your_password
DB_NAME=hospital_db

// server.js
const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Configure MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Question 1: Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, second_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching patients:', err.message);
      res.status(500).json({ error: 'Failed to retrieve patients' });
    } else {
      res.json(results);
    }
  });
});

// Question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, second_name, provider_specialty FROM providers';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching providers:', err.message);
      res.status(500).json({ error: 'Failed to retrieve providers' });
    } else {
      res.json(results);
    }
  });
});

// Question 3: Filter patients by first name
app.get('/patients/:firstName', (req, res) => {
  const { firstName } = req.params;
  const query = 'SELECT patient_id, first_name, second_name, date_of_birth FROM patients WHERE first_name = ?';
  db.query(query, [firstName], (err, results) => {
    if (err) {
      console.error('Error fetching patients by name:', err.message);
      res.status(500).json({ error: 'Failed to retrieve patients by name' });
    } else {
      res.json(results);
    }
  });
});

// Question 4: Retrieve all providers by specialty
app.get('/providers/specialty/:specialty', (req, res) => {
  const { specialty } = req.params;
  const query = 'SELECT first_name, second_name, provider_specialty FROM providers WHERE provider_specialty = ?';
  db.query(query, [specialty], (err, results) => {
    if (err) {
      console.error('Error fetching providers by specialty:', err.message);
      res.status(500).json({ error: 'Failed to retrieve providers by specialty' });
    } else {
      res.json(results);
    }
  });
});

// Listen to the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
