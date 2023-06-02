// controllers/users.js
import { pool } from '../db.js';

export const createUser = (req, res) => {

    // Get user data from the request body
    const { name, message, rating , timestamp} = req.body;

    // Create a new user in the database
    const query = 'INSERT INTO users (name, meassage, rating, timestamp) VALUES (?, ?, ?, ?)';
    const values = [name, sanitizedMessage, sanitizedRating];

    pool.getConnection((err, connection) => {
      if (err) {
        console.error('Error getting database connection:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
      }

      connection.query(query, values, (error, result) => {
        connection.release();

        if (error) {
          console.error('Error creating user:', error);
          return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
          });
        }

        // Return the newly created user
        res.status(201).json({
            status: 'success',
            data: { id: result.insertId, name, message, timestamp }
        });
      });
    });
}