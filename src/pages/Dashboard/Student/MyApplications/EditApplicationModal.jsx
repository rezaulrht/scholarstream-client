import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const EditApplicationModal = ({ application, isOpen, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (application) {
      reset({
        phone: application.phone || "",
        dateOfBirth: application.dateOfBirth || "",
        gender: application.gender || "",
        currentUniversity: application.currentUniversity || "",
        cgpa: application.cgpa || "",
      });
    }
  }, [application, reset]);

  const onSubmit = async (data) => {
    try {
      await axiosSecure.patch(`/applications/${application._id}`, data);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Application has been updated successfully",
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating application:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Failed to update application",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-xl mb-4">Edit Application</h3>
        <p className="text-sm text-base-content/70 mb-4">
          Update your application details for {application?.scholarshipName}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Phone */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number *</span>
            </label>
            <input
              type="tel"
              {...register("phone", { required: true })}
              className="input input-bordered w-full"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <span className="text-error text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Date of Birth *</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: true,
              })}
              className="input input-bordered w-full"
            />
            {errors.dateOfBirth && (
              <span className="text-error text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Gender */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender *</span>
            </label>
            <select
              {...register("gender", { required: true })}
              className="select select-bordered w-full"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <span className="text-error text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* Current University */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Current University *</span>
            </label>
            <input
              type="text"
              {...register("currentUniversity", {
                required: true,
              })}
              className="input input-bordered w-full"
              placeholder="Enter your current university"
            />
            {errors.currentUniversity && (
              <span className="text-error text-sm mt-1">
                This field is required
              </span>
            )}
          </div>

          {/* CGPA */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">CGPA (Out of 4) *</span>
            </label>
            <input
              type="number"
              step="0.01"
              {...register("cgpa", {
                required: true,
                min: { value: 0, message: "CGPA must be at least 0" },
                max: { value: 4, message: "CGPA must not exceed 4" },
                valueAsNumber: true,
              })}
              className="input input-bordered w-full"
              placeholder="Enter CGPA (0-4)"
            />
            {errors.cgpa && (
              <span className="text-error text-sm mt-1">
                {errors.cgpa.message || "This field is required"}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="modal-action">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Updating...
                </>
              ) : (
                "Update Application"
              )}
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default EditApplicationModal;
