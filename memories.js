// memories.js

// Firebase already initialized via module or compat mode (ensure not duplicated)

const storage = firebase.storage();
const db = firebase.firestore();
const memoriesRef = db.collection("memories");

async function addMemory() {
    const imageFile = document.getElementById("imageFile").files[0];
    const title = document.getElementById("memoryTitle").value.trim();
    const description = document.getElementById("memoryDesc").value.trim();
  
    if (!imageFile || !title || !description) {
      alert("Please fill all fields and choose an image.");
      return;
    }
  
    try {
      console.log("Uploading file...");
      const storageRef = firebase.storage().ref(`memories/${Date.now()}_${imageFile.name}`);
      await storageRef.put(imageFile);
      console.log("File uploaded successfully.");
  
      const imageUrl = await storageRef.getDownloadURL();
      console.log("Download URL:", imageUrl);
  
      console.log("Saving to Firestore...");
      await firebase.firestore().collection("memories").add({
        title,
        description,
        imageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      console.log("Memory added to Firestore.");
  
      // Clear form
      document.getElementById("imageFile").value = "";
      document.getElementById("memoryTitle").value = "";
      document.getElementById("memoryDesc").value = "";
      alert("Memory added!");
    } catch (error) {
      console.error("🔥 Error details:", error);
      alert("Something went wrong: " + error.message);
    }
  }
  

// Display all memories
memoriesRef.orderBy("createdAt", "desc").onSnapshot(snapshot => {
  const container = document.getElementById("memoryContainer");
  container.innerHTML = "";

  snapshot.forEach(doc => {
    const data = doc.data();
    const card = document.createElement("div");
    card.classList.add("memory-card");

    const img = document.createElement("img");
    img.src = data.imageUrl;

    const title = document.createElement("h3");
    title.textContent = data.title;

    const desc = document.createElement("p");
    desc.textContent = data.description;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(desc);
    container.appendChild(card);
  });
});
