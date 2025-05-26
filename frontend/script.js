const API_BASE = "http://localhost:5000/api";

// Utility: Load users and fill user dropdowns
async function loadUsers() {
  console.log("[loadUsers] Called");
  try {
    const res = await fetch(`${API_BASE}/users`);
    const data = await res.json();
    console.log("[loadUsers] API response:", data);

    if (data.success) {
      const postAuthorSelect = document.getElementById("post-author-select");
      const commentAuthorSelect = document.getElementById("comment-author-select");

      // Clear existing options except default
      postAuthorSelect.innerHTML = '<option value="">Select Author</option>';
      commentAuthorSelect.innerHTML = '<option value="">Select Commenter</option>';

      data.data.forEach(user => {
        console.log("[loadUsers] Adding user to dropdown:", user);
        const option1 = document.createElement("option");
        option1.value = user._id;
        option1.textContent = user.username;
        postAuthorSelect.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = user._id;
        option2.textContent = user.username;
        commentAuthorSelect.appendChild(option2);
      });
    } else {
      console.warn("[loadUsers] API success=false:", data.message || data);
    }
  } catch (err) {
    console.error("[loadUsers] Failed to load users:", err);
  }
}

// Utility: Load posts and fill post dropdown & posts list
async function loadPosts() {
  console.log("[loadPosts] Called");
  try {
    const res = await fetch(`${API_BASE}/posts`);
    const data = await res.json();
    console.log("[loadPosts] API response:", data);

    // Fill comment post select dropdown
    const commentPostSelect = document.getElementById("comment-post-select");
    commentPostSelect.innerHTML = '<option value="">Select Post</option>';

    // Fill posts list
    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";

    if (data.data && data.data.length > 0) {
      data.data.forEach(post => {
        // Add to comment post dropdown
        const option = document.createElement("option");
        option.value = post._id;
        option.textContent = post.title;
        commentPostSelect.appendChild(option);

        // Add post to posts section
        const postEl = document.createElement("div");
        postEl.className = "post-box";
        postEl.innerHTML = `
          <h3>${post.title}</h3>
          <p><b>By:</b> ${post.author?.username || "Unknown"}</p>
          <p>${post.body}</p>
          <h4>Comments:</h4>
          <ul>
            ${(post.comments || []).map(c => `<li>${c.text} — ${c.author?.username || "Anonymous"}</li>`).join("")}
          </ul>
          <hr/>
        `;
        postsDiv.appendChild(postEl);
      });
    } else {
      postsDiv.innerHTML = "<p>No posts found.</p>";
    }
  } catch (err) {
    console.error("[loadPosts] Failed to load posts:", err);
  }
}

// CREATE USER
async function createUser() {
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!username || !email) {
    alert("Username and email are required.");
    return;
  }

  console.log("[createUser] Creating user:", { username, email });
  try {
    const res = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });
    const data = await res.json();
    console.log("[createUser] API response:", data);
    alert(data.message);
    if (data.success) {
      loadUsers();
      // Optionally clear input fields after success
      document.getElementById("username").value = "";
      document.getElementById("email").value = "";
    }
  } catch (err) {
    console.error("[createUser] Failed to create user:", err);
    alert("Failed to create user.");
  }
}

// CREATE POST
async function createPost() {
  const title = document.getElementById("post-title").value.trim();
  const body = document.getElementById("post-body").value.trim();
  const author = document.getElementById("post-author-select").value;

  if (!title || !body || !author) {
    alert("Please fill all post fields.");
    return;
  }

  console.log("[createPost] Creating post:", { title, body, author });
  try {
    const res = await fetch(`${API_BASE}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, author }),
    });
    const data = await res.json();
    console.log("[createPost] API response:", data);
    alert(data.message);
    if (data.success) {
      document.getElementById("post-title").value = "";
      document.getElementById("post-body").value = "";
      document.getElementById("post-author-select").value = "";
      loadPosts();
    }
  } catch (err) {
    console.error("[createPost] Failed to create post:", err);
    alert("Failed to create post.");
  }
}

// CREATE COMMENT
async function createNewComment() {
  console.log("[createComment] Called"); // ✅ Log function call

  const text = document.getElementById("comment-text").value.trim();
  const post = document.getElementById("comment-post-select").value;
  const author = document.getElementById("comment-author-select").value;

  console.log("[createComment] Inputs:", { text, post, author }); // ✅ Log input values

  if (!text || !post || !author) {
    alert("Please fill all comment fields.");
    console.warn("[createComment] Missing fields");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, post, author }),
    });

    const data = await res.json();
    console.log("[createComment] API response:", data); // ✅ Log API response

    alert(data.message);

    if (data.success) {
      document.getElementById("comment-text").value = "";
      document.getElementById("comment-post-select").value = "";
      document.getElementById("comment-author-select").value = "";
      loadPosts();
    }
  } catch (err) {
    console.error("[createComment] Failed to create comment", err);
  }
}

// On window load, load users and posts
window.onload = () => {
  console.log("[window.onload] Loading users and posts");
  loadUsers();
  loadPosts();
};