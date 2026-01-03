import { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/EmployeeService";
import {
  FaSearch,
  FaEdit,
  FaTrash,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEmployees();
  }, [keyword, page]);

  const fetchEmployees = () => {
    getEmployees(keyword, page).then((res) => {
      setEmployees(res.data.content);
      setTotalPages(res.data.totalPages);
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    deleteEmployee(id).then(fetchEmployees);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg mt-8 overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-5 border-b">
        <h2 className="text-xl font-semibold">Employee Directory</h2>

        {/* Search */}
        <div className="relative mt-3 md:mt-0 w-full md:w-64">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            placeholder="Search employee..."
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(0);
            }}
            className="w-full pl-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Salary</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr
                key={emp.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-3 font-medium">{emp.name}</td>
                <td className="p-3 text-gray-600">{emp.email}</td>

                {/* Department Badge */}
                <td className="p-3">
                  <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                    {emp.department}
                  </span>
                </td>

                <td className="p-3 font-semibold">
                  ₹{emp.salary}
                </td>

                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => onEdit(emp)}
                    className="text-indigo-600 hover:text-indigo-800"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(emp.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}

            {employees.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
          <FaChevronLeft /> Prev
        </button>

        <span className="text-sm text-gray-600">
          Page <strong>{page + 1}</strong> of{" "}
          <strong>{totalPages}</strong>
        </span>

        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded disabled:opacity-50"
        >
          Next <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default EmployeeList;
