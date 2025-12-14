import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";
import { HiAcademicCap, HiUser, HiDocument, HiBookOpen } from "react-icons/hi";
import Swal from "sweetalert2";

const ApplicationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const scholarship = location.state?.scholarship;
  const [isSavingLater, setIsSavingLater] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm();

  const onSubmitPay = async (data) => {
    try {
      // First save the application
      const applicationData = {
        scholarshipId: scholarship._id,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        degree: scholarship.degree,
        userEmail: user?.email,
        userName: user?.displayName,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        currentUniversity: data.currentUniversity,
        cgpa: data.cgpa,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        totalAmount:
          (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0),
        paymentStatus: "unpaid",
        applicationStatus: "pending",
        appliedAt: new Date(),
      };

      const response = await axiosSecure.post("/applications", applicationData);

      if (response.data.insertedId) {
        // Create payment session
        const paymentInfo = {
          applicationId: response.data.insertedId,
          scholarshipId: scholarship._id,
          scholarshipName: scholarship.scholarshipName,
          universityName: scholarship.universityName,
          userEmail: user?.email,
          totalAmount: applicationData.totalAmount,
        };

        const paymentResponse = await axiosSecure.post(
          "/create-checkout-session",
          paymentInfo
        );

        if (paymentResponse.data.url) {
          // Redirect to Stripe checkout
          window.location.href = paymentResponse.data.url;
        }
      }
    } catch (error) {
      console.error("Error during payment:", error);
      if (error.response?.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Already Applied",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Failed to initiate payment. Please try again.",
        });
      }
    }
  };

  const handlePayLater = async () => {
    const data = getValues();
    setIsSavingLater(true);

    try {
      const applicationData = {
        scholarshipId: scholarship._id,
        userId: user?.uid,
        userName: user?.displayName,
        userEmail: user?.email,
        scholarshipName: scholarship.scholarshipName,
        universityName: scholarship.universityName,
        universityCountry: scholarship.universityCountry,
        scholarshipCategory: scholarship.scholarshipCategory,
        subjectCategory: scholarship.subjectCategory,
        degree: scholarship.degree,
        applicationFees: scholarship.applicationFees,
        serviceCharge: scholarship.serviceCharge,
        totalAmount:
          (scholarship.applicationFees || 0) + (scholarship.serviceCharge || 0),
        applicationStatus: "pending",
        paymentStatus: "unpaid",
        appliedAt: new Date(),
        feedback: "",
        // Application form data
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        currentUniversity: data.currentUniversity,
        cgpa: data.cgpa,
      };

      const response = await axiosSecure.post("/applications", applicationData);

      if (response.data.insertedId) {
        toast.success(
          "Application saved! You can pay later from your dashboard."
        );
        navigate("/dashboard/my-applications");
      }
    } catch (error) {
      console.error("Error saving application:", error);
      toast.error(
        error.response?.data?.message || "Failed to save application"
      );
    } finally {
      setIsSavingLater(false);
    }
  };

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            No Scholarship Selected
          </h2>
          <button
            onClick={() => navigate("/all-scholarships")}
            className="btn btn-primary"
          >
            Browse Scholarships
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Scholarship Application
          </h1>
          <p className="text-center text-base-content/70 mb-8">
            Complete your application to proceed
          </p>

          <form onSubmit={handleSubmit(onSubmitPay)}>
            {/* Scholarship Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiBookOpen className="text-primary text-3xl" />
                Scholarship Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Scholarship Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={scholarship.scholarshipName || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      University Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={scholarship.universityName || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Scholarship Category
                    </span>
                  </label>
                  <input
                    type="text"
                    value={scholarship.scholarshipCategory || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Degree</span>
                  </label>
                  <input
                    type="text"
                    value={scholarship.degree || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Application Fees
                    </span>
                  </label>
                  <input
                    type="text"
                    value={`$${scholarship.applicationFees || 0}`}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Service Charge
                    </span>
                  </label>
                  <input
                    type="text"
                    value={`$${scholarship.serviceCharge || 0}`}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Amount:</span>
                  <span className="text-2xl font-bold text-primary">
                    $
                    {(scholarship.applicationFees || 0) +
                      (scholarship.serviceCharge || 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiUser className="text-primary text-3xl" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Full Name</span>
                  </label>
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="input input-bordered bg-base-200"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Phone Number <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: true,
                      pattern: {
                        value: /^[0-9+\-\s()]+$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                    placeholder="Enter your phone number"
                    className={`input input-bordered ${
                      errors.phone ? "input-error" : ""
                    }`}
                  />
                  {errors.phone && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.phone.type === "required"
                          ? "Phone number is required"
                          : errors.phone.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Date of Birth <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="date"
                    {...register("dateOfBirth", {
                      required: true,
                    })}
                    className={`input input-bordered ${
                      errors.dateOfBirth ? "input-error" : ""
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        Date of birth is required
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Gender <span className="text-error">*</span>
                    </span>
                  </label>
                  <select
                    {...register("gender", {
                      required: true,
                    })}
                    className={`select select-bordered ${
                      errors.gender ? "select-error" : ""
                    }`}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  {errors.gender && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        Please select your gender
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Academic Information Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiAcademicCap className="text-primary text-3xl" />
                Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Current University <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    {...register("currentUniversity", {
                      required: true,
                      minLength: {
                        value: 3,
                        message:
                          "University name must be at least 3 characters",
                      },
                    })}
                    placeholder="Enter your current university"
                    className={`input input-bordered ${
                      errors.currentUniversity ? "input-error" : ""
                    }`}
                  />
                  {errors.currentUniversity && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.currentUniversity.type === "required"
                          ? "Current university is required"
                          : errors.currentUniversity.message}
                      </span>
                    </label>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      CGPA/GPA <span className="text-error">*</span>
                    </span>
                  </label>
                  <input
                    type="number"
                    {...register("cgpa", {
                      required: true,
                      min: {
                        value: 0,
                        message: "CGPA must be at least 0",
                      },
                      max: {
                        value: 4,
                        message: "CGPA cannot exceed 4.0",
                      },
                    })}
                    placeholder="e.g., 3.75"
                    step="0.01"
                    className={`input input-bordered ${
                      errors.cgpa ? "input-error" : ""
                    }`}
                  />
                  {errors.cgpa && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.cgpa.type === "required"
                          ? "CGPA is required"
                          : errors.cgpa.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <HiDocument className="text-primary text-3xl" />
                Supporting Documents
              </h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">
                    Upload Documents (Optional)
                  </span>
                  <span className="label-text-alt text-base-content/60">
                    Transcript, CV, ID, Recommendation, etc.
                  </span>
                </label>
                <input
                  type="file"
                  {...register("documents")}
                  className="file-input file-input-bordered w-full"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                  </span>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6 border-t">
              <button
                type="button"
                onClick={handlePayLater}
                disabled={isSavingLater || isSubmitting}
                className="btn btn-outline btn-secondary"
              >
                {isSavingLater ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Saving...
                  </>
                ) : (
                  "Save & Pay Later"
                )}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSavingLater || isSubmitting}
              >
                Proceed to Pay
                <span className="font-bold">
                  $
                  {(scholarship.applicationFees || 0) +
                    (scholarship.serviceCharge || 0)}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
