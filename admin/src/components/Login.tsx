import axios from "axios";
import { useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

type LoginProps = {
  setToken: (token: string) => void;
};

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(backendUrl);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.post(backendUrl + "/api/user/admin/login", {
        email,
        password,
      });
      if (reponse.data.success) {
        setToken(reponse.data.token);
      } else {
        toast.error(reponse.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Email Address</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state
              placeholder="your@email.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <div className="mb-6">
            <p className="text-gray-700 mb-2">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
