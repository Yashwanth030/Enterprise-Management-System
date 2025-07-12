// src/pages/auth/Login.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../../redux/slices/authSlice";
import { setUsers } from "../../redux/slices/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // ✅ On mount, load users into Redux
  useEffect(() => {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Create default admin if not exists
    const adminExists = users.some(u => u.role === "admin");
    if (!adminExists) {
      const admin = {
        id: Date.now().toString(),
        name: "Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
      };
      users.push(admin);
      localStorage.setItem("users", JSON.stringify(users));
    }

    dispatch(setUsers(users));
  }, [dispatch]);

  const onSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      toast.error("Invalid credentials");
      return;
    }

    // ✅ Save login state
    dispatch(login(user));
    localStorage.setItem("currentUser", JSON.stringify(user));

    toast.success("Logged in successfully!");
    navigate(`/${user.role}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input
          {...register("password", {
            required: "Password is required",
            minLength: { value: 4, message: "Min 4 characters" },
          })}
          type="password"
          placeholder="Password"
          className="w-full mb-3 p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}