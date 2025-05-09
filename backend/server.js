const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// ✅ Enable sessions first!
app.use(
    session({
        secret: 'super-secret-key', // DONT FORGET TO CHANGE THIS
        resave: false,
        saveUninitialized: false
    })
);

//  Block access unless user is logged in
app.use((req, res, next) => {
    const openPaths = ['/login.html', '/api/login', '/api/register'];
    const isStatic = req.path.startsWith('/css') || req.path.startsWith('/js');

    if (openPaths.includes(req.path) || isStatic || req.session.userId) {
        return next();
    }

    res.redirect('/login.html');
});

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Routes
const authRoutes = require('./routes/auth');
const workoutsRoutes = require('./routes/workouts');

app.use('/api', authRoutes);
app.use('/api/workouts', (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: 'Not logged in' });
    }
    next();
}, workoutsRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
