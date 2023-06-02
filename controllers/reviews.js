// controllers/reviews.js
import { pool } from '../db.js';

// Get all reviews
export const getAllReviews = (req, res) => {
    let sortBy = req.query.sort_by;
    //sorteren van datum of score
    let sortQuery;
    if (sortBy === 'date') {
        sortQuery = 'ORDER BY timestamp DESC';
    } else if (sortBy === 'rating') {
        sortQuery = 'ORDER BY rating DESC';
    } else {
        sortQuery = '';
    }
    pool.query(`SELECT * FROM sql7623226.review ${sortQuery}`, (error, results, fields) => {
        if (error) {
            console.error('Error getting reviews:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        const reviews = results.map(row => ({
            id: row.id,
            name: row.name,
            message: row.message,
            rating: row.rating,
            timestamp: row.timestamp.toISOString().slice(0, 19).replace('T', ' ')
        }));
        res.status(200).json({ status: 'success', data: reviews });
    });
};
// Get a specific review
export const getReview = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM sql7623226.review WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.error('Error getting review:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Cannot find review' });
        }

        const reviews = results.map(row => ({
            id: row.id,
            name: row.name,
            message: row.message,
            rating: row.rating,
            timestamp: row.timestamp.toISOString().slice(0, 19).replace('T', ' ')
        }));
        res.status(200).json({ status: 'success', data: reviews[0]});
    });
};

// Create a new review
export const createReview = (req, res) => {
    const { name, message, rating } = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const values = [name, message, rating, timestamp];
    pool.query('INSERT INTO sql7623226.review (name, message, rating, timestamp) VALUES (?, ?, ?, ?)', values, (error, result) => {
        if (error) {
            console.error('Error creating review:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.status(201).json({ status: 'success', data: { id: result.insertId, name, message, rating, timestamp } });
    });
};

// Update an existing review
export const updateReview = (req, res) => {
    const id = req.params.id;
    const { name, message, rating } = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const values = [name, message, rating, timestamp, id];
    pool.query('UPDATE sql7623226.review SET name = ?, message = ?, rating = ?, timestamp = ? WHERE id = ?', values, (error, result) => {
        if (error) {
            console.error('Error updating review:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Cannot find review' });
        }
        res.status(200).json({ status: 'success', message: 'Review has been updated', tijd : timestamp});
    });
};

// Delete a review
export const deleteReview = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM sql7623226.review WHERE id = ?', [id], (error, result) => {
        if (error) {
            console.error('Error deleting review:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: 'error', message: 'Cannot find review' });
        }
        res.status(200).json({ status: 'success', message: 'Review has been deleted' });
    });
};

// Get alles van het review recipe
export const getAllReviewsRecipe = (req, res) => {
    let sortBy = req.query.sort_by;
    //sorteren van datum of score
    let sortQuery;
    if (sortBy === 'date') {
        sortQuery = 'ORDER BY timestamp DESC';
    } else if (sortBy === 'rating') {
        sortQuery = 'ORDER BY rating DESC';
    } else {
        sortQuery = '';
    }
    pool.query(`SELECT * FROM sql7623226.review_recipe ${sortQuery}`, (error, results, fields) => {
        if (error) {
            console.error('Error getting recipe:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        const recipe = results.map(row => ({
            id: row.id,
            name: row.name,
            message: row.message,
            rating: row.rating,
            recipename: row.recipename,
            url: row.url,
            timestamp: row.timestamp.toISOString().slice(0, 19).replace('T', ' ')
        }));
        res.status(200).json({ status: 'success', data: recipe });
    });
}

// Recipe review met naam, bericht, scoren, recipenaam, afbeelding van recipenaam, tijd
export const createReviewRecipe = (req, res) => {
    const { name, message, rating , recipename, url} = req.body;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const values = [name, message, rating, recipename, url, timestamp];
    pool.query('INSERT INTO sql7623226.review_recipe (name, message, rating, recipename, url, timestamp) VALUES (?, ?, ? , ? , ?, ?)', values, (error, result) => {
        if (error) {
            console.error('Error creating review:', error);
            return res.status(500).json({ status: 'error', message: 'Internal Server Error' });
        }
        res.status(201).json({ status: 'success', data: { id: result.insertId, name, message, rating, recipename, url, timestamp} });
    });
};

