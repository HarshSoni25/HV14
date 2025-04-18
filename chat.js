// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGVzYGsjueoZUri_7_Ahfmtt22CWiAxG0",
  authDomain: "hv14-b967f.firebaseapp.com",
  projectId: "hv14-b967f",
  storageBucket: "hv14-b967f.appspot.com",
  messagingSenderId: "866538586375",
  appId: "1:866538586375:web:6af88deeb3ee83536385a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const messagesRef = collection(db, "messages");

// DOM references
const form = document.getElementById("chat-form");
const usernameInput = document.getElementById("username");
const messageInput = document.getElementById("message");
const messagesDiv = document.getElementById("messages");

// Submit form
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const text = messageInput.value.trim();

  if (username && text) {
    await addDoc(messagesRef, {
      username,
      text,
      createdAt: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// Listen for new messages (fix applied here with ascending order)
const q = query(messagesRef, orderBy("createdAt", "asc"));

onSnapshot(q, (snapshot) => {
  messagesDiv.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (!data.text || !data.username) return;

    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    const meta = document.createElement("span");
    meta.classList.add("meta");

    // Show timestamp if available, else fallback
    let timeStr = "Just now";
    if (data.createdAt?.toDate) {
      const timestamp = data.createdAt.toDate();
      timeStr = timestamp.toLocaleString();
    } else {
      timeStr = new Date().toLocaleString();
    }

    meta.textContent = `${data.username} • ${timeStr}`;

    const text = document.createElement("p");
    text.textContent = data.text;

    messageElement.appendChild(meta);
    messageElement.appendChild(text);
    messagesDiv.appendChild(messageElement);
  });

  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
