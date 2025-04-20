console.log("Memory page loaded.");

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCGVzYGsjueoZUri_7_Ahfmtt22CWiAxG0",
  authDomain: "hv14-b967f.firebaseapp.com",
  projectId: "hv14-b967f",
  storageBucket: "hv14-b967f.appspot.com",
  messagingSenderId: "866538586375",
  appId: "1:866538586375:web:6af88deeb3ee83536385a2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const memoriesRef = db.collection("memories");

// Convert file to base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

// Add memory to Firestore
async function addMemory() {
  const imageFile = document.getElementById("imageFile").files[0];
  const title = document.getElementById("memoryTitle").value.trim();
  const description = document.getElementById("memoryDesc").value.trim();

  if (!imageFile || !title || !description) {
    alert("Please fill all fields and select an image.");
    return;
  }

  try {
    console.log("Converting image to base64...");
    const base64Image = await toBase64(imageFile);
    console.log("Base64 conversion complete.");

    await memoriesRef.add({
      title,
      description,
      imageBase64: base64Image,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    document.getElementById("imageFile").value = "";
    document.getElementById("memoryTitle").value = "";
    document.getElementById("memoryDesc").value = "";

    alert("Memory added successfully!");
  } catch (error) {
    console.error("Error adding memory:", error);
    alert("Something went wrong while saving the memory.");
  }
}

// Delete a memory
function deleteMemory(docId) {
  if (confirm("Are you sure you want to delete this memory?")) {
    memoriesRef.doc(docId).delete()
      .then(() => {
        console.log("Memory deleted:", docId);
      })
      .catch((error) => {
        console.error("Error deleting memory:", error);
        alert("Failed to delete memory.");
      });
  }
}

// Create a memory card element
function createMemoryCard(data, docId) {
  const { title, description, imageBase64 } = data;

  const card = document.createElement("div");
  card.classList.add("memory-card");

  const img = document.createElement("img");
  img.src = imageBase64;
  img.alt = title;

  const t = document.createElement("h3");
  t.textContent = title;

  const d = document.createElement("p");
  d.textContent = description;

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = () => deleteMemory(docId);

  card.appendChild(img);
  card.appendChild(t);
  card.appendChild(d);
  card.appendChild(delBtn);

  return card;
}

// Load all memories from Firestore
function loadMemories() {
  const container = document.getElementById("memoryContainer");
  if (!container) {
    console.error("Memory container not found!");
    return;
  }

  memoriesRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
    container.innerHTML = "";

    snapshot.forEach(doc => {
      const memoryData = doc.data();
      const docId = doc.id;
      const card = createMemoryCard(memoryData, docId);
      container.appendChild(card);
    });
  }, error => {
    console.error("Snapshot error:", error);
  });
}

// Load memories on page load
window.addEventListener("DOMContentLoaded", () => {
  loadMemories();
});
