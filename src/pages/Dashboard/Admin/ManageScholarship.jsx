import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineAcademicCap,
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlineEye,
} from "react-icons/hi2";
import { useForm } from "react-hook-form";
import useAxios from "../../../hooks/useAxios";
import toast from "react-hot-toast";

const ManageScholarship = () => {
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch all scholarships
  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-scholarships"],
    queryFn: async () => {
      const response = await axiosSecure.get("/scholarships?limit=1000");
      return response.data.scholarships;
    },
  });

  // Open details modal
  const handleViewDetails = (scholarship) => {
    setSelectedScholarship(scholarship);
    setShowDetailsModal(true);
  };

  // Open edit modal
  const handleOpenEdit = (scholarship) => {
    setSelectedScholarship(scholarship);
    reset(scholarship);
    setShowEditModal(true);
  };

  // Update scholarship
  const handleUpdateScholarship = async (data) => {
    try {
      let universityImageURL = selectedScholarship.universityImage;

      if (data.universityImage && data.universityImage[0]) {
        const uploadToast = toast.loading("Uploading new image...");
        const imgbb_api = import.meta.env.VITE_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append("image", data.universityImage[0]);

        const image_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api}`;
        const imageResponse = await axios.post(image_api_url, formData);
        universityImageURL = imageResponse.data.data.url;
        toast.dismiss(uploadToast);
        toast.success("Image uploaded successfully!");
      }

      const scholarshipData = {
        scholarshipName: data.scholarshipName,
        universityName: data.universityName,
        universityImage: universityImageURL,
        universityCountry: data.universityCountry,
        universityCity: data.universityCity,
        universityWorldRank: parseInt(data.universityWorldRank),
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: data.tuitionFees ? parseFloat(data.tuitionFees) : null,
        applicationFees: parseFloat(data.applicationFees),
        serviceCharge: parseFloat(data.serviceCharge),
        applicationDeadline: data.applicationDeadline,
        scholarshipDescription: data.scholarshipDescription,
      };

      const updateToast = toast.loading("Updating scholarship...");
      await axiosSecure.patch(
        `/scholarships/${selectedScholarship._id}`,
        scholarshipData
      );
      toast.dismiss(updateToast);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Scholarship has been updated successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      setShowEditModal(false);
      refetch();
    } catch (error) {
      console.error("Error updating scholarship:", error);
      toast.error("Failed to update scholarship. Please try again!");
    }
  };

  // Delete scholarship
  const handleDeleteScholarship = async (scholarship) => {
    try {
      const result = await Swal.fire({
        title: "Delete Scholarship?",
        html: `
          <p>Are you sure you want to delete</p>
          <p><strong>${scholarship.scholarshipName}</strong>?</p>
          <p class="text-error text-sm mt-2">This action cannot be undone!</p>
        `,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c97a68",
        cancelButtonColor: "#6d7d56",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.delete(`/scholarships/${scholarship._id}`);
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Scholarship has been deleted successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error("Error deleting scholarship:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete scholarship. Please try again.",
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
          Manage Scholarships
        </h1>
        <p className="text-neutral/70">
          Update or delete scholarship opportunities
        </p>
      </div>

      {/* Stats Badge */}
      <div className="mb-6">
        <div className="stats shadow bg-primary/10 border border-primary/20">
          <div className="stat py-3 px-6">
            <div className="stat-figure text-primary">
              <HiOutlineAcademicCap className="text-3xl" />
            </div>
            <div className="stat-title text-xs">Total Scholarships</div>
            <div className="stat-value text-2xl text-primary">
              {scholarships.length}
            </div>
            <div className="stat-desc">Available on platform</div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {scholarships.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <HiOutlineAcademicCap className="text-8xl text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral mb-2">
            No Scholarships Found
          </h3>
          <p className="text-neutral/70">
            No scholarships have been added yet.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="text-neutral font-semibold">
                      Scholarship Name
                    </th>
                    <th className="text-neutral font-semibold">University</th>
                    <th className="text-neutral font-semibold">Location</th>
                    <th className="text-neutral font-semibold">Category</th>
                    <th className="text-neutral font-semibold">Degree</th>
                    <th className="text-neutral font-semibold">App. Fees</th>
                    <th className="text-neutral font-semibold">Deadline</th>
                    <th className="text-neutral font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((scholarship) => (
                    <tr key={scholarship._id} className="hover:bg-base-200/50">
                      <td className="font-medium">
                        {scholarship.scholarshipName}
                      </td>
                      <td className="text-sm">{scholarship.universityName}</td>
                      <td className="text-sm">
                        {scholarship.universityCity},{" "}
                        {scholarship.universityCountry}
                      </td>
                      <td>
                        <span className="badge badge-sm bg-primary/20 text-primary border-primary/30">
                          {scholarship.scholarshipCategory}
                        </span>
                      </td>
                      <td className="text-sm">{scholarship.degree}</td>
                      <td className="font-semibold text-primary">
                        ${scholarship.applicationFees}
                      </td>
                      <td className="text-sm text-neutral/70">
                        {new Date(
                          scholarship.applicationDeadline
                        ).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(scholarship)}
                            className="btn btn-sm btn-ghost text-info hover:bg-info/10"
                            title="View Details"
                          >
                            <HiOutlineEye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(scholarship)}
                            className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                            title="Edit Scholarship"
                          >
                            <HiOutlinePencil className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteScholarship(scholarship)}
                            className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                            title="Delete Scholarship"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {scholarships.map((scholarship) => (
              <div
                key={scholarship._id}
                className="bg-white rounded-xl shadow-md p-5 space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={scholarship.universityImage}
                    alt={scholarship.universityName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-neutral text-lg">
                      {scholarship.scholarshipName}
                    </h3>
                    <p className="text-sm text-neutral/70">
                      {scholarship.universityName}
                    </p>
                    <span className="mt-2 inline-flex badge badge-sm bg-primary/20 text-primary border-primary/30">
                      {scholarship.scholarshipCategory}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Location:</span>
                    <span className="font-medium text-neutral">
                      {scholarship.universityCity},{" "}
                      {scholarship.universityCountry}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Degree:</span>
                    <span className="font-medium text-neutral">
                      {scholarship.degree}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral/70">App. Fees:</span>
                    <span className="font-semibold text-primary">
                      ${scholarship.applicationFees}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Deadline:</span>
                    <span className="font-medium text-neutral">
                      {new Date(
                        scholarship.applicationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2 border-t border-neutral/10">
                  <button
                    onClick={() => handleViewDetails(scholarship)}
                    className="btn btn-sm bg-info/10 text-info hover:bg-info hover:text-info-content border-0 flex-1"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                    Details
                  </button>
                  <button
                    onClick={() => handleOpenEdit(scholarship)}
                    className="btn btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-content border-0 flex-1"
                  >
                    <HiOutlinePencil className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteScholarship(scholarship)}
                    className="btn btn-sm bg-error/10 text-error hover:bg-error hover:text-error-content border-0 flex-1"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedScholarship && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-xl text-neutral mb-4">
              Scholarship Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedScholarship.universityImage}
                  alt={selectedScholarship.universityName}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg text-neutral">
                    {selectedScholarship.scholarshipName}
                  </h4>
                  <p className="text-neutral/70">
                    {selectedScholarship.universityName}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-neutral/60">Location:</span>
                  <p className="font-medium text-neutral">
                    {selectedScholarship.universityCity},{" "}
                    {selectedScholarship.universityCountry}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">World Rank:</span>
                  <p className="font-medium text-neutral">
                    #{selectedScholarship.universityWorldRank}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Category:</span>
                  <p className="font-medium text-neutral">
                    {selectedScholarship.scholarshipCategory}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Subject:</span>
                  <p className="font-medium text-neutral">
                    {selectedScholarship.subjectCategory}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Degree:</span>
                  <p className="font-medium text-neutral">
                    {selectedScholarship.degree}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Tuition Fees:</span>
                  <p className="font-medium text-neutral">
                    ${selectedScholarship.tuitionFees || "N/A"}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Application Fees:</span>
                  <p className="font-medium text-primary">
                    ${selectedScholarship.applicationFees}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Service Charge:</span>
                  <p className="font-medium text-neutral">
                    ${selectedScholarship.serviceCharge}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Deadline:</span>
                  <p className="font-medium text-neutral">
                    {new Date(
                      selectedScholarship.applicationDeadline
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-neutral/60">Description:</span>
                <p className="text-sm text-neutral/80 mt-2">
                  {selectedScholarship.scholarshipDescription}
                </p>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="btn bg-primary text-primary-content hover:bg-secondary"
              >
                Close
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowDetailsModal(false)}
          ></div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedScholarship && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-xl text-neutral mb-4">
              Edit Scholarship
            </h3>
            <form
              onSubmit={handleSubmit(handleUpdateScholarship)}
              className="space-y-4"
            >
              {/* Scholarship Name */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Scholarship Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  {...register("scholarshipName", { required: true })}
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                />
                {errors.scholarshipName && (
                  <p className="text-sm text-error mt-1">
                    Scholarship name is required
                  </p>
                )}
              </div>

              {/* University Name and Rank */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    University Name <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("universityName", { required: true })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.universityName && (
                    <p className="text-sm text-error mt-1">
                      University name is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    World Rank <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("universityWorldRank", {
                      required: true,
                      min: 1,
                    })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.universityWorldRank && (
                    <p className="text-sm text-error mt-1">
                      World rank is required
                    </p>
                  )}
                </div>
              </div>

              {/* University Image */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  University Image (Optional - leave empty to keep current)
                </label>
                <input
                  type="file"
                  {...register("universityImage")}
                  accept="image/*"
                  className="file-input file-input-bordered w-full focus:border-primary"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Country <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("universityCountry", { required: true })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.universityCountry && (
                    <p className="text-sm text-error mt-1">
                      Country is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    City <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("universityCity", { required: true })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.universityCity && (
                    <p className="text-sm text-error mt-1">City is required</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Scholarship Category <span className="text-error">*</span>
                  </label>
                  <select
                    {...register("scholarshipCategory", { required: true })}
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Category</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                  {errors.scholarshipCategory && (
                    <p className="text-sm text-error mt-1">
                      Category is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Subject Category <span className="text-error">*</span>
                  </label>
                  <select
                    {...register("subjectCategory", { required: true })}
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Subject</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Business">Business</option>
                    <option value="Medical">Medical</option>
                    <option value="Arts">Arts</option>
                    <option value="Science">Science</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Law">Law</option>
                    <option value="Social Sciences">Social Sciences</option>
                  </select>
                  {errors.subjectCategory && (
                    <p className="text-sm text-error mt-1">
                      Subject is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Degree <span className="text-error">*</span>
                  </label>
                  <select
                    {...register("degree", { required: true })}
                    className="select select-bordered w-full focus:outline-none focus:border-primary"
                  >
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                  {errors.degree && (
                    <p className="text-sm text-error mt-1">
                      Degree is required
                    </p>
                  )}
                </div>
              </div>

              {/* Fees */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Tuition Fees (USD)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("tuitionFees", { min: 0 })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Application Fees (USD) <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("applicationFees", { required: true, min: 0 })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.applicationFees && (
                    <p className="text-sm text-error mt-1">
                      Valid fee is required
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Service Charge (USD) <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("serviceCharge", { required: true, min: 0 })}
                    className="input input-bordered w-full focus:outline-none focus:border-primary"
                  />
                  {errors.serviceCharge && (
                    <p className="text-sm text-error mt-1">
                      Valid charge is required
                    </p>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Application Deadline <span className="text-error">*</span>
                </label>
                <input
                  type="date"
                  {...register("applicationDeadline", { required: true })}
                  className="input input-bordered w-full focus:outline-none focus:border-primary"
                />
                {errors.applicationDeadline && (
                  <p className="text-sm text-error mt-1">
                    Deadline is required
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Scholarship Description <span className="text-error">*</span>
                </label>
                <textarea
                  {...register("scholarshipDescription", {
                    required: true,
                    minLength: 50,
                  })}
                  rows="4"
                  className="textarea textarea-bordered w-full focus:outline-none focus:border-primary resize-none"
                ></textarea>
                {errors.scholarshipDescription?.type === "required" && (
                  <p className="text-sm text-error mt-1">
                    Description is required
                  </p>
                )}
                {errors.scholarshipDescription?.type === "minLength" && (
                  <p className="text-sm text-error mt-1">
                    Description must be at least 50 characters
                  </p>
                )}
              </div>

              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-primary text-primary-content hover:bg-secondary disabled:opacity-50"
                >
                  {isSubmitting ? "Updating..." : "Update Scholarship"}
                </button>
              </div>
            </form>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowEditModal(false)}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarship;
