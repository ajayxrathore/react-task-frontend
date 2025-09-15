import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    number: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://react-task-backend-8y9w.onrender.com/signup",
        formData
      );
    //   console.log(response.data);
      sessionStorage.setItem("signupEmail", response.data.email);
      sessionStorage.setItem("mobileOtp",response.data.mobileOtp);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        number: "",
      });
      setErrorMessage("");
      navigate("/verify-otp");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to signup. Please try again.");
      }
    }
    // console.log(`formdata: ${formData}`);
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md space-y-4"
      >
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Mobile Number
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="tel"
          id="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </form>
      {errorMessage && (
        <p className="mt-3 text-red-600 text-sm font-medium">{errorMessage}</p>
      )}
    </>
  );
}
