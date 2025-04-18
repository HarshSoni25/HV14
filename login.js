document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
    
    const validUsers = {
      harsh: "harshpass",
      vini: "vinipass"
    };
  
    const avatars = {
      harsh: "harsh-avatar.png", // Replace with actual avatar image URLs
      vini: "vini-avatar.png"
    };
  
    if (validUsers[username] === password) {
      localStorage.setItem("loggedInUser", username);
      localStorage.setItem("avatar", avatars[username]);
      window.location.href = "index.html";  // Redirect to the main page after login
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
  