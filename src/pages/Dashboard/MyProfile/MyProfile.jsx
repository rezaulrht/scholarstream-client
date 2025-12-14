import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiOutlineUser,
  HiOutlinePencil,
  HiOutlineCamera,
} from "react-icons/hi2";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoFile: null,
  });

  // Fetch user details from database
  const {
    data: userDetails,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/users/${user.email}`);
      return response.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!formData.displayName.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Name",
        text: "Please enter your name",
      });
      return;
    }

    const loadingToast = toast.loading("Updating your profile...");

    try {
      let photoURL = user?.photoURL;

      // If user uploaded a new photo, upload to ImgBB first
      if (formData.photoFile) {
        const imgbb_api = import.meta.env.VITE_IMGBB_API_KEY;
        const formDataImg = new FormData();
        formDataImg.append("image", formData.photoFile);

        const image_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api}`;

        try {
          const result = await axios.post(image_api_url, formDataImg);
          photoURL = result.data.data.url;
        } catch {
          toast.dismiss(loadingToast);
          toast.error("Failed to upload profile image!");
          return;
        }
      }

      // Update Firebase Auth profile
      await updateUserProfile(formData.displayName, photoURL);

      // Update database
      await axiosSecure.patch(`/users/${user.email}`, {
        displayName: formData.displayName,
        photoURL: photoURL,
      });

      toast.dismiss(loadingToast);
      toast.success("Profile updated successfully!");

      setIsEditing(false);
      setFormData({
        displayName: formData.displayName,
        photoFile: null,
      });
      refetch();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to update profile. Please try again!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">My Profile</h1>
        <p className="text-neutral/60 mt-2">
          View and manage your profile information
        </p>
      </div>

      <div className="card bg-base-300 shadow-xl border border-neutral/10">
        <div className="card-body">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                <img
                  src={user?.photoURL || "/default-avatar.png"}
                  alt={user?.displayName}
                />
              </div>
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-neutral">
                {user?.displayName}
              </h2>
              <p className="text-neutral/70">{user?.email}</p>
              <div className="mt-2">
                <span className="badge badge-primary badge-lg">
                  {userDetails?.role || "Student"}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-primary btn-sm md:btn-md"
            >
              <HiOutlinePencil className="text-lg" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Information */}
          {!isEditing ? (
            <div className="space-y-6">
              <div className="divider text-neutral font-semibold">
                Account Information
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Full Name
                    </span>
                  </label>
                  <div className="p-3 bg-base-100 rounded-lg border border-neutral/20">
                    <p className="text-neutral">{user?.displayName || "N/A"}</p>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Email Address
                    </span>
                  </label>
                  <div className="p-3 bg-base-100 rounded-lg border border-neutral/20">
                    <p className="text-neutral">{user?.email}</p>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Role
                    </span>
                  </label>
                  <div className="p-3 bg-base-100 rounded-lg border border-neutral/20">
                    <p className="text-neutral capitalize">
                      {userDetails?.role || "Student"}
                    </p>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Member Since
                    </span>
                  </label>
                  <div className="p-3 bg-base-100 rounded-lg border border-neutral/20">
                    <p className="text-neutral">
                      {userDetails?.createdAt
                        ? new Date(userDetails.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-neutral">
                    Profile Photo URL
                  </span>
                </label>
                <div className="p-3 bg-base-100 rounded-lg border border-neutral/20 break-all">
                  <p className="text-neutral text-sm">
                    {user?.photoURL || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Edit Form */
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              <div className="divider text-neutral font-semibold">
                Edit Profile Information
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Full Name <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) =>
                      setFormData({ ...formData, displayName: e.target.value })
                    }
                    className="input input-bordered"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Profile Photo
                    </span>
                  </label>
                  <div className="relative">
                    <HiOutlineCamera className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50 z-10 pointer-events-none" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          photoFile: e.target.files[0],
                        })
                      }
                      className="file-input file-input-bordered w-full pl-12 rounded-xl border-2 border-neutral/20 focus:border-primary hover:border-primary transition-colors"
                    />
                  </div>
                  <label className="label">
                    <span className="label-text-alt text-neutral/60">
                      {formData.photoFile
                        ? formData.photoFile.name
                        : "Choose a new profile photo (optional)"}
                    </span>
                  </label>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold text-neutral">
                      Email Address
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user?.email}
                    className="input input-bordered"
                    disabled
                  />
                  <label className="label">
                    <span className="label-text-alt text-neutral/60">
                      Email cannot be changed
                    </span>
                  </label>
                </div>
              </div>
              <div className="card-actions justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      displayName: user?.displayName || "",
                      photoFile: null,
                    });
                  }}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="stat bg-base-300 rounded-lg border border-neutral/10">
          <div className="stat-figure text-primary">
            <HiOutlineUser className="text-4xl" />
          </div>
          <div className="stat-title text-neutral/70">Account Type</div>
          <div className="stat-value text-2xl text-neutral capitalize">
            {userDetails?.role || "Student"}
          </div>
          <div className="stat-desc text-neutral/60">Active account</div>
        </div>
        <div className="stat bg-base-300 rounded-lg border border-neutral/10">
          <div className="stat-figure text-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-10 h-10 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-neutral/70">Profile Status</div>
          <div className="stat-value text-2xl text-success">Complete</div>
          <div className="stat-desc text-success/70">Profile is up to date</div>
        </div>
        <div className="stat bg-base-300 rounded-lg border border-neutral/10">
          <div className="stat-figure text-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-10 h-10 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <div className="stat-title text-neutral/70">Member Since</div>
          <div className="stat-value text-2xl text-info">
            {userDetails?.createdAt
              ? new Date(userDetails.createdAt).getFullYear()
              : "2025"}
          </div>
          <div className="stat-desc text-info/70">Years of membership</div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
