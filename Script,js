document.addEventListener('DOMContentLoaded', () => {
    const addSection = document.getElementById('add-section');
    const viewSection = document.getElementById('view-section');
    const noteInput = document.getElementById('note-input');
    const addButton = document.getElementById('add-button');
    const viewButton = document.getElementById('view-button');
    const backButton = document.getElementById('back-button');
    const resetButton = document.getElementById('reset-button');
    const resetButtonView = document.getElementById('reset-button-view');
    const notesList = document.getElementById('notes-list');

    const STORAGE_KEY = 'basketballWorkouts';

    function getNotes() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }

    function saveNotes(notes) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }

    function renderNotes() {
        notesList.innerHTML = '';
        const notes = getNotes();
        notes.forEach((note, index) => {
            const li = document.createElement('li');
            li.textContent = note.text;
            if (note.finished) {
                li.classList.add('finished');
            }
            li.addEventListener('click', () => {
                notes[index].finished = !notes[index].finished;
                saveNotes(notes);
                renderNotes();
            });
            notesList.appendChild(li);
        });
    }

    addButton.addEventListener('click', () => {
        const text = noteInput.value.trim();
        if (text) {
            const notes = getNotes();
            notes.push({ text, finished: false });
            saveNotes(notes);
            noteInput.value = '';
            alert('Note added!');
        }
    });

    viewButton.addEventListener('click', () => {
        addSection.style.display = 'none';
        viewSection.style.display = 'block';
        renderNotes();
    });

    backButton.addEventListener('click', () => {
        viewSection.style.display = 'none';
        addSection.style.display = 'block';
    });

    resetButton.addEventListener('click', reset);
    resetButtonView.addEventListener('click', reset);

    function reset() {
        if (confirm('Are you sure you want to reset all notes?')) {
            localStorage.removeItem(STORAGE_KEY);
            renderNotes();
            alert('All notes reset!');
        }
    }
});
