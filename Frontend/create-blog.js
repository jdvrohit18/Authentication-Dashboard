document.addEventListener("DOMContentLoaded", () => {

  if (!localStorage.getItem("token")) {
    window.location.href = "login.html";
    return;
  }

  const form = document.getElementById("createBlogForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    try {
      await createBlog(title, content);

      alert("Blog created successfully!");

      window.location.href = "dashboard.html";

    } catch (error) {
      alert(error.message);
    }

  });

});