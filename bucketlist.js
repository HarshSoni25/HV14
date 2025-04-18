import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, updateDoc, doc
} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// Firebase config
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
const bucketRef = collection(db, "bucketList");

const form = document.getElementById("bucket-form");
const usernameInput = document.getElementById("username");
const itemInput = document.getElementById("item");
const bucketItemsDiv = document.getElementById("bucket-items");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const item = itemInput.value.trim();

  if (username && item) {
    await addDoc(bucketRef, {
      username,
      item,
      completed: false,
      createdAt: serverTimestamp()
    });
    itemInput.value = "";
  }
});

const q = query(bucketRef, orderBy("createdAt"));

onSnapshot(q, (snapshot) => {
  bucketItemsDiv.innerHTML = "";
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();

    const itemDiv = document.createElement("div");
    itemDiv.className = "bucket-item";
    if (data.completed) itemDiv.classList.add("completed");

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = `${data.username} — ${data.item}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.checked = data.completed;

    checkbox.addEventListener("change", async () => {
      const docRef = doc(db, "bucketList", docSnap.id);
      await updateDoc(docRef, { completed: checkbox.checked });
    });

    itemDiv.appendChild(meta);
    itemDiv.appendChild(checkbox);
    bucketItemsDiv.appendChild(itemDiv);
  });

  bucketItemsDiv.scrollTop = bucketItemsDiv.scrollHeight;
});
