const express = require('express');
const router = express.Router();
const { saveWorkout } = require('../models/workoutModel');

router.post('/', (req, res) => {
    const { title, notes, sets } = req.body;

    if (!title || !Array.isArray(sets)) {
        return res.status(400).json({ error: 'Invalid data' });
    }

    saveWorkout({ title, notes: notes || '', sets }, (err, result) => {
        if (err) {
            console.error('Failed to save workout:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ success: true, workoutId: result.workoutId });
    });
});

module.exports = router;
