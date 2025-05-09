const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../db/database.sqlite');
const db = new sqlite3.Database(dbPath);

// Save a workout and its sets
function saveWorkout({ title, notes, sets, userId }, callback) {
    db.run(

        `INSERT INTO workouts (title, notes, user_id) VALUES (?, ?, ?)`,
        [title, notes, userId],
        function (err) {
            if (err) return callback(err);

            const workoutId = this.lastID;

            const stmt = db.prepare(
                `INSERT INTO sets (workout_id, exercise, weight, reps, set_number)
                 VALUES (?, ?, ?, ?, ?)`
            );

            sets.forEach((set, index) => {
                stmt.run(workoutId, set.exercise, set.weight, set.reps, index + 1);
            });

            stmt.finalize((err) => {
                callback(err, { workoutId });
            });
        }
    );
}

module.exports = {
    saveWorkout
};
