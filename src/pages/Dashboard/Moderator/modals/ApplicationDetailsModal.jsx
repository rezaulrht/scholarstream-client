const ApplicationDetailsModal = ({ application, onClose }) => {
  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="font-bold text-lg md:text-xl text-base-content mb-4">
          Application Details
        </h3>
        <div className="space-y-4">
          {/* Scholarship Info */}
          <div className="bg-primary/5 rounded-lg p-3 md:p-4">
            <h4 className="font-semibold text-base-content mb-3 text-sm md:text-base">
              Scholarship Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-base-content/60">Scholarship Name:</span>
                <p className="font-medium text-base-content">
                  {application.scholarshipName}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">University:</span>
                <p className="font-medium text-neutral">
                  {application.universityName}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">Degree:</span>
                <p className="font-medium text-neutral">{application.degree}</p>
              </div>
              <div>
                <span className="text-neutral/60">Category:</span>
                <p className="font-medium text-neutral">
                  {application.scholarshipCategory}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">Subject:</span>
                <p className="font-medium text-neutral">
                  {application.subjectCategory}
                </p>
              </div>
            </div>
          </div>

          {/* Applicant Info */}
          <div className="bg-base-200/50 rounded-lg p-3 md:p-4">
            <h4 className="font-semibold text-base-content mb-3 text-sm md:text-base">
              Applicant Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-neutral/60">Name:</span>
                <p className="font-medium text-neutral">{application.userName}</p>
              </div>
              <div>
                <span className="text-neutral/60">Email:</span>
                <p className="font-medium text-neutral">
                  {application.userEmail}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">Phone:</span>
                <p className="font-medium text-neutral">{application.phone}</p>
              </div>
              <div>
                <span className="text-neutral/60">Date of Birth:</span>
                <p className="font-medium text-neutral">
                  {new Date(application.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">Gender:</span>
                <p className="font-medium text-neutral">{application.gender}</p>
              </div>
              <div>
                <span className="text-neutral/60">Current University:</span>
                <p className="font-medium text-neutral">
                  {application.currentUniversity}
                </p>
              </div>
              <div>
                <span className="text-neutral/60">CGPA:</span>
                <p className="font-medium text-neutral">{application.cgpa}</p>
              </div>
            </div>
          </div>

          {/* Financial & Status Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-neutral/60">Application Fees:</span>
              <p className="font-medium text-neutral">
                ${application.applicationFees}
              </p>
            </div>
            <div>
              <span className="text-neutral/60">Service Charge:</span>
              <p className="font-medium text-neutral">
                ${application.serviceCharge}
              </p>
            </div>
            <div>
              <span className="text-neutral/60">Total Amount:</span>
              <p className="font-medium text-neutral">
                ${application.totalAmount}
              </p>
            </div>
            <div>
              <span className="text-neutral/60">Applied Date:</span>
              <p className="font-medium text-neutral">
                {new Date(application.appliedAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span className="text-neutral/60">Application Status:</span>
              <p className="font-medium text-neutral capitalize">
                {application.applicationStatus}
              </p>
            </div>
            <div>
              <span className="text-neutral/60">Payment Status:</span>
              <p className="font-medium text-neutral capitalize">
                {application.paymentStatus}
              </p>
            </div>
          </div>

          {/* Feedback */}
          {application.feedback && (
            <div className="bg-warning/5 rounded-lg p-3 md:p-4">
              <h4 className="font-semibold text-neutral mb-2 text-sm md:text-base">
                Feedback from Moderator
              </h4>
              <p className="text-sm text-neutral/80">{application.feedback}</p>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button
            onClick={onClose}
            className="btn btn-sm md:btn-md bg-primary text-primary-content hover:bg-secondary"
          >
            Close
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
};

export default ApplicationDetailsModal;
