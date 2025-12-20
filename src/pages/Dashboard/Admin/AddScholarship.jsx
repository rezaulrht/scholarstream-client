import { useForm } from "react-hook-form";

import useAxios from "../../../hooks/useAxios";
import {
  HiAcademicCap,
  HiCalendar,
  HiCurrencyDollar,
  HiGlobeAlt,
  HiOfficeBuilding,
  HiUser,
} from "react-icons/hi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const navigate = useNavigate();

  const handleAddScholarship = async (data) => {
    try {
      const uploadToast = toast.loading("Uploading university image...");
      const imgbb_api = import.meta.env.VITE_IMGBB_API_KEY;
      const formData = new FormData();
      formData.append("image", data.universityImage[0]);

      const image_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api}`;

      const imageResponse = await axios.post(image_api_url, formData);
      const universityImageURL = imageResponse.data.data.url;
      toast.dismiss(uploadToast);
      toast.success("Image uploaded successfully!");

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
        scholarshipPostDate: new Date().toISOString(),
        postedUserEmail: user.email,
        scholarshipDescription: data.scholarshipDescription,
      };

      const addToast = toast.loading("Adding scholarship...");
      await axiosSecure.post("/add-scholarship", scholarshipData);
      toast.dismiss(addToast);

      Swal.fire({
        title: "Success!",
        text: "Scholarship has been added successfully!",
        icon: "success",
        confirmButtonColor: "#6ba96a",
        confirmButtonText: "View All Scholarships",
        showCancelButton: true,
        cancelButtonText: "Add Another",
        cancelButtonColor: "#c97a68",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/all-scholarships");
        } else {
          reset();
        }
      });
    } catch (error) {
      console.error("Error adding scholarship:", error);
      toast.error("Failed to add scholarship. Please try again!");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-neutral mb-2">
              Add New Scholarship
            </h1>
            <p className="text-neutral/70">
              Fill in the details to add a new scholarship opportunity
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <form
              onSubmit={handleSubmit(handleAddScholarship)}
              className="space-y-6"
            >
              {/* Scholarship Name */}
              <div>
                <label className="block text-sm font-medium text-neutral mb-2">
                  Scholarship Name <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <HiAcademicCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                  <input
                    type="text"
                    {...register("scholarshipName", { required: true })}
                    placeholder="e.g., Full Tuition Merit Scholarship"
                    className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
                {errors.scholarshipName && (
                  <p className="text-sm text-error mt-1">
                    Scholarship name is required
                  </p>
                )}
              </div>

              {/* University Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    University Name <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <HiOfficeBuilding className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <input
                      type="text"
                      {...register("universityName", { required: true })}
                      placeholder="e.g., Harvard University"
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.universityName && (
                    <p className="text-sm text-error mt-1">
                      University name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    University World Rank <span className="text-error">*</span>
                  </label>
                  <input
                    type="number"
                    {...register("universityWorldRank", {
                      required: true,
                      min: 1,
                    })}
                    placeholder="e.g., 1"
                    className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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
                  University Logo/Image <span className="text-error">*</span>
                </label>
                <input
                  type="file"
                  {...register("universityImage", { required: true })}
                  accept="image/*"
                  className="file-input file-input-bordered w-full rounded-xl border-2 border-neutral/20 focus:border-primary hover:border-primary transition-colors"
                />
                {errors.universityImage && (
                  <p className="text-sm text-error mt-1">
                    University image is required
                  </p>
                )}
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Country <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <HiGlobeAlt className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <select
                      {...register("universityCountry", { required: true })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none"
                    >
                      <option value="">Select Country</option>
                      <option value="USA">USA</option>
                      <option value="UK">UK</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                      <option value="China">China</option>
                    </select>
                  </div>
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
                    placeholder="e.g., Cambridge"
                    className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                  />
                  {errors.universityCity && (
                    <p className="text-sm text-error mt-1">City is required</p>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Scholarship Category <span className="text-error">*</span>
                  </label>
                  <select
                    {...register("scholarshipCategory", { required: true })}
                    className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
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

              {/* Fees and Amount */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Tuition Fees (USD)
                  </label>
                  <div className="relative">
                    <HiCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <input
                      type="number"
                      step="0.01"
                      {...register("tuitionFees", { min: 0 })}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Application Fees (USD) <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <HiCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <input
                      type="number"
                      step="0.01"
                      {...register("applicationFees", {
                        required: true,
                        min: 0,
                      })}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.applicationFees && (
                    <p className="text-sm text-error mt-1">
                      Valid fee is required
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Service Charge (USD) <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <HiCurrencyDollar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <input
                      type="number"
                      step="0.01"
                      {...register("serviceCharge", { required: true, min: 0 })}
                      placeholder="0.00"
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.serviceCharge && (
                    <p className="text-sm text-error mt-1">
                      Valid charge is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral mb-2">
                    Application Deadline <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <HiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
                    <input
                      type="date"
                      {...register("applicationDeadline", { required: true })}
                      className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                  {errors.applicationDeadline && (
                    <p className="text-sm text-error mt-1">
                      Deadline is required
                    </p>
                  )}
                </div>
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
                  placeholder="Provide a detailed description of the scholarship..."
                  className="w-full px-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
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

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Adding Scholarship..." : "Add Scholarship"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddScholarship;
