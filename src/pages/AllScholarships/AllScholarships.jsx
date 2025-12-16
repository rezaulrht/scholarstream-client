import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ScholarshipCard from "../../components/ScholarshipCard/ScholarshipCard";
import Loading from "../../components/Loading/Loading";
import { HiSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const response = await axiosSecure.get("/scholarships");
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-neutral mb-2 text-center">
            All Scholarships
          </h1>
          <p className="text-neutral/70 text-center">
            Explore all available scholarship opportunities
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by university, scholarship name, or subject..."
              className="w-full pl-12 pr-4 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* No Results */}
        {!isLoading && scholarships.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-neutral/70">
              No scholarships available.
            </p>
          </div>
        )}

        {/* Scholarships Grid */}
        {!isLoading && scholarships.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((scholarship) => (
              <ScholarshipCard
                key={scholarship._id}
                scholarship={scholarship}
              />
            ))}
          </div>
        )}

        {/* Results Count */}
        {!isLoading && scholarships.length > 0 && (
          <div className="mt-8 text-center text-neutral/70">
            Showing {scholarships.length} scholarships
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
