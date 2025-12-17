import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../components/Loading/Loading";
import StudentReviews from "./StudentReviews";
import {
  HiAcademicCap,
  HiCalendar,
  HiGlobe,
  HiLocationMarker,
  HiOfficeBuilding,
  HiArrowLeft,
  HiMail,
} from "react-icons/hi";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/scholarships/${id}`);
      return response.data;
    },
  });

  const { data: reviews = [], isLoading: reviewsLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const response = await axiosSecure.get(`/reviews/scholarship/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral mb-2">
            Scholarship Not Found
          </h2>
          <p className="text-neutral/70 mb-4">
            The scholarship you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/all-scholarships")}
            className="px-6 py-2.5 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300"
          >
            Back to Scholarships
          </button>
        </div>
      </div>
    );
  }

  const {
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    universityWorldRank,
    subjectCategory,
    scholarshipCategory,
    degree,
    tuitionFees,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipDescription,
    postedUserEmail,
  } = scholarship;

  const formattedDeadline = new Date(applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const handleApplyNow = () => {
    navigate(`/apply/${id}`, {
      state: {
        scholarship: scholarship,
      },
    });
  };

  return (
    <div className="min-h-screen bg-base-100 py-4 md:py-8">
      <div className="container mx-auto px-3 md:px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 md:mb-6 flex items-center gap-2 text-primary hover:text-secondary transition-colors font-medium text-sm md:text-base"
        >
          <HiArrowLeft className="w-4 md:w-5 h-4 md:h-5" />
          Back
        </button>

        <div className="max-w-7xl mx-auto">
          {/* Hero Image Section */}
          <div className="relative h-56 md:h-72 lg:h-80 rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8 shadow-xl group cursor-pointer">
            <img
              src={universityImage}
              alt={universityName}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

            {/* Badges on Image */}
            <div className="absolute top-3 md:top-6 left-3 md:left-6 flex flex-wrap gap-2 md:gap-3 z-10">
              <span className="px-2.5 py-1.5 md:px-4 md:py-2 bg-primary text-primary-content text-xs md:text-sm font-bold rounded-md md:rounded-lg shadow-lg">
                {scholarshipCategory}
              </span>
              {universityWorldRank && (
                <span className="px-2.5 py-1.5 md:px-4 md:py-2 bg-white text-neutral text-xs md:text-sm font-bold rounded-md md:rounded-lg shadow-lg">
                  Rank #{universityWorldRank}
                </span>
              )}
            </div>

            {/* Title on Image */}
            <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 z-10">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl">
                {scholarshipName}
              </h1>
              <div className="flex items-center gap-1.5 md:gap-2 mt-1.5 md:mt-2 text-white/90">
                <HiOfficeBuilding className="w-4 md:w-5 h-4 md:h-5 shrink-0" />
                <span className="font-semibold text-sm md:text-base">
                  {universityName}
                </span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2 mt-0.5 md:mt-1 text-white/80">
                <HiLocationMarker className="w-3.5 md:w-4 h-3.5 md:h-4 shrink-0" />
                <span className="text-xs md:text-sm">
                  {universityCity}, {universityCountry}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* Scholarship Description */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <HiAcademicCap className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-neutral">
                    Scholarship Description
                  </h2>
                </div>
                <div className="prose max-w-none">
                  <p className="text-sm md:text-base text-neutral/80 leading-relaxed whitespace-pre-line">
                    {scholarshipDescription}
                  </p>
                </div>
              </div>

              {/* Key Details */}
              <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-8">
                <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                  <div className="w-8 md:w-10 h-8 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <HiGlobe className="w-5 md:w-6 h-5 md:h-6 text-primary" />
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-neutral">
                    Key Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      UNIVERSITY NAME
                    </p>
                    <p className="font-semibold text-neutral text-sm md:text-lg">
                      {universityName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      DEGREE LEVEL
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral text-sm md:text-lg">
                        {degree}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      SUBJECT CATEGORY
                    </p>
                    <p className="font-semibold text-neutral text-sm md:text-lg">
                      {subjectCategory}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      SCHOLARSHIP CATEGORY
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-0.5 md:px-3 md:py-1 bg-primary/10 text-primary text-xs md:text-sm font-semibold rounded-full">
                        {scholarshipCategory}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      LOCATION
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-neutral text-sm md:text-lg">
                        {universityCity}, {universityCountry}
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs md:text-sm text-neutral/60 mb-1 md:mb-2">
                      WORLD RANKING
                    </p>
                    <p className="font-semibold text-neutral text-sm md:text-lg">
                      #{universityWorldRank} (QS World Rankings)
                    </p>
                  </div>
                </div>

                {/* Posted By */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-neutral/10">
                  <p className="text-xs md:text-sm text-neutral/60 mb-2">
                    POSTED BY
                  </p>
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 md:w-10 h-8 md:h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <HiMail className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral text-sm md:text-base">
                        Scholarship Administrator
                      </p>
                      <a
                        href={`mailto:${postedUserEmail}`}
                        className="text-xs md:text-sm text-primary hover:text-secondary transition-colors break-all"
                      >
                        {postedUserEmail}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Sticky Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-4 md:space-y-6">
                {/* Application Deadline */}
                <div className="bg-linear-to-br from-primary via-primary to-secondary text-primary-content rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 md:w-16 h-12 md:h-16 bg-white/20 rounded-xl md:rounded-2xl mb-3 md:mb-4">
                      <HiCalendar className="w-6 md:w-8 h-6 md:h-8 text-white" />
                    </div>
                    <p className="text-xs md:text-sm font-medium mb-2 opacity-90">
                      APPLICATION DEADLINE
                    </p>
                    <p className="text-xl md:text-3xl font-bold mb-4 md:mb-6">
                      {formattedDeadline}
                    </p>
                  </div>
                </div>

                {/* Financial Details */}
                <div className="bg-white rounded-xl md:rounded-2xl shadow-md p-4 md:p-6">
                  {tuitionFees !== null && (
                    <div className="mb-3 md:mb-4">
                      <p className="text-xs md:text-sm text-neutral/60 mb-1">
                        Tuition Fees
                      </p>
                      <p className="text-xl md:text-2xl font-bold text-neutral">
                        ~${tuitionFees.toLocaleString()} / Year
                      </p>
                    </div>
                  )}

                  <div className="space-y-2 md:space-y-3 pt-3 md:pt-4 border-t border-neutral/10">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral/70 text-xs md:text-sm">
                        Application Fees
                      </span>
                      <span className="font-bold text-neutral text-sm md:text-base">
                        ${applicationFees.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral/70 text-xs md:text-sm">
                        Service Charge
                      </span>
                      <span className="font-bold text-neutral text-sm md:text-base">
                        ${serviceCharge.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t-2 border-neutral/20">
                    <div className="flex justify-between items-center mb-3 md:mb-4">
                      <span className="font-semibold text-neutral text-sm md:text-base">
                        Total to Apply
                      </span>
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        ${(applicationFees + serviceCharge).toLocaleString()}
                      </span>
                    </div>

                    <button
                      onClick={handleApplyNow}
                      className="w-full py-3 md:py-4 bg-primary text-primary-content font-bold rounded-lg md:rounded-xl hover:bg-secondary hover:shadow-xl transition-all duration-300 text-base md:text-lg"
                    >
                      Apply Now
                    </button>

                    <p className="text-xs text-center text-neutral/60 mt-2 md:mt-3">
                      Secure payment via Stripe.
                      <br />
                      Application is non-refundable.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <StudentReviews reviews={reviews} isLoading={reviewsLoading} />
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
