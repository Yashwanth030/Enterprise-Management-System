

// Polyfill for TextEncoder
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import Login from "../pages/auth/Login";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import { MemoryRouter } from "react-router-dom"; // ✅ This is the missing import

// ✅ Mock toast to avoid real popups
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

function renderWithProviders(ui, {
  preloadedState,
  store = configureStore({
    reducer: { auth: authReducer },
    preloadedState,
  }),
  ...renderOptions
} = {}) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}


describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders login form inputs and button", () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("shows validation errors on empty submit", async () => {
    renderWithProviders(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findAllByText(/is required/i)).toHaveLength(2);
  });

  test("shows error toast on invalid credentials", async () => {
    localStorage.setItem("users", JSON.stringify([
      { email: "user@example.com", password: "password123", role: "user" }
    ]));

    renderWithProviders(<Login />);
    userEvent.type(screen.getByPlaceholderText(/email/i), "wrong@example.com");
    userEvent.type(screen.getByPlaceholderText(/password/i), "wrongpass");
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Invalid credentials");
    });
  });

  test("dispatches login and sets localStorage on successful login", async () => {
    const user = {
      email: "admin@example.com",
      password: "admin123",
      role: "manager",
      id: "1",
      name: "manager"
    };
    localStorage.setItem("users", JSON.stringify([user]));

    const { store } = renderWithProviders(<Login />);
    userEvent.type(screen.getByPlaceholderText(/email/i), user.email);
    userEvent.type(screen.getByPlaceholderText(/password/i), user.password);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      const authState = store.getState().auth;
      expect(authState.user.email).toBe(user.email);
      expect(toast.success).toHaveBeenCalledWith("Logged in successfully!");
    });

    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    expect(storedUser.email).toBe(user.email);
  });
});
