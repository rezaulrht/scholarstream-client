import {
  HiLocationMarker,
  HiAcademicCap,
  HiCalendar,
  HiGlobe,
} from "react-icons/hi";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    universityCountry,
    universityCity,
    subjectCategory,
    scholarshipCategory,
    degree,
    applicationDeadline,
    universityWorldRank,
  } = scholarship;

  const formattedDeadline = new Date(applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      {/* University Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-neutral/40"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-4 py-1.5 bg-primary text-primary-content text-sm font-bold rounded-full shadow-lg">
            {scholarshipCategory}
          </span>
        </div>

        {/* World Rank Badge */}
        {universityWorldRank && (
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
            <p className="text-xs font-bold text-neutral">
              Rank #{universityWorldRank}
            </p>
          </div>
        )}

        {/* University Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="text-white font-bold text-base mb-1 drop-shadow-lg line-clamp-1">
            {universityName}
          </h4>
          <div className="flex items-center gap-1.5 text-white/90 text-sm">
            <HiLocationMarker className="w-4 h-4" />
            <span className="drop-shadow">
              {universityCity}, {universityCountry}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Scholarship Name */}
        <h3 className="text-xl font-bold text-neutral mb-4 line-clamp-2 min-h-14 leading-tight">
          {scholarshipName}
        </h3>

        {/* Info Grid */}
        <div className="space-y-3 mb-5">
          {/* Subject */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <HiAcademicCap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-neutral/60">Subject</p>
              <p className="text-sm font-semibold text-neutral">
                {subjectCategory}
              </p>
            </div>
          </div>

          {/* Degree */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
              <HiGlobe className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-neutral/60">Degree Level</p>
              <p className="text-sm font-semibold text-neutral">{degree}</p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center shrink-0">
              <HiCalendar className="w-5 h-5 text-error" />
            </div>
            <div>
              <p className="text-xs text-neutral/60">Application Deadline</p>
              <p className="text-sm font-semibold text-error">
                {formattedDeadline}
              </p>
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/scholarship/${_id}`}
          className="block w-full py-3 text-center bg-primary text-primary-content font-bold rounded-xl hover:bg-secondary hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ScholarshipCard;
