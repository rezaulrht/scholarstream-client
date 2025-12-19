import { HiAcademicCap, HiLocationMarker, HiCalendar } from "react-icons/hi";
import { Link } from "react-router";

const Recommendation = ({ recommendations, isLoading, currentCategory }) => {
  if (isLoading) {
    return (
      <div className="mt-8 md:mt-12">
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <div className="mt-8 md:mt-12">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-2">
          You May Also Like
        </h2>
        <p className="text-neutral/70">
          More {currentCategory} scholarships you might be interested in
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((scholarship) => (
          <Link
            key={scholarship._id}
            to={`/scholarships/${scholarship._id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={scholarship.universityImage}
                alt={scholarship.universityName}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-neutral/40"></div>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1.5 bg-primary text-primary-content text-xs font-bold rounded-full shadow-lg">
                  {scholarship.scholarshipCategory}
                </span>
              </div>

              {/* University Name */}
              <div className="absolute bottom-4 left-4 right-4">
                <h4 className="text-white font-bold text-sm mb-1 drop-shadow-lg line-clamp-1">
                  {scholarship.universityName}
                </h4>
                <div className="flex items-center gap-1 text-white/90 text-xs">
                  <HiLocationMarker className="w-3 h-3" />
                  <span className="drop-shadow">
                    {scholarship.universityCity},{" "}
                    {scholarship.universityCountry}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-neutral mb-3 line-clamp-2 min-h-[3.5rem]">
                {scholarship.scholarshipName}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <HiAcademicCap className="w-4 h-4 text-primary" />
                  <span>{scholarship.subjectCategory}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neutral/70">
                  <HiCalendar className="w-4 h-4 text-primary" />
                  <span>
                    Deadline:{" "}
                    {new Date(
                      scholarship.applicationDeadline
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-neutral/10">
                <div>
                  <p className="text-xs text-neutral/60">Application Fee</p>
                  <p className="text-lg font-bold text-primary">
                    ${scholarship.applicationFees}
                  </p>
                </div>
                <span className="text-primary font-semibold text-sm group-hover:text-secondary transition-colors">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Recommendation;
