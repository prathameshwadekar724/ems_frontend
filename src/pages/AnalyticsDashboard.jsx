import { useEffect, useState } from "react";
import { getAllEmployeesNoPaging } from "../services/EmployeeService";
import AnalyticsCards from "../components/AnalyticsCards";
import DepartmentChart from "../components/DepartmentChart";
import Navbar from "../components/Navbar";

const AnalyticsDashboard = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployeesNoPaging().then((res) => {
      setEmployees(res.data.content);
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

        <AnalyticsCards employees={employees} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DepartmentChart employees={employees} />
        </div>
      </div>
    </>
  );
};

export default AnalyticsDashboard;
