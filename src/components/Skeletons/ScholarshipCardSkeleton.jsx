const ScholarshipCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Image skeleton with badges */}
      <div className="relative h-56 bg-base-200">
        {/* Category Badge skeleton */}
        <div className="absolute top-4 left-4">
          <div className="skeleton h-7 w-28 rounded-full"></div>
        </div>

        {/* World Rank Badge skeleton */}
        <div className="absolute top-4 right-4">
          <div className="skeleton h-7 w-16 rounded-full"></div>
        </div>

        {/* University Name overlay skeleton */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="skeleton h-5 w-3/4 mb-1 bg-white/30"></div>
          <div className="skeleton h-4 w-1/2 bg-white/30"></div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Scholarship Name skeleton - min-h-14 to match actual card */}
        <div className="mb-4 min-h-14">
          <div className="skeleton h-6 w-full mb-2"></div>
          <div className="skeleton h-6 w-4/5"></div>
        </div>

        {/* Info Grid skeleton */}
        <div className="space-y-3 mb-5">
          {/* Subject info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
              <div className="skeleton w-5 h-5"></div>
            </div>
            <div className="flex-1">
              <div className="skeleton h-3 w-12 mb-1"></div>
              <div className="skeleton h-4 w-24"></div>
            </div>
          </div>

          {/* Degree info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center shrink-0">
              <div className="skeleton w-5 h-5"></div>
            </div>
            <div className="flex-1">
              <div className="skeleton h-3 w-16 mb-1"></div>
              <div className="skeleton h-4 w-20"></div>
            </div>
          </div>

          {/* Deadline info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center shrink-0">
              <div className="skeleton w-5 h-5"></div>
            </div>
            <div className="flex-1">
              <div className="skeleton h-3 w-32 mb-1"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
        </div>

        {/* Button skeleton */}
        <div className="skeleton h-12 w-full rounded-xl"></div>
      </div>
    </div>
  );
};

export default ScholarshipCardSkeleton;
