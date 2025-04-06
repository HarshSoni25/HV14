// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// TODO: Replace with your own Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGVzYGsjueoZUri_7_Ahfmtt22CWiAxG0",
  authDomain: "hv14-b967f.firebaseapp.com",
  projectId: "hv14-b967f",
  storageBucket: "hv14-b967f.firebasestorage.app",
  messagingSenderId: "866538586375",
  appId: "1:866538586375:web:6af88deeb3ee83536385a2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Reference to messages collection
const messagesRef = collection(db, "messages");

// Form
const form = document.getElementById("chat-form");
const messageInput = document.getElementById("message");
const messagesDiv = document.getElementById("messages");

// Send Message
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = messageInput.value.trim();
  if (text !== "") {
    await addDoc(messagesRef, {
      text,
      createdAt: serverTimestamp()
    });
    messageInput.value = "";
  }
});

// Listen for new messages
onSnapshot(messagesRef, (snapshot) => {
  messagesDiv.innerHTML = "";
  snapshot.docs
    .sort((a, b) => a.data().createdAt?.seconds - b.data().createdAt?.seconds)
    .forEach((doc) => {
      const p = document.createElement("p");
      p.textContent = doc.data().text;
      messagesDiv.appendChild(p);
    });
});
