import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6366F1", "#22C55E", "#F97316", "#EF4444", "#14B8A6"];

const DepartmentChart = ({ employees }) => {
  const deptMap = {};

  employees.forEach((e) => {
    deptMap[e.department] = (deptMap[e.department] || 0) + 1;
  });

  const data = Object.keys(deptMap).map((key) => ({
    name: key,
    value: deptMap[key],
  }));

  const total = employees.length;

  if (total === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
        No department data available
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-4">
        Department Distribution
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          {/* Center Label */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xl font-bold fill-gray-700"
          >
            {total}
          </text>
          <text
            x="50%"
            y="56%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-sm fill-gray-400"
          >
            Employees
          </text>

          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DepartmentChart;
