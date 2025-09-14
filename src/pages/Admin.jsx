import { useState, useEffect } from "react";
import axios from "axios";
import { socket } from "../socket/socket.js";
export default function Admin() {
  const [errorMessage, setErrorMessage] = useState("");

  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("https://react-task-backend-8y9w.onrender.com/admin")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          //   console.error("Error fetching users", error);
          setErrorMessage("Failed to fetch users. Please try again.");
        });

      socket.on("connect", () => {
        const email = sessionStorage.getItem("signupEmail");
        if (email) {
          socket.emit("userOnline", email);
        }
      });
      socket.on("updateUsers", (allmails) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => ({
            ...user,
            status: allmails.includes(user.email) ? "Online" : "Offline",
          }))
        );
      });
      socket.on("connect", () => {
        // console.log("✅ Socket connected:", socket.id);
      });

      socket.on("connect_error", (err) => {
        // console.error("❌ Socket connect error:", err.message);
      });
      setErrorMessage("");
      return () => {
        socket.off("updateUsers");
      };
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Failed to fetch users. Please try again.");
      }
    }
  }, []);

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white  shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h2>
      <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
          <th className="px-4 py-2 text-sm font-semibold text-gray-800">Full Name</th>
          <th className="px-4 py-2 text-sm font-semibold text-gray-800">Email</th>
          <th className="px-4 py-2 text-sm font-semibold text-gray-800">Number</th>
          <th className="px-4 py-2 text-sm font-semibold text-gray-800">Status</th>
        </tr>
        </thead>
        <tbody>
          {users.map((u, id) => (
            <tr key={id}className=" hover:bg-gray-50 transition-colors">
              <td className="px-4 py-2 text-gray-850">{u.fullName}</td>
            <td className="px-4 py-2 text-gray-850">{u.email}</td>
            <td className="px-4 py-2 text-gray-850">{u.number}</td>
              <td
              className={`px-4 py-2 font-medium ${
                u.status === "Online"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {u.status}
            </td>

            </tr>
          ))}
        </tbody>
      </table>
       </div>
      {errorMessage && <p className="mt-4 text-red-600 text-sm font-medium">{errorMessage}</p>}
    </div>
  );
}
