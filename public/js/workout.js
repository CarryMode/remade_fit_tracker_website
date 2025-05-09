document.addEventListener('DOMContentLoaded', () => {
    const addExerciseBtn = document.getElementById('add-exercise');
    const exerciseSelect = document.getElementById('exercise');
    const workoutLog = document.getElementById('workout-log');

    addExerciseBtn.addEventListener('click', () => {
        const exerciseName = exerciseSelect.value;
        const safeId = `exercise-${exerciseName.replace(/\s+/g, '-')}`;

        if (document.getElementById(safeId)) return;

        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-block';
        exerciseDiv.id = safeId;

        exerciseDiv.innerHTML = `
            <h4>${exerciseName}</h4>
            <div class="set-list"></div>
            <button class="add-set-btn">+ Add Set</button>
        `;

        workoutLog.appendChild(exerciseDiv);

        const setList = exerciseDiv.querySelector('.set-list');
        const addSetBtn = exerciseDiv.querySelector('.add-set-btn');

        addSetBtn.addEventListener('click', () => {
            const setCount = setList.children.length + 1;

            const setContainer = document.createElement('div');
            setContainer.className = 'set-row';

            const setLabel = document.createElement('span');
            setLabel.textContent = `Set ${setCount}`;

            const weightInput = document.createElement('input');
            weightInput.type = 'number';
            weightInput.placeholder = 'kg';
            weightInput.className = 'set-weight';
            weightInput.min = 0;

            const repsInput = document.createElement('input');
            repsInput.type = 'number';
            repsInput.placeholder = 'reps';
            repsInput.className = 'set-reps';
            repsInput.min = 1;

            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = '✔️';
            confirmBtn.style.backgroundColor = '#28a745';
            confirmBtn.onclick = () => {
                if (weightInput.value && repsInput.value) {
                    weightInput.disabled = true;
                    repsInput.disabled = true;
                    confirmBtn.disabled = true;
                    confirmBtn.style.opacity = '0.6';
                }
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '🗑️';
            deleteBtn.style.backgroundColor = '#dc3545';
            deleteBtn.onclick = () => setContainer.remove();

            setContainer.appendChild(setLabel);
            setContainer.appendChild(weightInput);
            setContainer.appendChild(repsInput);
            setContainer.appendChild(confirmBtn);
            setContainer.appendChild(deleteBtn);

            setList.appendChild(setContainer);
        });
    });
});
