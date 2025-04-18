import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const gratitudeRef = ref(db, "gratitudeEntries");

const form = document.getElementById("gratitudeForm");
const wall = document.getElementById("gratitudeWall");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const author = document.getElementById("authorInput").value.trim();
  const message = document.getElementById("gratitudeInput").value.trim();
  if (author && message) {
    push(gratitudeRef, { author, message });
    form.reset();
  }
});

onChildAdded(gratitudeRef, (data) => {
  const entry = data.val();
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `
    <div>${entry.message}</div>
    <div class="author">– ${entry.author}</div>
  `;
  wall.appendChild(note);
});
