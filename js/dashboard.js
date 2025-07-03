// Load user from localStorage and display username
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
  window.location.href = "../pages/login.html"; // redirect if not logged in
}
document.getElementById("username").innerText = currentUser.name;

// Handle profile picture upload
document.getElementById("profilePic").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("pfp").src = e.target.result;
      // Save pfp for the current user
      if (currentUser && currentUser.username) {
        localStorage.setItem(`${currentUser.username}_pfp`, e.target.result);
      }
    };
    reader.readAsDataURL(file);
  }
});

// Load profile picture if already saved
window.onload = () => {
  if (currentUser && currentUser.username) {
    const pfp = localStorage.getItem(`${currentUser.username}_pfp`);
    if (pfp) document.getElementById("pfp").src = pfp;
  }
  loadPosts();
};

function createPost() {
  const title = document.getElementById("postTitle").value.trim();
  const desc = document.getElementById("postDesc").value.trim();
  const imageFile = document.getElementById("postImage").files[0];

  if (!title || !desc || !imageFile) {
    alert("All fields are required!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const post = {
      title,
      desc,
      image: e.target.result,
      likes: 0,
    };

    const key = `${currentUser.username}_Posts`;
    let posts = JSON.parse(localStorage.getItem(key) || "[]");
    posts.unshift(post);
    localStorage.setItem(key, JSON.stringify(posts));
    loadPosts();
  };
  reader.readAsDataURL(imageFile);

  // Clear form
  document.getElementById("postTitle").value = "";
  document.getElementById("postDesc").value = "";
  document.getElementById("postImage").value = "";
}

function loadPosts() {
  const key = `${currentUser.username}_Posts`;
  const posts = JSON.parse(localStorage.getItem(key) || "[]");
  const postHTML = posts
    .map(
      (post, index) => `
    <div class="post-card">
      <img src="${post.image}" alt="Post" />
      <h3>${post.title}</h3>
      <p>${post.desc}</p>
      <button onclick="likePost(this)">Like</button>
    </div>
  `
    )
    .join("");
  document.getElementById("postsContainer").innerHTML =
    "<h2>Your Posts</h2>" + postHTML;
}

function likePost(button) {
  const key = `${currentUser.username}_Posts`;
  let posts = JSON.parse(localStorage.getItem(key) || "[]");

  if (button.innerText === "Like") {
    button.innerText = "Liked";
    button.style.backgroundColor = "#6c757d"; // Optional: change color
  } else {
    button.innerText = "Like";
    button.style.backgroundColor = "#ff4d4d"; // Back to original
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "../pages/login.html";
}
