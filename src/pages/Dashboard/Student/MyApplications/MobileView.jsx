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

const MobileView = ({
  applications,
  userReviews,
  setSelectedApplication,
  setShowDetailsModal,
  handlePay,
  handleEdit,
  handleDelete,
  setReviewData,
  setShowReviewModal,
}) => {
  return (
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
                <span className="font-semibold text-neutral">University:</span>{" "}
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
                    <HiOutlineCheckCircle className="text-sm" />
                  ) : app.applicationStatus === "processing" ? (
                    <HiOutlineCog className="text-sm" />
                  ) : app.applicationStatus === "rejected" ? (
                    <HiOutlineXCircle className="text-sm" />
                  ) : app.applicationStatus === "needs revision" ? (
                    <HiOutlineExclamationTriangle className="text-sm" />
                  ) : (
                    <HiOutlineClock className="text-sm" />
                  )}
                  {app.applicationStatus || "pending"}
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="font-semibold text-neutral">Payment:</span>
                <span
                  className={`badge flex items-center gap-1 ${
                    app.paymentStatus === "paid"
                      ? "bg-success/20 text-success border-success/30"
                      : "bg-error/20 text-error border-error/30"
                  }`}
                >
                  {app.paymentStatus === "paid" ? (
                    <HiOutlineCheckBadge className="text-sm" />
                  ) : (
                    <HiOutlineExclamationTriangle className="text-sm" />
                  )}
                  {app.paymentStatus || "unpaid"}
                </span>
              </div>
              {app.feedback && (
                <div
                  className={`p-2 rounded text-sm ${
                    app.applicationStatus === "needs revision"
                      ? "bg-orange-500/10 border border-orange-500/30 text-orange-700"
                      : ""
                  }`}
                >
                  <span className="font-semibold text-neutral">Feedback:</span>{" "}
                  <span
                    className={
                      app.applicationStatus === "needs revision"
                        ? ""
                        : "text-neutral/70"
                    }
                  >
                    {app.feedback}
                  </span>
                </div>
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
              {(app.applicationStatus === "pending" ||
                app.applicationStatus === "needs revision") && (
                <>
                  <button
                    onClick={() => handleEdit(app)}
                    className={`btn btn-sm btn-ghost ${
                      app.applicationStatus === "needs revision"
                        ? "text-orange-600"
                        : ""
                    }`}
                  >
                    <HiOutlinePencil />{" "}
                    {app.applicationStatus === "needs revision"
                      ? "Revise"
                      : "Edit"}
                  </button>
                  {app.paymentStatus === "unpaid" &&
                    app.applicationStatus === "pending" && (
                      <button
                        onClick={() => handlePay(app)}
                        className="btn btn-sm btn-primary"
                      >
                        <HiOutlineCreditCard /> Pay
                      </button>
                    )}
                  {app.applicationStatus === "pending" && (
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="btn btn-sm btn-error"
                    >
                      <HiOutlineTrash /> Delete
                    </button>
                  )}
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
  );
};

export default MobileView;
