import { Link, NavLink } from "react-router";
import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useRole from "../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  HiOutlineBars3,
  HiOutlineHome,
  HiOutlineUser,
  HiOutlineBookOpen,
  HiOutlineDocumentText,
  HiOutlineStar,
  HiOutlineUsers,
  HiOutlinePlus,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineClipboardList } from "react-icons/hi";

const DashboardLayout = () => {
  const { user, logOut } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  // Fetch user details from database for updated photo
  const { data: userDetails } = useQuery({
    queryKey: ["user-details-dashboard", user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      const response = await axiosSecure.get(`/users/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#c97a68",
      cancelButtonColor: "#6d7d56",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-200 border-b border-base-300">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <HiOutlineBars3 className="w-6 h-6" />
            </label>
          </div>
          <div className="flex-1 flex justify-center gap-2">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `btn btn-sm ${isActive ? "btn-primary" : "btn-ghost"}`
              }
            >
              <MdOutlineSpaceDashboard className="h-5 w-5" />
              Dashboard
            </NavLink>
            <Link to="/" className="btn btn-ghost btn-sm">
              <HiOutlineHome className="h-5 w-5" />
              Home
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <main className="flex-1 p-6 bg-base-100">
          <Outlet />
        </main>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 border-r border-base-300 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Logo */}
          <div className="p-6 border-b border-base-300 w-full is-drawer-close:p-2">
            <Link
              to="/"
              className="flex items-center gap-2 group is-drawer-close:justify-center"
            >
              {/* Logo Icon */}
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <img
                  src="/logo.png"
                  alt="ScholarStream Logo"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              {/* Logo Text - Hidden when collapsed */}
              <span className="text-xl font-bold tracking-tight transition-all duration-300 is-drawer-close:hidden">
                <span className="text-neutral group-hover:text-primary">
                  Scholar
                </span>
                <span className="text-primary group-hover:text-secondary">
                  Stream
                </span>
              </span>
            </Link>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-base-300 w-full is-drawer-close:p-2">
              <div className="flex items-center gap-3 is-drawer-close:justify-center">
                <div className="avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={userDetails?.photoURL || user?.photoURL}
                      alt={user?.displayName}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0 is-drawer-close:hidden">
                  <p className="text-sm font-semibold text-neutral truncate">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-neutral/70 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sidebar menu */}
          <ul className="menu w-full grow p-4">
            {/* Common Links - Available to All */}
            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/10"
                  }`
                }
                data-tip="Dashboard Home"
              >
                <MdOutlineSpaceDashboard className="h-5 w-5" />
                <span className="is-drawer-close:hidden">Dashboard Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "hover:bg-primary/10"
                  }`
                }
                data-tip="My Profile"
              >
                <HiOutlineUser className="h-5 w-5" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>

            {/* Student Links */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/applications"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="My Applications"
                  >
                    <HiOutlineDocumentText className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">
                      My Applications
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-reviews"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="My Reviews"
                  >
                    <HiOutlineStar className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">My Reviews</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Moderator Links */}
            {role === "moderator" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/manage-applications"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="Manage Applications"
                  >
                    <HiOutlineClipboardList className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">
                      Manage Applications
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="All Reviews"
                  >
                    <HiOutlineStar className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">All Reviews</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/add-scholarship"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="Add Scholarship"
                  >
                    <HiOutlinePlus className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">
                      Add Scholarship
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/manage-scholarships"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="Manage Scholarships"
                  >
                    <HiOutlineCog className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">
                      Manage Scholarships
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/user-management"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="User Management"
                  >
                    <HiOutlineUsers className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">
                      User Management
                    </span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/analytics"
                    className={({ isActive }) =>
                      `is-drawer-close:tooltip is-drawer-close:tooltip-right is-drawer-close:px-2 ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "hover:bg-primary/10"
                      }`
                    }
                    data-tip="Analytics"
                  >
                    <HiOutlineChartBar className="h-5 w-5" />
                    <span className="is-drawer-close:hidden">Analytics</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Logout Button at Bottom */}
          <div className="p-4 border-t border-base-300 w-full">
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error w-full is-drawer-close:btn-square is-drawer-close:btn-ghost"
            >
              <HiOutlineArrowRightOnRectangle className="h-5 w-5" />
              <span className="is-drawer-close:hidden">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
