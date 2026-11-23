document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");

  // CHECK LOGIN
  if (!token) {
    window.location.href = "login.html";
    return;
  }

  // LOGOUT
  document.getElementById("logoutBtn")
    .addEventListener("click", () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "login.html";
    });

  try {

    // LOAD USER PROFILE
    const user = await getProfile();

    document.getElementById("userName").textContent =
      user.name;

    document.getElementById("profileName").textContent =
      "Name: " + user.name;

    document.getElementById("profileEmail").textContent =
      "Email: " + user.email;

    // LOAD USER BLOGS
    const blogs = await getMyBlogs();

    const blogContainer =
      document.getElementById("myBlogs");

    blogContainer.innerHTML = "";

    if (blogs.length === 0) {
      blogContainer.textContent =
        "You have not created any blogs yet.";
      return;
    }

    blogs.forEach((blog) => {

      const card = document.createElement("div");

      const title = document.createElement("h3");
      title.textContent = blog.title;

      const content = document.createElement("p");
      content.textContent = blog.content;

      const deleteButton =
        document.createElement("button");

      deleteButton.textContent = "Delete";

      deleteButton.addEventListener("click", async () => {
        try {
          await deleteBlog(blog._id);
          card.remove();
        } catch (error) {
          alert(error.message);
        }
      });

      card.appendChild(title);
      card.appendChild(content);
      card.appendChild(deleteButton);

      blogContainer.appendChild(card);

    });

  } catch (error) {

    alert(error.message);

    if (
      error.message.includes("token") ||
      error.message.includes("Access denied")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "login.html";
    }

  }

});