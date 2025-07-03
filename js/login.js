let visibility = document.getElementById("visibility");
let password = document.getElementById("password");
visibility.innerHTML = `<span class="material-symbols-outlined">
visibility_off
</span>`;
function showPassword() {
  if (password.type === "password") {
    password.type = "text";
    visibility.innerHTML = `<span class="material-symbols-outlined"> visibility </span>`;
  } else {
    password.type = "password";
    visibility.innerHTML = `<span class="material-symbols-outlined">
visibility_off
</span>`;
  }
}

document
  .getElementById("loginUser")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Assuming all users are stored in localStorage under "users" as a JSON array
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    let founduser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (founduser) {
      alert("Login Successful");
      localStorage.setItem("currentUser", JSON.stringify(founduser));
      window.location.href = "../index.html";
    } else {
      alert("Invalid username or password!");
    }
  });
