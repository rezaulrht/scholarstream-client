import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineAcademicCap,
  HiOutlineChartBar,
} from "react-icons/hi2";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch analytics data
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const response = await axiosSecure.get("/analytics");
      return response.data;
    },
  });

  // Colors for pie chart
  const COLORS = ["#97a87a", "#3f4430", "#c97a68", "#6ba96a", "#8b7355"];

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
          Platform Analytics
        </h1>
        <p className="text-neutral/70">
          Overview of key metrics and application statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
        {/* Total Users */}
        <div className="stats shadow bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
          <div className="stat">
            <div className="stat-figure text-primary">
              <HiOutlineUsers className="text-4xl" />
            </div>
            <div className="stat-title text-neutral/70">Total Users</div>
            <div className="stat-value text-primary">
              {analytics?.totalUsers || 0}
            </div>
            <div className="stat-desc">Registered on platform</div>
          </div>
        </div>

        {/* Total Scholarships */}
        <div className="stats shadow bg-linear-to-br from-success/10 to-success/5 border border-success/20">
          <div className="stat">
            <div className="stat-figure text-success">
              <HiOutlineAcademicCap className="text-4xl" />
            </div>
            <div className="stat-title text-neutral/70">Total Scholarships</div>
            <div className="stat-value text-success">
              {analytics?.totalScholarships || 0}
            </div>
            <div className="stat-desc">Available opportunities</div>
          </div>
        </div>

        {/* Total Fees Collected */}
        <div className="stats shadow bg-linear-to-br from-warning/10 to-warning/5 border border-warning/20">
          <div className="stat">
            <div className="stat-figure text-warning">
              <HiOutlineCurrencyDollar className="text-4xl" />
            </div>
            <div className="stat-title text-neutral/70">Fees Collected</div>
            <div className="stat-value text-warning">
              ${analytics?.totalFeesCollected?.toFixed(2) || 0}
            </div>
            <div className="stat-desc">From paid applications</div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Bar Chart - Applications by University */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineChartBar className="text-2xl text-primary" />
            <h2 className="text-xl font-bold text-neutral">
              Applications by University
            </h2>
          </div>
          {analytics?.applicationsByUniversity?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={analytics.applicationsByUniversity.slice(0, 10)}
                margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  style={{ fontSize: "12px" }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="count"
                  fill="#97a87a"
                  name="Applications"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-neutral/50">
              No application data available
            </div>
          )}
        </div>

        {/* Pie Chart - Applications by Category */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center gap-2 mb-6">
            <HiOutlineChartBar className="text-2xl text-primary" />
            <h2 className="text-xl font-bold text-neutral">
              Applications by Category
            </h2>
          </div>
          {analytics?.applicationsByCategory?.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analytics.applicationsByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {analytics.applicationsByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-neutral/50">
              No category data available
            </div>
          )}
        </div>
      </div>

      {/* Additional Stats Table */}
      <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-xl font-bold text-neutral mb-4">
          Top Universities by Applications
        </h2>
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="bg-primary/5">
              <tr>
                <th className="text-neutral font-semibold">Rank</th>
                <th className="text-neutral font-semibold">University Name</th>
                <th className="text-neutral font-semibold">Applications</th>
              </tr>
            </thead>
            <tbody>
              {analytics?.applicationsByUniversity
                ?.slice(0, 10)
                .map((uni, index) => (
                  <tr key={index} className="hover:bg-base-200/50">
                    <td className="font-semibold text-primary">#{index + 1}</td>
                    <td className="font-medium">{uni.name}</td>
                    <td>
                      <span className="badge badge-primary badge-lg">
                        {uni.count}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {(!analytics?.applicationsByUniversity ||
            analytics.applicationsByUniversity.length === 0) && (
            <div className="text-center py-8 text-neutral/50">
              No application data available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
