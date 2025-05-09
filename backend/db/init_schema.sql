
CREATE TABLE IF NOT EXISTS workouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    notes TEXT,
    date_created TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workout_id INTEGER,
    exercise TEXT NOT NULL,
    weight INTEGER,
    reps INTEGER,
    set_number INTEGER,
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);
