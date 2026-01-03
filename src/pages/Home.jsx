import { useState } from "react";
import Navbar from "../components/Navbar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

const Home = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey(prev => prev + 1);
    setSelectedEmployee(null);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <EmployeeForm selectedEmployee={selectedEmployee} refresh={refresh} />
        <EmployeeList
          key={refreshKey}
          onEdit={setSelectedEmployee}
        />
      </div>
    </>
  );
};

export default Home;
