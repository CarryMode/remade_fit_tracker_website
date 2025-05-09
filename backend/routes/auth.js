const express = require('express');
const bcrypt = require('bcrypt');
const { createUser, findUserByUsername } = require('../models/userModel');

const router = express.Router();

// Register
router.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ error: 'Missing fields' });

    findUserByUsername(username, (err, user) => {
        if (user) return res.status(409).json({ error: 'Username already exists' });

        createUser(username, password, (err, newUser) => {
            if (err) return res.status(500).json({ error: 'Database error' });

            req.session.userId = newUser.id;
            res.status(201).json({ success: true });
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    findUserByUsername(username, (err, user) => {
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });

        const match = bcrypt.compareSync(password, user.password_hash);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        req.session.userId = user.id;
        res.json({ success: true });
    });
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

module.exports = router;
