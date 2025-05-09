
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes placeholder
const workoutsRouter = require('./routes/workouts');
app.use('/api/workouts', workoutsRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
