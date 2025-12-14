import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import {
  HiOutlineEye,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClipboardList,
} from "react-icons/hi";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Fetch all applications with paid payment
  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["moderator-applications"],
    queryFn: async () => {
      const response = await axiosSecure.get("/applications/moderator");
      return response.data;
    },
  });

  // Open Details Modal
  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setShowDetailsModal(true);
  };

  // Open Feedback Modal
  const handleOpenFeedback = (application) => {
    setSelectedApplication(application);
    setFeedback(application.feedback || "");
    setShowFeedbackModal(true);
  };

  // Submit Feedback
  const handleSubmitFeedback = async () => {
    if (!feedback.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please provide feedback for the application.",
      });
      return;
    }

    try {
      await axiosSecure.patch(
        `/applications/${selectedApplication._id}/feedback`,
        { feedback }
      );
      Swal.fire({
        icon: "success",
        title: "Feedback Added",
        text: "Feedback has been successfully added to the application.",
        timer: 2000,
        showConfirmButton: false,
      });
      setShowFeedbackModal(false);
      setFeedback("");
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add feedback. Please try again.",
      });
    }
  };

  // Update Status to Processing
  const handleUpdateStatus = async (applicationId, newStatus) => {
    try {
      const result = await Swal.fire({
        title: `Change status to ${newStatus}?`,
        text: "This will update the application status.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#97a87a",
        cancelButtonColor: "#c97a68",
        confirmButtonText: "Yes, update it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/applications/${applicationId}/status`, {
          applicationStatus: newStatus,
        });
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          text: `Application status changed to ${newStatus}.`,
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update status. Please try again.",
      });
    }
  };

  // Cancel Application
  const handleCancelApplication = async (applicationId, scholarshipName) => {
    try {
      const result = await Swal.fire({
        title: "Cancel this application?",
        text: `Are you sure you want to reject "${scholarshipName}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#c97a68",
        cancelButtonColor: "#6d7d56",
        confirmButtonText: "Yes, reject it!",
      });

      if (result.isConfirmed) {
        await axiosSecure.patch(`/applications/${applicationId}/status`, {
          applicationStatus: "rejected",
        });
        Swal.fire({
          icon: "success",
          title: "Application Rejected",
          text: "The application has been rejected.",
          timer: 2000,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject application. Please try again.",
      });
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-warning/20 text-warning border-warning/30";
      case "processing":
        return "bg-info/20 text-info border-info/30";
      case "accepted":
        return "bg-success/20 text-success border-success/30";
      case "rejected":
        return "bg-error/20 text-error border-error/30";
      default:
        return "bg-neutral/20 text-neutral border-neutral/30";
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
          Manage Applications
        </h1>
        <p className="text-neutral/70">
          Review and manage student scholarship applications
        </p>
      </div>
      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <HiOutlineClipboardList className="text-8xl text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-neutral mb-2">
            No Applications Found
          </h3>
          <p className="text-neutral/70">
            No paid applications to review at the moment.
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-md">
            <div className="overflow-x-auto overflow-y-visible">
              <table className="table">
                <thead className="bg-primary/5">
                  <tr>
                    <th className="text-neutral font-semibold">
                      Applicant Name
                    </th>
                    <th className="text-neutral font-semibold">
                      Applicant Email
                    </th>
                    <th className="text-neutral font-semibold">
                      University Name
                    </th>
                    <th className="text-neutral font-semibold">
                      Application Status
                    </th>
                    <th className="text-neutral font-semibold">
                      Payment Status
                    </th>
                    <th className="text-neutral font-semibold">Feedback</th>
                    <th className="text-neutral font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((application) => (
                    <tr key={application._id} className="hover:bg-base-200/50">
                      <td className="font-medium">{application.userName}</td>
                      <td className="text-sm">{application.userEmail}</td>
                      <td>{application.universityName}</td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(
                            application.applicationStatus
                          )}`}
                        >
                          {application.applicationStatus}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            application.paymentStatus === "paid"
                              ? "bg-success/20 text-success border-success/30"
                              : "bg-warning/20 text-warning border-warning/30"
                          }`}
                        >
                          {application.paymentStatus}
                        </span>
                      </td>
                      <td className="max-w-xs truncate text-sm text-neutral/70">
                        {application.feedback || "No feedback yet"}
                      </td>
                      <td className="relative">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleViewDetails(application)}
                            className="btn btn-sm btn-ghost text-primary hover:bg-primary/10"
                            title="View Details"
                          >
                            <HiOutlineEye className="w-5 h-5" />
                          </button>
                          {application.applicationStatus === "processing" && (
                            <button
                              onClick={() => handleOpenFeedback(application)}
                              className="btn btn-sm btn-ghost text-info hover:bg-info/10"
                              title="Add Feedback"
                            >
                              <HiOutlineChatAlt2 className="w-5 h-5" />
                            </button>
                          )}
                          {(application.applicationStatus === "pending" ||
                            application.applicationStatus === "processing") && (
                            <button
                              onClick={() => {
                                setSelectedApplication(application);
                                setShowStatusModal(true);
                              }}
                              className="btn btn-sm btn-ghost text-success hover:bg-success/10"
                              title="Update Status"
                            >
                              <HiOutlineCheckCircle className="w-5 h-5" />
                            </button>
                          )}
                          {(application.applicationStatus === "pending" ||
                            application.applicationStatus === "processing") && (
                            <button
                              onClick={() =>
                                handleCancelApplication(
                                  application._id,
                                  application.scholarshipName
                                )
                              }
                              className="btn btn-sm btn-ghost text-error hover:bg-error/10"
                              title="Reject Application"
                            >
                              <HiOutlineXCircle className="w-5 h-5" />
                            </button>
                          )}
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
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-5 space-y-4 overflow-visible"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-neutral text-lg">
                      {application.userName}
                    </h3>
                    <p className="text-sm text-neutral/70">
                      {application.userEmail}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusClass(
                      application.applicationStatus
                    )}`}
                  >
                    {application.applicationStatus}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral/70">University:</span>
                    <span className="font-medium text-neutral">
                      {application.universityName}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral/70">Payment:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        application.paymentStatus === "paid"
                          ? "bg-success/20 text-success border-success/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }`}
                    >
                      {application.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral/70">Feedback:</span>
                    <span className="font-medium text-neutral text-right max-w-[60%] truncate">
                      {application.feedback || "No feedback yet"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-neutral/10 relative">
                  <button
                    onClick={() => handleViewDetails(application)}
                    className="btn btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-content border-0 flex-1"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                    Details
                  </button>
                  {application.applicationStatus === "processing" && (
                    <button
                      onClick={() => handleOpenFeedback(application)}
                      className="btn btn-sm bg-info/10 text-info hover:bg-info hover:text-info-content border-0 flex-1"
                    >
                      <HiOutlineChatAlt2 className="w-4 h-4" />
                      Feedback
                    </button>
                  )}
                  {(application.applicationStatus === "pending" ||
                    application.applicationStatus === "processing") && (
                    <button
                      onClick={() => {
                        setSelectedApplication(application);
                        setShowStatusModal(true);
                      }}
                      className="btn btn-sm bg-success/10 text-success hover:bg-success hover:text-success-content border-0 flex-1"
                    >
                      <HiOutlineCheckCircle className="w-4 h-4" />
                      Status
                    </button>
                  )}
                  {(application.applicationStatus === "pending" ||
                    application.applicationStatus === "processing") && (
                    <button
                      onClick={() =>
                        handleCancelApplication(
                          application._id,
                          application.scholarshipName
                        )
                      }
                      className="btn btn-sm bg-error/10 text-error hover:bg-error hover:text-error-content border-0 flex-1"
                    >
                      <HiOutlineXCircle className="w-4 h-4" />
                      Reject
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      {/* Details Modal */}
      {showDetailsModal && selectedApplication && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-lg md:text-xl text-neutral mb-4">
              Application Details
            </h3>
            <div className="space-y-4">
              {/* Scholarship Info */}
              <div className="bg-primary/5 rounded-lg p-3 md:p-4">
                <h4 className="font-semibold text-neutral mb-3 text-sm md:text-base">
                  Scholarship Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-neutral/60">Scholarship Name:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.scholarshipName}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">University:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.universityName}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Degree:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.degree}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Category:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.scholarshipCategory}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Subject:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.subjectCategory}
                    </p>
                  </div>
                </div>
              </div>

              {/* Applicant Info */}
              <div className="bg-base-200/50 rounded-lg p-3 md:p-4">
                <h4 className="font-semibold text-neutral mb-3 text-sm md:text-base">
                  Applicant Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-neutral/60">Name:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.userName}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Email:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.userEmail}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Phone:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.phone}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Date of Birth:</span>
                    <p className="font-medium text-neutral">
                      {new Date(
                        selectedApplication.dateOfBirth
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Gender:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.gender}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">Current University:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.currentUniversity}
                    </p>
                  </div>
                  <div>
                    <span className="text-neutral/60">CGPA:</span>
                    <p className="font-medium text-neutral">
                      {selectedApplication.cgpa}
                    </p>
                  </div>
                </div>
              </div>

              {/* Financial & Status Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-neutral/60">Application Fees:</span>
                  <p className="font-medium text-neutral">
                    ${selectedApplication.applicationFees}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Service Charge:</span>
                  <p className="font-medium text-neutral">
                    ${selectedApplication.serviceCharge}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Total Amount:</span>
                  <p className="font-medium text-neutral">
                    ${selectedApplication.totalAmount}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Applied Date:</span>
                  <p className="font-medium text-neutral">
                    {new Date(
                      selectedApplication.appliedAt
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Application Status:</span>
                  <p className="font-medium text-neutral capitalize">
                    {selectedApplication.applicationStatus}
                  </p>
                </div>
                <div>
                  <span className="text-neutral/60">Payment Status:</span>
                  <p className="font-medium text-neutral capitalize">
                    {selectedApplication.paymentStatus}
                  </p>
                </div>
              </div>

              {/* Feedback */}
              {selectedApplication.feedback && (
                <div className="bg-warning/5 rounded-lg p-3 md:p-4">
                  <h4 className="font-semibold text-neutral mb-2 text-sm md:text-base">
                    Feedback from Moderator
                  </h4>
                  <p className="text-sm text-neutral/80">
                    {selectedApplication.feedback}
                  </p>
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="btn btn-sm md:btn-md bg-primary text-primary-content hover:bg-secondary"
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
      {/* Feedback Modal */}
      {showFeedbackModal && selectedApplication && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-neutral mb-4">
              Add Feedback
            </h3>
            <p className="text-sm text-neutral/70 mb-4">
              Provide feedback for{" "}
              <span className="font-semibold">
                {selectedApplication.userName}
              </span>
              's application to{" "}
              <span className="font-semibold">
                {selectedApplication.scholarshipName}
              </span>
            </p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="textarea textarea-bordered w-full h-32 focus:border-primary focus:outline-none"
              placeholder="Enter your feedback here..."
            ></textarea>
            <div className="modal-action">
              <button
                onClick={() => {
                  setShowFeedbackModal(false);
                  setFeedback("");
                }}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitFeedback}
                className="btn bg-primary text-primary-content hover:bg-secondary"
              >
                Submit Feedback
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => {
              setShowFeedbackModal(false);
              setFeedback("");
            }}
          ></div>
        </div>
      )}
      {/* Status Update Modal */}
      {showStatusModal && selectedApplication && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg md:text-xl text-neutral mb-4">
              Update Application Status
            </h3>
            <p className="text-sm text-neutral/70 mb-6">
              Change status for{" "}
              <span className="font-semibold">
                {selectedApplication.userName}
              </span>
              's application
            </p>
            <div className="space-y-3">
              {selectedApplication.applicationStatus === "pending" && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedApplication._id, "processing");
                    setShowStatusModal(false);
                  }}
                  className="btn btn-block bg-info/10 text-info hover:bg-info hover:text-info-content border-info/30"
                >
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  Mark as Processing
                </button>
              )}
              {selectedApplication.applicationStatus === "processing" && (
                <button
                  onClick={() => {
                    handleUpdateStatus(selectedApplication._id, "accepted");
                    setShowStatusModal(false);
                  }}
                  className="btn btn-block bg-success/10 text-success hover:bg-success hover:text-success-content border-success/30"
                >
                  <HiOutlineCheckCircle className="w-5 h-5" />
                  Mark as Accepted
                </button>
              )}
            </div>
            <div className="modal-action">
              <button
                onClick={() => setShowStatusModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop"
            onClick={() => setShowStatusModal(false)}
          ></div>
        </div>
      )}{" "}
    </div>
  );
};

export default ManageApplications;
