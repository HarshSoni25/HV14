// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCGVzYGsjueoZUri_7_Ahfmtt22CWiAxG0",
    authDomain: "hv14-b967f.firebaseapp.com",
    projectId: "hv14-b967f",
    storageBucket: "hv14-b967f.appspot.com",
    messagingSenderId: "866538586375",
    appId: "1:866538586375:web:6af88deeb3ee83536385a2"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const aboutRef = db.collection("aboutPhotos");
  
  // Convert image file to base64
  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  }
  
  // Save image to Firestore and show preview
  async function handleImageUpload(input, personKey) {
    const file = input.files[0];
    if (!file) return;
  
    try {
      const base64 = await toBase64(file);
      await aboutRef.doc(personKey).set({ imageBase64: base64 });
  
      document.getElementById(`preview-${personKey}`).src = base64;
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  }
  
  // Load images from Firestore on page load
  async function loadAboutPhotos() {
    try {
      const harshDoc = await aboutRef.doc("harsh").get();
      if (harshDoc.exists) {
        document.getElementById("preview-harsh").src = harshDoc.data().imageBase64;
      }
  
      const viniDoc = await aboutRef.doc("vini").get();
      if (viniDoc.exists) {
        document.getElementById("preview-vini").src = viniDoc.data().imageBase64;
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  }
  
  window.addEventListener("DOMContentLoaded", loadAboutPhotos);
  