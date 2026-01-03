import { useEffect, useState } from "react";
import { createEmployee, updateEmployee } from "../services/EmployeeService";
import { FaUser, FaEnvelope, FaBuilding, FaRupeeSign } from "react-icons/fa";

const EmployeeForm = ({ selectedEmployee, refresh }) => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (selectedEmployee) setEmployee(selectedEmployee);
  }, [selectedEmployee]);

  const handleChange = (e) =>
    setEmployee({ ...employee, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    employee.id
      ? await updateEmployee(employee.id, employee)
      : await createEmployee(employee);

    refresh();
    setEmployee({ name: "", email: "", department: "", salary: "" });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mb-8 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5">
        <h2 className="text-xl font-semibold text-white">
          {employee.id ? "Edit Employee Details" : "Add New Employee"}
        </h2>
        <p className="text-sm text-indigo-100">
          Manage employee records efficiently
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {/* Name */}
        <InputField
          icon={<FaUser />}
          name="name"
          placeholder="Full Name"
          value={employee.name}
          onChange={handleChange}
        />

        {/* Email */}
        <InputField
          icon={<FaEnvelope />}
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={handleChange}
        />

        {/* Department */}
        <div className="relative">
          <FaBuilding className="absolute top-3 left-3 text-gray-400" />
          <select
            name="department"
            value={employee.department}
            onChange={handleChange}
            className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
            <option value="Sales">Sales</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        {/* Salary */}
        <InputField
          icon={<FaRupeeSign />}
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          type="number"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="md:col-span-2 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {employee.id ? "Update Employee" : "Add Employee"}
        </button>
      </form>
    </div>
  );
};

/* Reusable Input */
const InputField = ({ icon, ...props }) => (
  <div className="relative">
    <span className="absolute top-3 left-3 text-gray-400">
      {icon}
    </span>
    <input
      {...props}
      className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    />
  </div>
);

export default EmployeeForm;
