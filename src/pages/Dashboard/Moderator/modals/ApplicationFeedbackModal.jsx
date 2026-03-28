const ApplicationFeedbackModal = ({
  application,
  feedback,
  setFeedback,
  feedbackAction,
  onSubmit,
  onClose,
}) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-xl text-neutral mb-4">
          {feedbackAction === "accept" && "Accept Application"}
          {feedbackAction === "reject" && "Reject Application"}
          {feedbackAction === "revision" && "Request Revision"}
        </h3>
        <p className="text-sm text-neutral/70 mb-4">
          {feedbackAction === "accept" && (
            <>Add an optional congratulatory message for </>
          )}
          {feedbackAction === "reject" && <>Provide rejection reason for </>}
          {feedbackAction === "revision" && (
            <>Explain what needs to be revised for </>
          )}
          <span className="font-semibold">{application.userName}</span>'s
          application to{" "}
          <span className="font-semibold">{application.scholarshipName}</span>
          {feedbackAction === "reject" && (
            <span className="block mt-2 text-error font-semibold">
              * Feedback is required for rejection
            </span>
          )}
          {feedbackAction === "revision" && (
            <span className="block mt-2 text-orange-600 font-semibold">
              * Feedback is required to request revision
            </span>
          )}
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="textarea textarea-bordered w-full h-32 focus:border-primary focus:outline-none"
          placeholder={
            feedbackAction === "accept"
              ? "Enter congratulatory message (optional)..."
              : feedbackAction === "reject"
                ? "Explain why the application is being rejected (required)..."
                : "Explain what needs to be improved or corrected (required)..."
          }
        ></textarea>
        <div className="modal-action">
          <button onClick={onClose} className="btn btn-ghost">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className={`btn ${
              feedbackAction === "accept"
                ? "bg-success text-success-content hover:bg-success/80"
                : feedbackAction === "reject"
                  ? "bg-error text-error-content hover:bg-error/80"
                  : "bg-primary text-primary-content hover:bg-secondary"
            }`}
          >
            {feedbackAction === "accept" && "Accept Application"}
            {feedbackAction === "reject" && "Reject Application"}
            {feedbackAction === "revision" && "Request Revision"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ApplicationFeedbackModal;
