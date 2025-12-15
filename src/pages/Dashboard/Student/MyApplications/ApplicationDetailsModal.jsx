const ApplicationDetailsModal = ({
  selectedApplication,
  showDetailsModal,
  setShowDetailsModal,
}) => {
  if (!showDetailsModal || !selectedApplication) return null;

  return (
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
                {new Date(selectedApplication.dateOfBirth).toLocaleDateString()}
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
                {new Date(selectedApplication.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral/60 mb-2">Application Status</p>
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
              <p className="text-sm text-neutral/60 mb-2">Moderator Feedback</p>
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
  );
};

export default ApplicationDetailsModal;
