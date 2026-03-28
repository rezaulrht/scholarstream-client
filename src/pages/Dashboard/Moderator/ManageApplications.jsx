import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading/Loading";
import {
  HiOutlineEye,
  HiOutlineChatAlt2,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineClipboardList,
  HiOutlineClock,
  HiOutlineCog,
  HiOutlinePaperClip,
} from "react-icons/hi";
import {
  HiOutlineCheckBadge,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";
import ApplicationDetailsModal from "./modals/ApplicationDetailsModal";
import ApplicationFeedbackModal from "./modals/ApplicationFeedbackModal";
import ApplicationStatusModal from "./modals/ApplicationStatusModal";
import DocumentViewerModal from "../../../components/DocumentViewerModal/DocumentViewerModal";

const ManageApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackAction, setFeedbackAction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDocModal, setShowDocModal] = useState(false);
  const [docViewerApp, setDocViewerApp] = useState(null);

  const openDocViewer = (app) => {
    setDocViewerApp(app);
    setShowDocModal(true);
  };

  const limit = 20;

  // Fetch paid applications with pagination + status filter
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["moderator-applications", currentPage, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams({ page: currentPage, limit });
      if (statusFilter !== "all") params.set("status", statusFilter);
      const response = await axiosSecure.get(
        `/applications/moderator?${params.toString()}`,
      );
      return response.data;
    },
  });

  const applications = data?.applications || [];
  const totalPages = data?.totalPages || 1;

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
    const targetStatus =
      feedbackAction === "accept"
        ? "accepted"
        : feedbackAction === "reject"
          ? "rejected"
          : "needs revision";
    const isOptional = feedbackAction === "accept";

    if (!isOptional && !feedback.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Feedback Required",
        text: "Please provide feedback for the application.",
      });
      return;
    }

    try {
      await axiosSecure.patch(
        `/applications/${selectedApplication._id}/review`,
        { feedback: feedback.trim() || undefined, applicationStatus: targetStatus },
      );

      const statusMessages = {
        "needs revision":
          "Feedback has been added and application marked for revision.",
        rejected: "Application has been rejected with feedback.",
        accepted: feedback.trim()
          ? "Application accepted with congratulatory message."
          : "Application has been accepted.",
      };

      Swal.fire({
        icon: "success",
        title:
          targetStatus === "accepted"
            ? "Application Accepted"
            : targetStatus === "rejected"
              ? "Application Rejected"
              : "Feedback Added",
        text: statusMessages[targetStatus],
        timer: 2000,
        showConfirmButton: false,
      });
      setShowFeedbackModal(false);
      setFeedback("");
      setFeedbackAction(null);
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

  // Update Status
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

  // Cancel/Reject — opens feedback modal with reject action pre-selected
  const handleCancelApplication = (application) => {
    setSelectedApplication(application);
    setFeedbackAction("reject");
    setFeedback("");
    setShowFeedbackModal(true);
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
      case "needs revision":
        return "bg-orange-500/20 text-orange-600 border-orange-500/30";
      default:
        return "bg-neutral/20 text-neutral border-neutral/30";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-base-content mb-2">
          Manage Applications
        </h1>
        <p className="text-base-content/70">
          Review and manage student scholarship applications
        </p>
      </div>

      {/* Status Filter */}
      <div className="mb-4 flex items-center gap-3">
        <label className="text-sm font-semibold text-base-content">
          Filter by Status:
        </label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="select select-bordered select-sm focus:outline-none focus:border-primary"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="accepted">Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="needs revision">Needs Revision</option>
        </select>
      </div>

      {/* Empty State */}
      {applications.length === 0 ? (
        <div className="bg-base-100 rounded-2xl shadow-md p-12 text-center border border-base-content/10">
          <HiOutlineClipboardList className="text-8xl text-primary/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-base-content mb-2">
            No Applications Found
          </h3>
          <p className="text-base-content/70">
            No paid applications to review at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="bg-base-100 rounded-2xl shadow-md border border-base-content/10 p-5 flex flex-col gap-4"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0">
                  <h3 className="font-bold text-base-content text-base truncate">
                    {application.userName}
                  </h3>
                  <p className="text-xs text-base-content/60 truncate">
                    {application.userEmail}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 flex-shrink-0 ${getStatusClass(application.applicationStatus)}`}
                >
                  {application.applicationStatus === "accepted" ? (
                    <HiOutlineCheckCircle className="text-sm" />
                  ) : application.applicationStatus === "processing" ? (
                    <HiOutlineCog className="text-sm" />
                  ) : application.applicationStatus === "rejected" ? (
                    <HiOutlineXCircle className="text-sm" />
                  ) : (
                    <HiOutlineClock className="text-sm" />
                  )}
                  {application.applicationStatus}
                </span>
              </div>

              {/* Card Info Grid */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-xs text-base-content/50">Scholarship</p>
                  <p className="font-medium text-base-content truncate">
                    {application.scholarshipName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50">University</p>
                  <p className="font-medium text-base-content truncate">
                    {application.universityName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50">CGPA</p>
                  <p className="font-medium text-base-content">
                    {application.cgpa ?? "—"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-base-content/50">Payment</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold border inline-flex items-center gap-1 ${
                      application.paymentStatus === "paid"
                        ? "bg-success/20 text-success border-success/30"
                        : "bg-warning/20 text-warning border-warning/30"
                    }`}
                  >
                    {application.paymentStatus === "paid" ? (
                      <HiOutlineCheckBadge className="text-sm" />
                    ) : (
                      <HiOutlineExclamationTriangle className="text-sm" />
                    )}
                    {application.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Docs Bar */}
              {application.documentUrls?.length > 0 ? (
                <button
                  onClick={() => openDocViewer(application)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/15 transition-colors"
                >
                  <HiOutlinePaperClip className="flex-shrink-0" />
                  {application.documentUrls.length} supporting{" "}
                  {application.documentUrls.length === 1
                    ? "document"
                    : "documents"}{" "}
                  — <span className="underline">view files</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-base-200/50 border border-base-content/10 text-base-content/40 text-sm">
                  <HiOutlinePaperClip className="flex-shrink-0" />
                  No documents attached
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 pt-2 border-t border-base-content/10">
                <button
                  onClick={() => handleViewDetails(application)}
                  className="btn btn-sm bg-primary/10 text-primary hover:bg-primary hover:text-primary-content border-0"
                >
                  <HiOutlineEye className="w-4 h-4" />
                  Details
                </button>
                {(application.applicationStatus === "processing" ||
                  application.applicationStatus === "needs revision") && (
                  <button
                    onClick={() => handleOpenFeedback(application)}
                    className="btn btn-sm bg-info/10 text-info hover:bg-info hover:text-info-content border-0"
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
                    className="btn btn-sm bg-success/10 text-success hover:bg-success hover:text-success-content border-0"
                  >
                    <HiOutlineCheckCircle className="w-4 h-4" />
                    Status
                  </button>
                )}
                {(application.applicationStatus === "pending" ||
                  application.applicationStatus === "processing") && (
                  <button
                    onClick={() => handleCancelApplication(application)}
                    className="btn btn-sm bg-error/10 text-error hover:bg-error hover:text-error-content border-0"
                  >
                    <HiOutlineXCircle className="w-4 h-4" />
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border-2 border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg border-2 transition-colors font-medium ${
                    currentPage === page
                      ? "bg-primary text-primary-content border-primary"
                      : "border-base-300 hover:border-primary"
                  }`}
                >
                  {page}
                </button>
              );
            } else if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return (
                <span key={page} className="px-2 text-neutral/50">
                  ...
                </span>
              );
            }
            return null;
          })}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border-2 border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Next
          </button>
        </div>
      )}

      <DocumentViewerModal
        isOpen={showDocModal}
        onClose={() => { setShowDocModal(false); setDocViewerApp(null); }}
        documentUrls={docViewerApp?.documentUrls ?? []}
        title={docViewerApp?.scholarshipName ?? ""}
      />

      {/* Modals */}
      {showDetailsModal && selectedApplication && (
        <ApplicationDetailsModal
          application={selectedApplication}
          onClose={() => setShowDetailsModal(false)}
        />
      )}
      {showFeedbackModal && selectedApplication && (
        <ApplicationFeedbackModal
          application={selectedApplication}
          feedback={feedback}
          setFeedback={setFeedback}
          feedbackAction={feedbackAction}
          onSubmit={handleSubmitFeedback}
          onClose={() => {
            setShowFeedbackModal(false);
            setFeedback("");
            setFeedbackAction(null);
          }}
        />
      )}
      {showStatusModal && selectedApplication && (
        <ApplicationStatusModal
          application={selectedApplication}
          onClose={() => setShowStatusModal(false)}
          onUpdateStatus={handleUpdateStatus}
          onSwitchToFeedback={(action) => {
            setShowStatusModal(false);
            setFeedbackAction(action);
            handleOpenFeedback(selectedApplication);
          }}
        />
      )}
    </div>
  );
};

export default ManageApplications;
