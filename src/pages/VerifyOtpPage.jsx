import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function VerifyOtpPage() {
  const serverMobileOtp = sessionStorage.getItem("mobileOtp");

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailOtp || !mobileOtp) {
      alert("Please enter both OTPs");
      return;
    }
    try {
      const email = sessionStorage.getItem("signupEmail");
      const response = await axios.post("https://react-task-backend-8y9w.onrender.com/verify-otp", {
        mobileOtp,
        emailOtp,
        email,
      });
      //   console.log(response.data);
      setMobileOtp("");
      setEmailOtp("");
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Server error. Please try again.");
      }
    }
  };
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Verify OTP Page
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label
          htmlFor="mobileOtp"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Mobile OTP:{" "}
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          id="mobileOtp"
          name="mobileOtp"
          value={mobileOtp}
          onChange={(e) => setMobileOtp(e.target.value)}
          required
        />
        <label
          htmlFor="emailOtp"
          className="block text-sm font-medium text-gray-700"
        >
          Enter Email OTP:{" "}
        </label>
        <input
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          type="text"
          id="emailOtp"
          name="emailOtp"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
      {errorMessage && (
        <p className="mt-4 text-red-600 text-sm font-medium">{errorMessage}</p>
      )}
      {serverMobileOtp && (
        <p className="mt-4 text-gray-800 text-sm">
          Your Mobile OTP is : {serverMobileOtp}
        </p>
      )}
    </div>
  );
}
