const form = document.getElementById("gratitude-form");
const nameInput = document.getElementById("name-input");
const gratitudeInput = document.getElementById("gratitude-input");
const wall = document.getElementById("gratitude-wall");

// Load existing messages from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const notes = JSON.parse(localStorage.getItem("gratitudeNotes")) || [];
  notes.forEach(addNoteToWall);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const text = gratitudeInput.value.trim();

  if (name && text) {
    const note = { name, text, timestamp: new Date().toISOString() };
    saveNoteToLocalStorage(note);
    addNoteToWall(note);
    nameInput.value = "";
    gratitudeInput.value = "";
  }
});

function saveNoteToLocalStorage(note) {
  const notes = JSON.parse(localStorage.getItem("gratitudeNotes")) || [];
  notes.unshift(note); // Add new note to the top
  localStorage.setItem("gratitudeNotes", JSON.stringify(notes));
}

function addNoteToWall(note) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  const textEl = document.createElement("p");
  textEl.textContent = note.text;

  const nameEl = document.createElement("span");
  nameEl.textContent = `— ${note.name}`;
  nameEl.style.display = "block";
  nameEl.style.marginTop = "0.5rem";
  nameEl.style.fontWeight = "bold";
  nameEl.style.color = "#d6336c";

  noteDiv.appendChild(textEl);
  noteDiv.appendChild(nameEl);
  wall.appendChild(noteDiv);
}
