import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyCGVzYGsjueoZUri_7_Ahfmtt22CWiAxG0",
  authDomain: "hv14-b967f.firebaseapp.com",
  projectId: "hv14-b967f",
  storageBucket: "hv14-b967f.appspot.com",
  messagingSenderId: "866538586375",
  appId: "1:866538586375:web:6af88deeb3ee83536385a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const gratitudeRef = collection(db, "gratitude");

const form = document.getElementById("gratitude-form");
const input = document.getElementById("gratitude-input");
const wall = document.getElementById("gratitude-wall");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    await addDoc(gratitudeRef, {
      text,
      createdAt: serverTimestamp()
    });
    input.value = "";
  }
});

const q = query(gratitudeRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  wall.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    const note = document.createElement("div");
    note.classList.add("note");
    note.textContent = data.text;
    wall.appendChild(note);
  });
});
