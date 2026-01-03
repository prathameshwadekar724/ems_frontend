import { useState } from "react";
import { loginUser } from "../services/AuthService";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await loginUser(user);
      login(res.data.token);
      navigate("/");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-8 w-[350px] border border-white/30">
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Username */}
        <div className="relative mb-4">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            className="w-full pl-10 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setUser({ ...user, username: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            className="w-full pl-10 py-2 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-white mt-4 opacity-80">
          Secure JWT Authentication
        </p>
      </div>
    </div>
  );
};

export default Login;
