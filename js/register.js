// Set initial icons for both visibility buttons
document.getElementById(
  "visibility1"
).innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;
document.getElementById(
  "visibility2"
).innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;

//main form submission
document
  .getElementById("registerUser")
  .addEventListener("submit", function (event) {
    var name = document.getElementById("name").value;
    var userName = document.getElementById("userName").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = {
      name: name,
      username: userName,
      email: email,
      password: password,
    };

    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email || u.username === userName)) {
      alert("User already Exist!");
      return (window.location.href = "login.html");
    }

    users.push(user);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration Successful");
    window.location.href = "../pages/login.html";
  });

//userName checker
function checkUsername() {
  var uNameInput = document.getElementById("userName").value;
  var hint = document.getElementById("userHint");

  if (!uNameInput) {
    hint.innerHTML = "";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const exist = users.some(
    (user) => user.username.toLowerCase() === uNameInput.toLowerCase()
  );

  if (exist) {
    hint.innerHTML = `Username already taken!`;
    hint.style.color = `red`;
  } else {
    hint.innerHTML = `Username is available ✅`;
    hint.style.color = `green`;
  }
}

//All other Passsword Function
function testPassword() {
  let passwordInput = document.getElementById("password");
  let error = document.getElementById("error");
  let strongPasswordPattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^\w ])\S{8,20}$/;
  let capsPattern = /[A-Z]/;
  let lowerCasePattern = /[a-z]/;
  let numberPattern = /[0-9]/;
  let symbolPattern = /[^\w ]/;

  if (strongPasswordPattern.test(passwordInput.value.trim())) {
    error.style.color = "green";
    error.innerHTML = "strong password";
  } else {
    error.style.color = "red";
    if (!capsPattern.test(passwordInput.value.trim())) {
      error.innerHTML =
        "not a strong password, add at least one capital letter";
    } else if (!lowerCasePattern.test(passwordInput.value.trim())) {
      error.innerHTML =
        "not a strong password,add at least one lowercase letter";
    } else if (!numberPattern.test(passwordInput.value.trim())) {
      error.innerHTML = "not a strong password,add at least one number";
    } else if (!symbolPattern.test(passwordInput.value.trim())) {
      error.innerHTML = "not a strong password, add at least one symbol";
    } else {
      error.innerHTML =
        "not a strong password, ensure its at least 8 characters";
    }
  }
}

function passMatch() {
  var password = document.getElementById("password").value.trim();
  var confirmPassword = document.getElementById("confirmPassword").value.trim();
  var match = document.getElementById("matchMessage");

  if (!confirmPassword) {
    match.innerHTML = "";
    return;
  }

  if (password === confirmPassword) {
    match.innerHTML = `✅ Passwords match`;
    match.style.color = `green`;
  } else {
    match.innerHTML = `❌ Passwords do not match`;
    match.style.color = `red`;
  }
}

function showPassword(inputId, btnId) {
  let passwordInput = document.getElementById(inputId);
  let visibilityBtn = document.getElementById(btnId);
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    visibilityBtn.innerHTML = `<span class="material-symbols-outlined">visibility</span>`;
  } else {
    passwordInput.type = "password";
    visibilityBtn.innerHTML = `<span class="material-symbols-outlined">visibility_off</span>`;
  }
}
