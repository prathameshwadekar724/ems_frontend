import {
  FaUsers,
  FaRupeeSign,
  FaArrowUp,
  FaCrown,
} from "react-icons/fa";

const AnalyticsCards = ({ employees }) => {
  const total = employees.length;

  const avgSalary =
    total === 0
      ? 0
      : Math.round(
          employees.reduce((sum, e) => sum + e.salary, 0) / total
        );

  const highestPaid =
    employees.reduce(
      (max, e) => (e.salary > max.salary ? e : max),
      { salary: 0 }
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Employees"
        value={total}
        icon={<FaUsers />}
        gradient="from-indigo-500 to-indigo-700"
      />

      <StatCard
        title="Average Salary"
        value={`₹${avgSalary}`}
        icon={<FaRupeeSign />}
        gradient="from-emerald-500 to-emerald-700"
      />

      <StatCard
        title="Highest Salary"
        value={`₹${highestPaid.salary || 0}`}
        icon={<FaArrowUp />}
        gradient="from-orange-500 to-orange-700"
      />

      <StatCard
        title="Top Employee"
        value={highestPaid.name || "N/A"}
        icon={<FaCrown />}
        gradient="from-pink-500 to-pink-700"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient }) => (
  <div
    className={`bg-gradient-to-r ${gradient} text-white p-5 rounded-xl shadow-lg 
                transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-2xl font-bold mt-1">{value}</h2>
      </div>

      <div className="text-3xl opacity-80">
        {icon}
      </div>
    </div>
  </div>
);

export default AnalyticsCards;
