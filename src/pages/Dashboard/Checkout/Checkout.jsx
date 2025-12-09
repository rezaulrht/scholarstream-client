import { useLocation, useNavigate } from "react-router";
import { HiArrowLeft, HiCheckCircle, HiCurrencyDollar } from "react-icons/hi";
import useAuth from "../../../hooks/useAuth";
import { useEffect } from "react";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Get scholarship data from navigation state
  const scholarshipData = location.state;

  // Redirect if no scholarship data
  useEffect(() => {
    if (!scholarshipData) {
      navigate("/all-scholarships");
    }
  }, [scholarshipData, navigate]);

  if (!scholarshipData) {
    return null;
  }

  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    scholarshipCategory,
    degree,
    subjectCategory,
    applicationFees,
    serviceCharge,
  } = scholarshipData;

  const totalAmount = applicationFees + serviceCharge;

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium"
        >
          <HiArrowLeft className="w-5 h-5" />
          Back
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-neutral mb-2">
              Checkout
            </h1>
            <p className="text-neutral/70">
              Complete your scholarship application payment
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scholarship Details Card */}
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-bold text-neutral mb-6 flex items-center gap-2">
                  <HiCheckCircle className="w-6 h-6 text-primary" />
                  Application Details
                </h2>

                <div className="flex gap-4 mb-6">
                  <img
                    src={universityImage}
                    alt={universityName}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-2 border-neutral/10"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-neutral mb-1">
                      {scholarshipName}
                    </h3>
                    <p className="text-neutral/70 text-sm md:text-base">
                      {universityName}
                    </p>
                    <p className="text-neutral/60 text-xs md:text-sm">
                      {universityCity}, {universityCountry}
                    </p>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral/10">
                  <div>
                    <p className="text-xs text-neutral/60 mb-1">Category</p>
                    <p className="font-semibold text-neutral text-sm">
                      {scholarshipCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral/60 mb-1">Degree</p>
                    <p className="font-semibold text-neutral text-sm">
                      {degree}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral/60 mb-1">Subject</p>
                    <p className="font-semibold text-neutral text-sm">
                      {subjectCategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-neutral/60 mb-1">Applicant</p>
                    <p className="font-semibold text-neutral text-sm truncate">
                      {user?.displayName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Payment Form Placeholder */}
              <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
                <h2 className="text-xl font-bold text-neutral mb-6">
                  Payment Information
                </h2>

                {/* This will be replaced with Stripe Elements later */}
                <div className="space-y-4">
                  <div className="text-center py-12 border-2 border-dashed border-neutral/20 rounded-xl">
                    <HiCurrencyDollar className="w-16 h-16 text-neutral/30 mx-auto mb-4" />
                    <p className="text-neutral/60 mb-2">
                      Payment form will be integrated here
                    </p>
                    <p className="text-sm text-neutral/50">
                      Stripe payment gateway integration coming next
                    </p>
                  </div>

                  <button
                    type="button"
                    disabled
                    className="w-full py-4 bg-neutral/20 text-neutral/50 font-bold rounded-xl cursor-not-allowed text-lg"
                  >
                    Payment Integration Pending
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Payment Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <h2 className="text-lg font-bold text-neutral mb-6">
                  Payment Summary
                </h2>

                <div className="space-y-4">
                  {/* Application Fees */}
                  <div className="flex justify-between items-center pb-4 border-b border-neutral/10">
                    <span className="text-neutral/70">Application Fees</span>
                    <span className="font-bold text-neutral">
                      ${applicationFees.toLocaleString()}
                    </span>
                  </div>

                  {/* Service Charge */}
                  <div className="flex justify-between items-center pb-4 border-b border-neutral/10">
                    <span className="text-neutral/70">Service Charge</span>
                    <span className="font-bold text-neutral">
                      ${serviceCharge.toLocaleString()}
                    </span>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-neutral">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ${totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-primary/5 rounded-xl">
                  <p className="text-xs text-neutral/70 text-center">
                    🔒 Secure payment powered by Stripe
                    <br />
                    Your payment information is encrypted and secure
                  </p>
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
