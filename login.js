document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
    const avatarContainer = document.getElementById("avatar-container");
  
    const validUsers = {
      harsh: "harshpass",
      vini: "vinipass"
    };
  
    if (validUsers[username] === password) {
      // Save user login status in localStorage
      localStorage.setItem("loggedInUser", username);
  
      // Show avatar and welcome message
      showAvatar(username);
  
      // Redirect to the home page
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
  
  function showAvatar(username) {
    const avatarContainer = document.getElementById("avatar-container");
    const avatar = document.createElement("img");
  
    if (username === "harsh") {
      avatar.src = "path_to_harsh_avatar.jpg";  // Replace with actual path to Harsh's avatar
      avatar.alt = "Harsh Avatar";
    } else if (username === "vini") {
      avatar.src = "path_to_vini_avatar.jpg";   // Replace with actual path to Vini's avatar
      avatar.alt = "Vini Avatar";
    }
  
    avatar.classList.add("avatar");
    avatarContainer.innerHTML = `<h3>Welcome, ${username}!</h3>`;
    avatarContainer.appendChild(avatar);
  }
  