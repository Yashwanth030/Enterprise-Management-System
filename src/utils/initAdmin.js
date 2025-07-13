export function initializeAdmin() {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  if (!users.some(u => u.role === "admin")) {
    users.push({
      id: Date.now().toString(),
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    });
    localStorage.setItem("users", JSON.stringify(users));
  }
}
