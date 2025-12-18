import { useState } from "react";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../components/Loading/Loading";
import {
  HiOutlineEye,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCreditCard,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCheckBadge,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import { HiOutlineBookOpen } from "react-icons/hi";
import ApplicationDetailsModal from "./ApplicationDetailsModal";
import AddReviewModal from "./AddReviewModal";
import EditApplicationModal from "./EditApplicationModal";
import MobileView from "./MobileView";

const MyApplications = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: "" });

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
    // Ensure _id is properly formatted as a string
    const applicationId =
      typeof application._id === "object"
        ? application._id.$oid || application._id.toString()
        : application._id;

    // Navigate to checkout page with application data
    navigate(`/checkout/${applicationId}`, {
      state: {
        application: {
          ...application,
          _id: applicationId,
        },
      },
    });
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setShowEditModal(true);
  };

  const handleEditSuccess = () => {
    refetch();
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
    return <Loading />;
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

      {/* Show alert for applications needing revision */}
      {applications.some(
        (app) => app.applicationStatus === "needs revision"
      ) && (
        <div className="alert alert-warning bg-orange-500/10 border-orange-500/30 mb-6">
          <HiOutlineExclamationTriangle className="text-2xl text-orange-600" />
          <div>
            <h3 className="font-bold text-orange-700">Revision Required</h3>
            <div className="text-sm text-orange-600">
              Some of your applications need revision. Please review the
              moderator's feedback and edit your applications.
            </div>
          </div>
        </div>
      )}

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
                    className={`badge flex items-center gap-1 ${
                      app.applicationStatus === "accepted"
                        ? "bg-success/20 text-success border-success/30"
                        : app.applicationStatus === "processing"
                        ? "bg-info/20 text-info border-info/30"
                        : app.applicationStatus === "rejected"
                        ? "bg-error/20 text-error border-error/30"
                        : app.applicationStatus === "needs revision"
                        ? "bg-orange-500/20 text-orange-600 border-orange-500/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }`}
                  >
                    {app.applicationStatus === "accepted" ? (
                      <HiOutlineCheckCircle className="text-base" />
                    ) : app.applicationStatus === "processing" ? (
                      <HiOutlineCog className="text-base" />
                    ) : app.applicationStatus === "rejected" ? (
                      <HiOutlineXCircle className="text-base" />
                    ) : app.applicationStatus === "needs revision" ? (
                      <HiOutlineExclamationTriangle className="text-base" />
                    ) : (
                      <HiOutlineClock className="text-base" />
                    )}
                    {app.applicationStatus || "pending"}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge flex items-center gap-1 ${
                      app.paymentStatus === "paid"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-error/20 text-error border-error/30"
                    }`}
                  >
                    {app.paymentStatus === "paid" ? (
                      <HiOutlineCheckBadge className="text-base" />
                    ) : (
                      <HiOutlineExclamationTriangle className="text-base" />
                    )}
                    {app.paymentStatus || "unpaid"}
                  </span>
                </td>
                <td className="max-w-xs text-sm">
                  {app.feedback ? (
                    <div
                      className={`p-2 rounded ${
                        app.applicationStatus === "needs revision"
                          ? "bg-orange-500/10 border border-orange-500/30 text-orange-700"
                          : "text-neutral/70"
                      }`}
                    >
                      {app.feedback}
                    </div>
                  ) : (
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

                    {/* Edit Button - Only if pending or needs revision */}
                    {(app.applicationStatus === "pending" ||
                      app.applicationStatus === "needs revision") && (
                      <button
                        onClick={() => handleEdit(app)}
                        className={`btn btn-ghost btn-sm ${
                          app.applicationStatus === "needs revision"
                            ? "hover:bg-orange-500/20 hover:text-orange-600"
                            : "hover:bg-accent/20 hover:text-accent"
                        }`}
                        title={
                          app.applicationStatus === "needs revision"
                            ? "Revise Application"
                            : "Edit Application"
                        }
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
      <MobileView
        applications={applications}
        userReviews={userReviews}
        setSelectedApplication={setSelectedApplication}
        setShowDetailsModal={setShowDetailsModal}
        handlePay={handlePay}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        setReviewData={setReviewData}
        setShowReviewModal={setShowReviewModal}
      />

      {/* Details Modal */}
      <ApplicationDetailsModal
        selectedApplication={selectedApplication}
        showDetailsModal={showDetailsModal}
        setShowDetailsModal={setShowDetailsModal}
      />

      {/* Add Review Modal */}
      <AddReviewModal
        selectedApplication={selectedApplication}
        showReviewModal={showReviewModal}
        setShowReviewModal={setShowReviewModal}
        reviewData={reviewData}
        setReviewData={setReviewData}
        handleAddReview={handleAddReview}
      />

      {/* Edit Application Modal */}
      <EditApplicationModal
        application={selectedApplication}
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSuccess={handleEditSuccess}
      />
    </div>
  );
};

export default MyApplications;
