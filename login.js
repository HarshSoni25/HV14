document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
  
    const validUsers = {
      harsh: "lovesvini",
      vini: "lovesharsh"
    };
  
    if (validUsers[username] === password) {
      sessionStorage.setItem("loggedInUser", username);
      window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
  