const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Middleware
app.use(cors({
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS']
}));
app.use(express.json());

// Add a test endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Create subscriber endpoint
app.post('/api/subscribe', async (req, res) => {
    try {
        const { email } = req.body;
        console.log('Received email:', email);

        const query = 'INSERT INTO subscribers (email) VALUES ($1) RETURNING *';
        const values = [email];
        
        console.log('Executing query...');
        const result = await pool.query(query, values);
        console.log('Query result:', result.rows[0]);

        res.json({ success: true, subscriber: result.rows[0] });
    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Add error handling
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
    console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
}); 