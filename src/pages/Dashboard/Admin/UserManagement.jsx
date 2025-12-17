import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineUsers,
  HiOutlineTrash,
  HiOutlineUserCircle,
  HiOutlineShieldCheck,
  HiOutlineShieldExclamation,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState("");

  // Fetch all users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const response = await axiosSecure.get("/users");
      return response.data;
    },
  });

  // Filter users by role
  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.role === roleFilter);

  // Get role badge styling
  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return {
          icon: <HiOutlineShieldCheck className="text-sm" />,
          class: "bg-error/20 text-error border-error/30",
        };
      case "moderator":
        return {
          icon: <HiOutlineShieldExclamation className="text-sm" />,
          class: "bg-info/20 text-info border-info/30",
        };
      case "student":
        return {
          icon: <HiOutlineAcademicCap className="text-sm" />,
          class: "bg-success/20 text-success border-success/30",
        };
      default:
        return {
          icon: <HiOutlineUserCircle className="text-sm" />,
          class: "bg-neutral/20 text-neutral border-neutral/30",
        };
    }
  };

  // Open role change modal
  const handleOpenRoleModal = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setShowRoleModal(true);
  };

  // Change user role
  const handleChangeRole = async () => {
    if (newRole === selectedUser.role) {
      Swal.fire({
        icon: "info",
        title: "No Change",
        text: "The selected role is the same as the current role.",
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Change User Role?",
        html: `
          <p>Change <strong>${
            selectedUser.name || selectedUser.email
          }</strong>'s role</p>
          <p>from <span class="badge badge-sm">${
            selectedUser.role
          }</span> to <span class="badge badge-sm">${newRole}</span>?</p>
        `,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#97a87a",
        cancelButtonColor: "#c97a68",
        confirmButtonText: "Yes, change it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/users/${selectedUser._id}/role`, {
          role: newRole,
        });
        Swal.fire({
          icon: "success",
          title: "Role Updated!",
          text: `User role has been changed to ${newRole}.`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShowRoleModal(false);
        refetch();
      }
    } catch (error) {
      console.error("Error changing role:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to change user role. Please try again.",
      });
    }
  };

  // Delete user
  const handleDeleteUser = async (userToDelete) => {
    // Prevent deleting self
    if (userToDelete.email === currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Cannot Delete",
        text: "You cannot delete your own account.",
      });
      return;
    }

    try {
      const result = await Swal.fire({
        title: "Delete User?",
        html: `
          <p>Are you sure you want to delete</p>
          <p><strong>${userToDelete.name || userToDelete.email}</strong>?</p>
          <p class="text-error text-sm mt-2">This action cannot be undone!</p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c97a68",
        cancelButtonColor: "#6d7d56",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/users/${userToDelete._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user. Please try again.",
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
          User Management
        </h1>
        <p className="text-neutral/70">
          Manage user roles and permissions across the platform
        </p>
      </div>

      {/* Filter & Stats */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Role Filter */}
        <div className="form-control w-full md:w-auto">
          <label className="label">
            <span className="label-text font-semibold">Filter by Role:</span>
          </label>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="select select-bordered w-full md:w-64 focus:outline-none focus:border-primary"
          >
            <option value="all">All Users ({users.length})</option>
            <option value="student">
              Students ({users.filter((u) => u.role === "student").length})
            </option>
            <option value="moderator">
              Moderators ({users.filter((u) => u.role === "moderator").length})
            </option>
            <option value="admin">
              Admins ({users.filter((u) => u.role === "admin").length})
            </option>
          </select>
        </div>

        {/* Stats Badge */}
        <div className="stats shadow bg-primary/10 border border-primary/20">
          <div className="stat py-3 px-6">
            <div className="stat-figure text-primary">
              <HiOutlineUsers className="text-3xl" />
            </div>
            <div className="stat-title text-xs">Showing</div>
            <div className="stat-value text-2xl text-primary">
              {filteredUsers.length}
            </div>
            <div className="stat-desc">
              {roleFilter === "all" ? "Total Users" : `${roleFilter}s`}
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <HiOutlineUsers className="text-8xl text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral mb-2">
            No Users Found
          </h3>
          <p className="text-neutral/70">
            {roleFilter === "all"
              ? "No users registered yet."
              : `No users with ${roleFilter} role found.`}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-md">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="text-neutral font-semibold">Photo</th>
                    <th className="text-neutral font-semibold">Name</th>
                    <th className="text-neutral font-semibold">Email</th>
                    <th className="text-neutral font-semibold">Role</th>
                    <th className="text-neutral font-semibold">Joined</th>
                    <th className="text-neutral font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => {
                    const roleBadge = getRoleBadge(user.role);
                    return (
                      <tr key={user._id} className="hover:bg-base-200/50">
                        <td>
                          <div className="avatar">
                            <div className="w-10 h-10 rounded-full">
                              {user.photoURL ? (
                                <img
                                  src={user.photoURL}
                                  alt={user.name}
                                  className="object-cover"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="bg-primary/20 flex items-center justify-center">
                                  <HiOutlineUserCircle className="text-2xl text-primary" />
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="font-medium">{user.name || "N/A"}</td>
                        <td className="text-sm text-neutral/70">
                          {user.email}
                        </td>
                        <td>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 w-fit ${roleBadge.class}`}
                          >
                            {roleBadge.icon}
                            {user.role}
                          </span>
                        </td>
                        <td className="text-sm text-neutral/70">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleOpenRoleModal(user)}
                              className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                              title="Change Role"
                              disabled={user.email === currentUser?.email}
                            >
                              <HiOutlineShieldCheck className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user)}
                              className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                              title="Delete User"
                              disabled={user.email === currentUser?.email}
                            >
                              <HiOutlineTrash className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {filteredUsers.map((user) => {
              const roleBadge = getRoleBadge(user.role);
              return (
                <div
                  key={user._id}
                  className="bg-white rounded-xl shadow-md p-5 space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full">
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.name}
                            className="object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="bg-primary/20 flex items-center justify-center">
                            <HiOutlineUserCircle className="text-3xl text-primary" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-neutral text-lg">
                        {user.name || "N/A"}
                      </h3>
                      <p className="text-sm text-neutral/70 break-all">
                        {user.email}
                      </p>
                      <span
                        className={`mt-2 inline-flex px-3 py-1 rounded-full text-xs font-semibold border items-center gap-1 ${roleBadge.class}`}
                      >
                        {roleBadge.icon}
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-neutral/70">
                    <span className="font-semibold">Joined:</span>{" "}
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-neutral/10">
                    <button
                      onClick={() => handleOpenRoleModal(user)}
                      className="btn btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-content border-0 flex-1"
                      disabled={user.email === currentUser?.email}
                    >
                      <HiOutlineShieldCheck className="w-4 h-4" />
                      Change Role
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-sm bg-error/10 text-error hover:bg-error hover:text-error-content border-0 flex-1"
                      disabled={user.email === currentUser?.email}
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-neutral mb-4">
              Change User Role
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-base-200/50 rounded-lg">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full">
                    {selectedUser.photoURL ? (
                      <img
                        src={selectedUser.photoURL}
                        alt={selectedUser.name}
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="bg-primary/20 flex items-center justify-center">
                        <HiOutlineUserCircle className="text-2xl text-primary" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-neutral">
                    {selectedUser.name || "N/A"}
                  </p>
                  <p className="text-sm text-neutral/70">
                    {selectedUser.email}
                  </p>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Current Role: {selectedUser.role}
                  </span>
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="select select-bordered w-full focus:outline-none focus:border-primary"
                >
                  <option value="student">Student</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <label className="label">
                  <span className="label-text-alt text-neutral/60">
                    Select the new role for this user
                  </span>
                </label>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => {
                  setShowRoleModal(false);
                  setNewRole("");
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleChangeRole}
                className="btn bg-primary text-primary-content hover:bg-secondary"
              >
                Update Role
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowRoleModal(false);
              setNewRole("");
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
