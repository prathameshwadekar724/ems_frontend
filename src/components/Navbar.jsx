import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Employee Management System</h1>
        <p className="text-sm opacity-90">Dashboard</p>
      </div>
      <div className="space-x-4">
        <button onClick={() => navigate("/")}>Dashboard</button>
        <button onClick={() => navigate("/analytics")}>Analytics</button>
        <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
      </div>

      
    </div>
  );
};

export default Navbar;
