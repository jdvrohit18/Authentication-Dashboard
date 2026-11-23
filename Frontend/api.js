const API_URL = "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

async function getProfile() {
  return apiRequest("/auth/me");
}

async function getMyBlogs() {
  return apiRequest("/blogs");
}

async function createBlog(title, content) {
  return apiRequest("/blogs", {
    method: "POST",
    body: JSON.stringify({ title, content })
  });
}

async function deleteBlog(id) {
  return apiRequest(`/blogs/${id}`, {
    method: "DELETE"
  });
}