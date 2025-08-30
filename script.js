document.addEventListener('DOMContentLoaded', () => {
    const addSection = document.getElementById('add-section');
    const viewSection = document.getElementById('view-section');
    const modal = document.getElementById('modal');
    const modalTitleDisplay = document.getElementById('modal-title-display');
    const modalTitleEdit = document.getElementById('modal-title-edit');
    const modalTextDisplay = document.getElementById('modal-text-display');
    const modalTextEdit = document.getElementById('modal-text-edit');
    const modalStatus = document.getElementById('modal-status');
    const toggleFinished = document.getElementById('toggle-finished');
    const editButton = document.getElementById('edit-button');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');
    const closeModal = document.getElementById('close-modal');
    const titleInput = document.getElementById('title-input');
    const noteInput = document.getElementById('note-input');
    const addButton = document.getElementById('add-button');
    const viewButton = document.getElementById('view-button');
    const backButton = document.getElementById('back-button');
    const resetButton = document.getElementById('reset-button');
    const resetButtonView = document.getElementById('reset-button-view');
    const notesList = document.getElementById('notes-list');

    const STORAGE_KEY = 'basketballWorkouts';

    let currentIndex = -1;
    let isEditing = false;

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
            li.textContent = note.title;
            if (note.finished) {
                li.classList.add('finished');
            }
            li.addEventListener('click', () => showDetail(index));
            notesList.appendChild(li);
        });
    }

    function showDetail(index) {
        const notes = getNotes();
        const note = notes[index];
        currentIndex = index;
        modalTitleDisplay.textContent = note.title;
        modalTitleEdit.value = note.title;
        modalTextDisplay.textContent = note.text;
        modalTextEdit.value = note.text;
        modalStatus.textContent = note.finished ? 'Status: Finished' : 'Status: Not Finished';
        toggleFinished.textContent = note.finished ? 'Mark as Unfinished' : 'Mark as Finished';
        setEditMode(false);
        modal.style.display = 'block';
    }

    function setEditMode(editing) {
        isEditing = editing;
        if (editing) {
            modalTitleDisplay.style.display = 'none';
            modalTitleEdit.style.display = 'block';
            modalTextDisplay.style.display = 'none';
            modalTextEdit.style.display = 'block';
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            cancelButton.style.display = 'inline-block';
        } else {
            modalTitleDisplay.style.display = 'block';
            modalTitleEdit.style.display = 'none';
            modalTextDisplay.style.display = 'block';
            modalTextEdit.style.display = 'none';
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
        }
    }

    addButton.addEventListener('click', () => {
        const title = titleInput.value.trim();
        const text = noteInput.value.trim();
        if (title && text) {
            const notes = getNotes();
            notes.push({ title, text, finished: false });
            saveNotes(notes);
            titleInput.value = '';
            noteInput.value = '';
            alert('Note added!');
        } else {
            alert('Please enter both title and note content.');
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

    toggleFinished.addEventListener('click', () => {
        if (currentIndex !== -1 && !isEditing) {
            const notes = getNotes();
            notes[currentIndex].finished = !notes[currentIndex].finished;
            saveNotes(notes);
            showDetail(currentIndex); // Refresh modal
            renderNotes(); // Refresh list
        }
    });

    editButton.addEventListener('click', () => {
        setEditMode(true);
    });

    saveButton.addEventListener('click', () => {
        if (currentIndex !== -1) {
            const notes = getNotes();
            const newTitle = modalTitleEdit.value.trim();
            const newText = modalTextEdit.value.trim();
            if (newTitle && newText) {
                notes[currentIndex].title = newTitle;
                notes[currentIndex].text = newText;
                saveNotes(notes);
                showDetail(currentIndex); // Refresh modal with new values
                renderNotes(); // Refresh list
            } else {
                alert('Title and content cannot be empty.');
            }
        }
    });

    cancelButton.addEventListener('click', () => {
        if (currentIndex !== -1) {
            showDetail(currentIndex); // Reset to original values
        }
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        currentIndex = -1;
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            currentIndex = -1;
        }
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
