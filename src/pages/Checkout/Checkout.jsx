import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import { useState } from "react";
import {
  HiAcademicCap,
  HiOfficeBuilding,
  HiUser,
  HiMail,
  HiPhone,
  HiCalendar,
  HiCreditCard,
  HiShieldCheck,
  HiArrowLeft,
} from "react-icons/hi";
import toast from "react-hot-toast";

const Checkout = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Get application data from location state or fetch if not available
  const applicationFromState = location.state?.application;

  const { data: application, isLoading } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: async () => {
      if (applicationFromState) return applicationFromState;
      const response = await axiosSecure.get(`/applications/${applicationId}`);
      return response.data;
    },
    enabled: !!applicationId,
  });

  const handlePayNow = async () => {
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions to proceed");
      return;
    }

    setIsProcessing(true);
    try {
      const paymentInfo = {
        applicationId: application._id,
        scholarshipId: application.scholarshipId,
        scholarshipName: application.scholarshipName,
        universityName: application.universityName,
        userEmail: user?.email,
        totalAmount: application.totalAmount,
      };

      const response = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!application) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-error mb-4">
            Application Not Found
          </h2>
          <button
            onClick={() => navigate("/dashboard/applications")}
            className="btn btn-primary"
          >
            Go to My Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-8 text-center">
            Complete Your Payment
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Order Summary - Left Side */}
            <div className="md:col-span-2 space-y-6">
              {/* Scholarship Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-neutral mb-4 flex items-center gap-2">
                  <HiAcademicCap className="w-6 h-6 text-primary" />
                  Scholarship Details
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-neutral/60 mb-1">
                      Scholarship Name
                    </p>
                    <p className="font-semibold text-neutral">
                      {application.scholarshipName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral/60 mb-1 flex items-center gap-1">
                      <HiOfficeBuilding className="w-4 h-4" />
                      University
                    </p>
                    <p className="font-semibold text-neutral">
                      {application.universityName}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral/60 mb-1">Category</p>
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full inline-block">
                        {application.scholarshipCategory}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-neutral/60 mb-1">Degree</p>
                      <p className="font-semibold text-neutral">
                        {application.degree}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Applicant Info */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-neutral mb-4 flex items-center gap-2">
                  <HiUser className="w-6 h-6 text-primary" />
                  Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral/60 mb-1">Full Name</p>
                    <p className="font-semibold text-neutral flex items-center gap-2">
                      {application.userName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral/60 mb-1">Email</p>
                    <p className="font-semibold text-neutral text-sm flex items-center gap-2">
                      <HiMail className="w-4 h-4 text-primary" />
                      {application.userEmail}
                    </p>
                  </div>
                  {application.phone && (
                    <div>
                      <p className="text-sm text-neutral/60 mb-1">Phone</p>
                      <p className="font-semibold text-neutral flex items-center gap-2">
                        <HiPhone className="w-4 h-4 text-primary" />
                        {application.phone}
                      </p>
                    </div>
                  )}
                  {application.currentUniversity && (
                    <div>
                      <p className="text-sm text-neutral/60 mb-1">
                        Current University
                      </p>
                      <p className="font-semibold text-neutral">
                        {application.currentUniversity}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-neutral mb-4">
                  Terms & Conditions
                </h2>
                <div className="bg-base-200 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto text-sm">
                  <ul className="list-disc list-inside space-y-2 text-neutral/80">
                    <li>
                      Application fees are non-refundable once payment is
                      completed.
                    </li>
                    <li>
                      Payment is processed securely via Stripe payment gateway.
                    </li>
                    <li>
                      Your application will be reviewed within 5-7 business
                      days.
                    </li>
                    <li>
                      Application status updates will be sent to your registered
                      email.
                    </li>
                    <li>
                      False information may result in application rejection.
                    </li>
                    <li>
                      Service charges cover platform maintenance and support.
                    </li>
                    <li>
                      You will receive a payment receipt via email after
                      successful payment.
                    </li>
                  </ul>
                </div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="checkbox checkbox-primary mt-1"
                  />
                  <span className="text-sm text-neutral">
                    I have read and agree to the terms and conditions. I
                    understand that application fees are non-refundable.
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Summary - Right Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-neutral mb-6">
                  Payment Summary
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral/70">Application Fees</span>
                    <span className="font-semibold text-neutral">
                      ${application.applicationFees?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral/70">Service Charge</span>
                    <span className="font-semibold text-neutral">
                      ${application.serviceCharge?.toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t-2 border-neutral/20 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-neutral text-lg">
                        Total Amount
                      </span>
                      <span className="font-bold text-primary text-2xl">
                        ${application.totalAmount?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={!termsAccepted || isProcessing}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    !termsAccepted || isProcessing
                      ? "bg-neutral/20 text-neutral/40 cursor-not-allowed"
                      : "bg-primary text-primary-content hover:bg-secondary hover:shadow-xl"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <HiCreditCard className="w-6 h-6" />
                      Pay Now
                    </>
                  )}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-neutral/60">
                  <HiShieldCheck className="w-5 h-5 text-success" />
                  <span>Secure Payment via Stripe</span>
                </div>

                <div className="mt-6 pt-6 border-t border-neutral/10">
                  <button
                    onClick={() => navigate("/dashboard/applications")}
                    className="w-full btn btn-ghost btn-sm"
                  >
                    Cancel & Return
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
