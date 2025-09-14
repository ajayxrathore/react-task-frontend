import { useState } from "react";
import axios from "axios";
import { socket } from "../socket/socket.js";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //
      if (email === "" || password === "") {
        setErrorMessage("Please enter both email and password");
        return;
      }
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      //   console.log(response.data);
      sessionStorage.setItem("signupEmail", response.data.email);
      socket.emit("userOnline", response.data.email);
      setEmail("");
      setPassword("");
      setErrorMessage("");
      navigate("/admin");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to login. Please try again.");
      }
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
      >
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your Email:{" "}
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your Password:{" "}
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
      {errorMessage && (
        <p className="mt-3 text-red-600 text-sm font-medium">{errorMessage}</p>
      )}
    </>
  );
}
