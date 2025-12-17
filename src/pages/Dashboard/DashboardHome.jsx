import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  HiOutlineAcademicCap,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineCurrencyDollar,
  HiOutlineChartBar,
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineCheckCircle,
} from "react-icons/hi2";
import Loading from "../../components/Loading/Loading";
import { HiOutlineClipboardList } from "react-icons/hi";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useRole();
  const axiosSecure = useAxiosSecure();

  // Fetch data based on role
  const { data: applications = [], isLoading: applicationsLoading } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      if (role === "student") {
        const res = await axiosSecure.get(`/applications/user/${user?.email}`);
        return res.data;
      } else if (role === "moderator") {
        const res = await axiosSecure.get("/applications/moderator");
        return res.data;
      }
      return [];
    },
    enabled: !!user?.email && (role === "student" || role === "moderator"),
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics");
      return res.data;
    },
    enabled: role === "admin",
  });

  if (roleLoading) {
    return <Loading />;
  }

  // Student Dashboard Home
  if (role === "student") {
    const pendingApplications = applications.filter(
      (app) => app.applicationStatus === "pending"
    );
    const acceptedApplications = applications.filter(
      (app) => app.applicationStatus === "completed"
    );
    const processingApplications = applications.filter(
      (app) => app.applicationStatus === "processing"
    );

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
          <h1 className="text-3xl font-bold text-neutral mb-2">
            Welcome back, {user?.displayName}! 👋
          </h1>
          <p className="text-neutral/70">
            Track your scholarship applications and discover new opportunities.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <HiOutlineDocumentText className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-primary">{applications.length}</div>
            <div className="stat-desc">All time</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-warning">
              <HiOutlineClock className="w-8 h-8" />
            </div>
            <div className="stat-title">Pending</div>
            <div className="stat-value text-warning">
              {pendingApplications.length}
            </div>
            <div className="stat-desc">Awaiting review</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-info">
              <HiOutlineClipboardList className="w-8 h-8" />
            </div>
            <div className="stat-title">Processing</div>
            <div className="stat-value text-info">
              {processingApplications.length}
            </div>
            <div className="stat-desc">Under review</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-success">
              <HiOutlineCheckCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {acceptedApplications.length}
            </div>
            <div className="stat-desc">Successful</div>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-neutral">
                <HiOutlineDocumentText className="w-6 h-6" />
                Recent Applications
              </h2>
              <Link
                to="/dashboard/applications"
                className="btn btn-sm btn-ghost text-primary"
              >
                View All
              </Link>
            </div>

            {applicationsLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : applications.length === 0 ? (
              <div className="text-center py-8">
                <HiOutlineDocumentText className="w-16 h-16 mx-auto text-neutral/30 mb-3" />
                <p className="text-neutral/60 mb-4">
                  You haven't applied to any scholarships yet.
                </p>
                <Link to="/all-scholarships" className="btn btn-primary">
                  <HiOutlineAcademicCap className="w-5 h-5" />
                  Browse Scholarships
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>University</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Payment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.slice(0, 5).map((app) => (
                      <tr key={app._id} className="hover">
                        <td className="font-medium">{app.universityName}</td>
                        <td>
                          <span className="badge badge-ghost">
                            {app.scholarshipCategory}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              app.applicationStatus === "completed"
                                ? "badge-success"
                                : app.applicationStatus === "processing"
                                ? "badge-info"
                                : app.applicationStatus === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {app.applicationStatus}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              app.paymentStatus === "paid"
                                ? "badge-success"
                                : "badge-error"
                            }`}
                          >
                            {app.paymentStatus}
                          </span>
                        </td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title text-neutral mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/all-scholarships"
                className="btn btn-primary btn-lg justify-start"
              >
                <HiOutlineAcademicCap className="w-6 h-6" />
                Browse Scholarships
              </Link>
              <Link
                to="/dashboard/applications"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineDocumentText className="w-6 h-6" />
                My Applications
              </Link>
              <Link
                to="/dashboard/my-reviews"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineCheckCircle className="w-6 h-6" />
                My Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Moderator Dashboard Home
  if (role === "moderator") {
    const pendingApplications = applications.filter(
      (app) => app.applicationStatus === "pending"
    );
    const processingApplications = applications.filter(
      (app) => app.applicationStatus === "processing"
    );
    const completedApplications = applications.filter(
      (app) => app.applicationStatus === "completed"
    );

    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-info/10 to-primary/10 rounded-lg p-6 border border-info/20">
          <h1 className="text-3xl font-bold text-neutral mb-2">
            Welcome back, {user?.displayName}! 🎯
          </h1>
          <p className="text-neutral/70">
            Manage and review student scholarship applications.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-primary">
              <HiOutlineClipboardList className="w-8 h-8" />
            </div>
            <div className="stat-title">Total Applications</div>
            <div className="stat-value text-primary">{applications.length}</div>
            <div className="stat-desc">To review</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-warning">
              <HiOutlineClock className="w-8 h-8" />
            </div>
            <div className="stat-title">Pending Review</div>
            <div className="stat-value text-warning">
              {pendingApplications.length}
            </div>
            <div className="stat-desc">Need attention</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-info">
              <HiOutlineDocumentText className="w-8 h-8" />
            </div>
            <div className="stat-title">Processing</div>
            <div className="stat-value text-info">
              {processingApplications.length}
            </div>
            <div className="stat-desc">Under review</div>
          </div>

          <div className="stat bg-base-200 rounded-lg shadow">
            <div className="stat-figure text-success">
              <HiOutlineCheckCircle className="w-8 h-8" />
            </div>
            <div className="stat-title">Completed</div>
            <div className="stat-value text-success">
              {completedApplications.length}
            </div>
            <div className="stat-desc">This period</div>
          </div>
        </div>

        {/* Applications Requiring Attention */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h2 className="card-title text-neutral">
                <HiOutlineClipboardList className="w-6 h-6" />
                Applications Requiring Attention
              </h2>
              <Link
                to="/dashboard/manage-applications"
                className="btn btn-sm btn-ghost text-primary"
              >
                View All
              </Link>
            </div>

            {applicationsLoading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : pendingApplications.length === 0 ? (
              <div className="text-center py-8">
                <HiOutlineCheckCircle className="w-16 h-16 mx-auto text-success/50 mb-3" />
                <p className="text-neutral/60">
                  All caught up! No pending applications at the moment.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>University</th>
                      <th>Status</th>
                      <th>Applied Date</th>
                      <th>Feedback</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingApplications.slice(0, 5).map((app) => (
                      <tr key={app._id} className="hover">
                        <td>
                          <div>
                            <div className="font-medium">{app.userName}</div>
                            <div className="text-sm text-neutral/60">
                              {app.userEmail}
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{app.universityName}</td>
                        <td>
                          <span className="badge badge-warning">
                            {app.applicationStatus}
                          </span>
                        </td>
                        <td>{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td>
                          {app.feedback ? (
                            <span className="badge badge-success">
                              Provided
                            </span>
                          ) : (
                            <span className="badge badge-ghost">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title text-neutral mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/dashboard/manage-applications"
                className="btn btn-primary btn-lg justify-start"
              >
                <HiOutlineClipboardList className="w-6 h-6" />
                Manage Applications
              </Link>
              <Link
                to="/dashboard/all-reviews"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineCheckCircle className="w-6 h-6" />
                All Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Home
  if (role === "admin") {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-linear-to-r from-secondary/10 to-primary/10 rounded-lg p-6 border border-secondary/20">
          <h1 className="text-3xl font-bold text-neutral mb-2">
            Welcome back, {user?.displayName}! 🚀
          </h1>
          <p className="text-neutral/70">
            Monitor platform performance and manage system resources.
          </p>
        </div>

        {/* Stats Cards */}
        {analyticsLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="stat bg-base-200 rounded-lg shadow">
                <div className="stat-figure text-primary">
                  <HiOutlineUsers className="w-8 h-8" />
                </div>
                <div className="stat-title">Total Users</div>
                <div className="stat-value text-primary">
                  {analytics?.totalUsers || 0}
                </div>
                <div className="stat-desc">Registered accounts</div>
              </div>

              <div className="stat bg-base-200 rounded-lg shadow">
                <div className="stat-figure text-secondary">
                  <HiOutlineAcademicCap className="w-8 h-8" />
                </div>
                <div className="stat-title">Scholarships</div>
                <div className="stat-value text-secondary">
                  {analytics?.totalScholarships || 0}
                </div>
                <div className="stat-desc">Available programs</div>
              </div>

              <div className="stat bg-base-200 rounded-lg shadow">
                <div className="stat-figure text-success">
                  <HiOutlineCurrencyDollar className="w-8 h-8" />
                </div>
                <div className="stat-title">Revenue</div>
                <div className="stat-value text-success">
                  ${analytics?.totalFeesCollected?.toFixed(2) || "0.00"}
                </div>
                <div className="stat-desc">Total fees collected</div>
              </div>

              <div className="stat bg-base-200 rounded-lg shadow">
                <div className="stat-figure text-info">
                  <HiOutlineDocumentText className="w-8 h-8" />
                </div>
                <div className="stat-title">Applications</div>
                <div className="stat-value text-info">
                  {analytics?.applicationsByUniversity?.reduce(
                    (sum, item) => sum + item.count,
                    0
                  ) || 0}
                </div>
                <div className="stat-desc">Total submitted</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Applications by University */}
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h2 className="card-title text-neutral mb-4">
                    <HiOutlineChartBar className="w-6 h-6" />
                    Top Universities by Applications
                  </h2>
                  {analytics?.applicationsByUniversity &&
                  analytics.applicationsByUniversity.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.applicationsByUniversity
                        .slice(0, 5)
                        .map((item, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="badge badge-primary badge-lg">
                              {item.count}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{item.name}</div>
                              <progress
                                className="progress progress-primary w-full"
                                value={item.count}
                                max={
                                  Math.max(
                                    ...analytics.applicationsByUniversity.map(
                                      (u) => u.count
                                    )
                                  ) || 1
                                }
                              ></progress>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-center text-neutral/60 py-4">
                      No data available
                    </p>
                  )}
                </div>
              </div>

              {/* Applications by Category */}
              <div className="card bg-base-200 shadow">
                <div className="card-body">
                  <h2 className="card-title text-neutral mb-4">
                    <HiOutlineAcademicCap className="w-6 h-6" />
                    Applications by Category
                  </h2>
                  {analytics?.applicationsByCategory &&
                  analytics.applicationsByCategory.length > 0 ? (
                    <div className="space-y-3">
                      {analytics.applicationsByCategory.map((item, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="badge badge-secondary badge-lg">
                            {item.count}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{item.name}</div>
                            <progress
                              className="progress progress-secondary w-full"
                              value={item.count}
                              max={
                                Math.max(
                                  ...analytics.applicationsByCategory.map(
                                    (c) => c.count
                                  )
                                ) || 1
                              }
                            ></progress>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-neutral/60 py-4">
                      No data available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Quick Actions */}
        <div className="card bg-base-200 shadow">
          <div className="card-body">
            <h2 className="card-title text-neutral mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/dashboard/add-scholarship"
                className="btn btn-primary btn-lg justify-start"
              >
                <HiOutlinePlus className="w-6 h-6" />
                Add Scholarship
              </Link>
              <Link
                to="/dashboard/manage-scholarships"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineAcademicCap className="w-6 h-6" />
                Manage Scholarships
              </Link>
              <Link
                to="/dashboard/user-management"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineUsers className="w-6 h-6" />
                Manage Users
              </Link>
              <Link
                to="/dashboard/analytics"
                className="btn btn-outline btn-lg justify-start"
              >
                <HiOutlineChartBar className="w-6 h-6" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-neutral mb-2">
          Welcome to ScholarStream
        </h2>
        <p className="text-neutral/60">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default DashboardHome;
