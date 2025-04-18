document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();
    const errorMsg = document.getElementById("error-msg");
  
    const validUsers = {
      harsh: "harshpass",
      vini: "vinipass"
    };
  
    if (validUsers[username] === password) {
      localStorage.setItem("loggedInUser", username);
      //window.location.href = "index.html";
    } else {
      errorMsg.textContent = "Invalid username or password!";
    }
  });
  