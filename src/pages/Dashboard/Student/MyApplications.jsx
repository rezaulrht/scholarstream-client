import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCreditCard,
  HiOutlineStar,
} from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

  // Fetch applications using TanStack Query
  const {
    data: applications = [],
    isLoading: loading,
    refetch,
    isError,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/applications/user/${user.email}`
      );
      return response.data;
    },
    enabled: !!user?.email,
  });

  // Fetch user's reviews and transform to map
  const { data: userReviews = {} } = useQuery({
    queryKey: ["my-reviews", user?.email],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reviews/user/${user.email}`);
      return response.data;
    },
    select: (reviews) => {
      const reviewMap = {};
      reviews.forEach((review) => {
        reviewMap[review.scholarshipId] = review;
      });
      return reviewMap;
    },
    enabled: !!user?.email,
  });

  // Show error if query fails
  if (isError) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to load applications",
    });
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${id}`);
        Swal.fire("Deleted!", "Your application has been deleted.", "success");
        refetch();
      } catch (error) {
        console.error("Error deleting application:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete application",
        });
      }
    }
  };

  const handlePay = (application) => {
    // Navigate back to apply page with application data
    navigate(`/apply/${application.scholarshipId}`, {
      state: {
        scholarship: {
          _id: application.scholarshipId,
          scholarshipName: application.scholarshipName,
          universityName: application.universityName,
          applicationFees: application.applicationFees,
          serviceCharge: application.serviceCharge,
        },
        existingApplication: application,
      },
    });
  };

  const handleAddReview = async () => {
    if (!reviewData.comment.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Comment",
        text: "Please write a review comment",
      });
      return;
    }

    try {
      const review = {
        scholarshipId: selectedApplication.scholarshipId,
        scholarshipName: selectedApplication.scholarshipName,
        universityName: selectedApplication.universityName,
        userName: user?.displayName,
        userEmail: user?.email,
        userImage: user?.photoURL,
        ratingPoint: reviewData.rating,
        reviewComment: reviewData.comment,
        reviewDate: new Date(),
      };

      await axiosSecure.post("/reviews", review);
      Swal.fire({
        icon: "success",
        title: "Review Added",
        text: "Your review has been submitted successfully",
      });

      setShowReviewModal(false);
      setReviewData({ rating: 5, comment: "" });
      refetch();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit review",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="mb-6">
          <HiOutlineBookOpen className="text-8xl text-primary/50 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-2">No Applications Yet</h2>
        <p className="text-base-content/70 mb-6">
          You haven't applied for any scholarships yet.
        </p>
        <button
          onClick={() => navigate("/all-scholarships")}
          className="btn btn-primary"
        >
          Browse Scholarships
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral">My Applications</h1>
        <p className="text-neutral/60 mt-2">
          Track and manage your scholarship applications
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto bg-base-300 rounded-lg shadow-md border border-neutral/10">
        <table className="table">
          <thead className="bg-primary/20">
            <tr>
              <th className="text-neutral font-semibold">Scholarship Name</th>
              <th className="text-neutral font-semibold">University</th>
              <th className="text-neutral font-semibold">Address</th>
              <th className="text-neutral font-semibold">Subject</th>
              <th className="text-neutral font-semibold">Fees</th>
              <th className="text-neutral font-semibold">Status</th>
              <th className="text-neutral font-semibold">Payment</th>
              <th className="text-neutral font-semibold">Feedback</th>
              <th className="text-neutral font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr
                key={app._id}
                className="hover:bg-primary/5 transition-colors"
              >
                <td className="font-semibold text-neutral">
                  {app.scholarshipName}
                </td>
                <td className="text-sm text-neutral/70">
                  {app.universityName}
                </td>
                <td className="text-sm text-neutral/70">
                  {app.universityCountry || "N/A"}
                </td>
                <td className="text-neutral/80">
                  {app.subjectCategory || "N/A"}
                </td>
                <td className="font-semibold text-primary">
                  ${app.applicationFees || 0}
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.applicationStatus === "accepted"
                        ? "bg-success/20 text-success border-success/30"
                        : app.applicationStatus === "processing"
                        ? "bg-info/20 text-info border-info/30"
                        : app.applicationStatus === "rejected"
                        ? "bg-error/20 text-error border-error/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }`}
                  >
                    {app.applicationStatus || "pending"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-error/20 text-error border-error/30"
                    }`}
                  >
                    {app.paymentStatus || "unpaid"}
                  </span>
                </td>
                <td className="max-w-xs truncate text-sm text-neutral/70">
                  {app.feedback || (
                    <span className="italic text-neutral/40">
                      No feedback yet
                    </span>
                  )}
                </td>
                <td>
                  <div className="flex gap-2 flex-wrap">
                    {/* Details Button */}
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setShowDetailsModal(true);
                      }}
                      className="btn btn-ghost btn-sm"
                      title="View Details"
                    >
                      <HiOutlineEye className="text-lg" />
                    </button>

                    {/* Edit Button - Only if pending */}
                    {app.applicationStatus === "pending" && (
                      <button
                        className="btn btn-ghost btn-sm hover:bg-accent/20 hover:text-accent"
                        title="Edit Application"
                      >
                        <HiOutlinePencil className="text-lg" />
                      </button>
                    )}

                    {/* Pay Button - Only if pending and unpaid */}
                    {app.applicationStatus === "pending" &&
                      app.paymentStatus === "unpaid" && (
                        <button
                          onClick={() => handlePay(app)}
                          className="btn btn-primary btn-sm"
                          title="Make Payment"
                        >
                          <HiOutlineCreditCard className="text-lg" />
                        </button>
                      )}

                    {/* Delete Button - Only if pending */}
                    {app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                        title="Delete Application"
                      >
                        <HiOutlineTrash className="text-lg" />
                      </button>
                    )}

                    {/* Add Review Button - Only if accepted and no review yet */}
                    {app.applicationStatus === "accepted" &&
                      !userReviews[app.scholarshipId] && (
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setReviewData({ rating: 5, comment: "" });
                            setShowReviewModal(true);
                          }}
                          className="btn btn-success btn-sm"
                          title="Add Review"
                        >
                          <HiOutlineStar className="text-lg" />
                        </button>
                      )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {applications.map((app) => (
          <div
            key={app._id}
            className="card bg-base-300 shadow-md border border-neutral/10"
          >
            <div className="card-body">
              <h3 className="card-title text-lg text-neutral">
                {app.scholarshipName}
              </h3>
              <div className="space-y-2 text-sm text-neutral/80">
                <p>
                  <span className="font-semibold text-neutral">
                    University:
                  </span>{" "}
                  {app.universityName}
                </p>
                <p>
                  <span className="font-semibold text-neutral">Address:</span>{" "}
                  {app.universityCountry || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-neutral">Subject:</span>{" "}
                  {app.subjectCategory || "N/A"}
                </p>
                <p>
                  <span className="font-semibold text-neutral">Fees:</span>{" "}
                  <span className="text-primary font-bold">
                    ${app.applicationFees || 0}
                  </span>
                </p>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-neutral">Status:</span>
                  <span
                    className={`badge ${
                      app.applicationStatus === "accepted"
                        ? "bg-success/20 text-success border-success/30"
                        : app.applicationStatus === "processing"
                        ? "bg-info/20 text-info border-info/30"
                        : app.applicationStatus === "rejected"
                        ? "bg-error/20 text-error border-error/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }`}
                  >
                    {app.applicationStatus || "pending"}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-semibold text-neutral">Payment:</span>
                  <span
                    className={`badge ${
                      app.paymentStatus === "paid"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-error/20 text-error border-error/30"
                    }`}
                  >
                    {app.paymentStatus || "unpaid"}
                  </span>
                </div>
                {app.feedback && (
                  <p>
                    <span className="font-semibold text-neutral">
                      Feedback:
                    </span>{" "}
                    <span className="text-neutral/70">{app.feedback}</span>
                  </p>
                )}
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => {
                    setSelectedApplication(app);
                    setShowDetailsModal(true);
                  }}
                  className="btn btn-sm btn-ghost"
                >
                  <HiOutlineEye /> Details
                </button>
                {app.applicationStatus === "pending" && (
                  <>
                    {app.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePay(app)}
                        className="btn btn-sm btn-primary"
                      >
                        <HiOutlineCreditCard /> Pay
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-sm btn-error"
                    >
                      <HiOutlineTrash /> Delete
                    </button>
                  </>
                )}
                {app.applicationStatus === "accepted" &&
                  !userReviews[app.scholarshipId] && (
                    <button
                      onClick={() => {
                        setSelectedApplication(app);
                        setReviewData({ rating: 5, comment: "" });
                        setShowReviewModal(true);
                      }}
                      className="btn btn-sm btn-success"
                    >
                      <HiOutlineStar /> Review
                    </button>
                  )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto bg-base-300 border border-neutral/10">
            <h3 className="font-bold text-lg md:text-2xl mb-4 text-neutral">
              Application Details
            </h3>
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-neutral/60">Scholarship Name</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.scholarshipName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">University</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.universityName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Degree</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.degree || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Category</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.scholarshipCategory || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Subject Category</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.subjectCategory || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Applicant Name</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.userName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Email</p>
                  <p className="font-semibold text-neutral text-xs">
                    {selectedApplication.userEmail}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Phone</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.phone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Date of Birth</p>
                  <p className="font-semibold text-neutral">
                    {new Date(
                      selectedApplication.dateOfBirth
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Gender</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Current University</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.currentUniversity}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">CGPA</p>
                  <p className="font-semibold text-neutral">
                    {selectedApplication.cgpa}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Application Fees</p>
                  <p className="font-semibold text-neutral">
                    ${selectedApplication.applicationFees || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Service Charge</p>
                  <p className="font-semibold text-neutral">
                    ${selectedApplication.serviceCharge || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Total Amount</p>
                  <p className="font-bold text-primary text-lg">
                    ${selectedApplication.totalAmount || 0}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-neutral/60">Applied Date</p>
                  <p className="font-semibold text-neutral">
                    {new Date(
                      selectedApplication.appliedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-neutral/60 mb-2">
                  Application Status
                </p>
                <span
                  className={`badge badge-sm md:badge-lg ${
                    selectedApplication.applicationStatus === "accepted"
                      ? "bg-success/20 text-success border-success/30"
                      : selectedApplication.applicationStatus === "processing"
                      ? "bg-info/20 text-info border-info/30"
                      : selectedApplication.applicationStatus === "rejected"
                      ? "bg-error/20 text-error border-error/30"
                      : "bg-warning/20 text-warning border-warning/30"
                  }`}
                >
                  {selectedApplication.applicationStatus || "pending"}
                </span>
              </div>
              <div>
                <p className="text-sm text-neutral/60 mb-2">Payment Status</p>
                <span
                  className={`badge badge-sm md:badge-lg ${
                    selectedApplication.paymentStatus === "paid"
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-error/20 text-error border-error/30"
                  }`}
                >
                  {selectedApplication.paymentStatus || "unpaid"}
                </span>
              </div>
              {selectedApplication.feedback && (
                <div>
                  <p className="text-sm text-neutral/60 mb-2">
                    Moderator Feedback
                  </p>
                  <p className="p-3 md:p-4 bg-primary/5 border border-primary/20 rounded-lg text-sm text-neutral/80">
                    {selectedApplication.feedback}
                  </p>
                </div>
              )}
            </div>
            <div className="modal-action">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="btn btn-sm md:btn-md btn-ghost"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Review Modal */}
      {showReviewModal && selectedApplication && (
        <div className="modal modal-open">
          <div className="modal-box bg-base-300 border border-neutral/10">
            <h3 className="font-bold text-2xl mb-4 text-neutral">Add Review</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-neutral/60 mb-2">University</p>
                <p className="font-semibold text-neutral">
                  {selectedApplication.universityName}
                </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Rating</span>
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() =>
                        setReviewData({ ...reviewData, rating: star })
                      }
                      className="btn btn-ghost btn-sm"
                    >
                      <HiOutlineStar
                        className={`text-2xl ${
                          star <= reviewData.rating
                            ? "fill-warning text-warning"
                            : "text-base-content/30"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Your Review</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  placeholder="Share your experience with this scholarship..."
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewData({ rating: 5, comment: "" });
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button onClick={handleAddReview} className="btn btn-primary">
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
