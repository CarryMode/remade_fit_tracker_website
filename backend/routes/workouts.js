const express = require('express');
const router = express.Router();
const { saveWorkout } = require('../models/workoutModel');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// POST /api/workouts — Save a workout
router.post('/', (req, res) => {
    const { title, notes, sets } = req.body;

    if (!title || !Array.isArray(sets)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    const userId = req.session.userId;
    saveWorkout({ title, notes: notes || '', sets, userId }, (err, result) => {
        if (err) {
            console.error('Failed to save workout:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ success: true, workoutId: result.workoutId });
    });
});

// GET /api/workouts — Return all workouts for the logged-in user
router.get('/', (req, res) => {
    const userId = req.session.userId;

    const dbPath = path.join(__dirname, '../db/database.sqlite');
    const db = new sqlite3.Database(dbPath);

    db.all(
        `SELECT id, title, date_created FROM workouts WHERE user_id = ? ORDER BY date_created DESC`,
        [userId],
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.json(rows);
        }
    );
});

module.exports = router;




// GET /api/workouts/:id/sets — Get sets for a workout
router.get('/:id/sets', (req, res) => {
    const workoutId = req.params.id;

    const dbPath = path.join(__dirname, '../db/database.sqlite');
    const db = new sqlite3.Database(dbPath);

    db.all(
        `SELECT exercise, weight, reps, set_number
         FROM sets
         WHERE workout_id = ?
         ORDER BY set_number ASC`,
        [workoutId],
        (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Failed to load sets' });
            }
            res.json(rows);
        }
    );
});


