import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import ScholarshipCard from "../../components/ScholarshipCard/ScholarshipCard";
import Loading from "../../components/Loading/Loading";
import { HiSearch, HiFilter, HiSortAscending, HiX } from "react-icons/hi";

const AllScholarships = () => {
  const axios = useAxios();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [country, setCountry] = useState(searchParams.get("country") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "");
  const [sortOrder, setSortOrder] = useState(
    searchParams.get("sortOrder") || "asc"
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );
  const limit = 6;

  // Fetch scholarships with filters
  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: [
      "scholarships",
      searchTerm,
      country,
      category,
      sortBy,
      sortOrder,
      currentPage,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: currentPage,
        limit,
      });

      if (searchTerm) params.append("search", searchTerm);
      if (country) params.append("country", country);
      if (category) params.append("category", category);
      if (sortBy) {
        params.append("sortBy", sortBy);
        params.append("sortOrder", sortOrder);
      }

      const response = await axios.get(`/scholarships?${params.toString()}`);
      return response.data;
    },
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;
  const totalCount = data?.totalCount || 0;

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set("search", searchTerm);
    if (country) params.set("country", country);
    if (category) params.set("category", category);
    if (sortBy) params.set("sortBy", sortBy);
    if (sortOrder) params.set("sortOrder", sortOrder);
    if (currentPage > 1) params.set("page", currentPage);
    setSearchParams(params);
  }, [
    searchTerm,
    country,
    category,
    sortBy,
    sortOrder,
    currentPage,
    setSearchParams,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchTerm("");
    setCountry("");
    setCategory("");
    setSortBy("");
    setSortOrder("asc");
    setCurrentPage(1);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral mb-2">
            Error Loading Scholarships
          </h2>
          <p className="text-neutral/70 mb-4">
            Failed to fetch scholarships. Please try again later.
          </p>
          <button
            onClick={() => refetch()}
            className="px-6 py-2.5 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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

        {/* Search and Filters */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/50" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by scholarship name, university, or degree..."
              className="w-full pl-12 pr-24 py-3 border-2 border-neutral/20 rounded-xl focus:border-primary focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-secondary transition-colors"
            >
              Search
            </button>
          </form>

          {/* Filters and Sort */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Country Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <HiFilter className="w-4 h-4" />
                  Country
                </span>
              </label>
              <select
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full"
              >
                <option value="">All Countries</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <HiFilter className="w-4 h-4" />
                  Category
                </span>
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full"
              >
                <option value="">All Categories</option>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self-fund</option>
              </select>
            </div>

            {/* Sort By */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium flex items-center gap-1">
                  <HiSortAscending className="w-4 h-4" />
                  Sort By
                </span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full"
              >
                <option value="">Default</option>
                <option value="fees">Application Fees</option>
                <option value="deadline">Deadline</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Order</span>
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSortOrder("asc");
                    setCurrentPage(1);
                  }}
                  className={`flex-1 btn btn-sm ${
                    sortOrder === "asc" ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Asc
                </button>
                <button
                  onClick={() => {
                    setSortOrder("desc");
                    setCurrentPage(1);
                  }}
                  className={`flex-1 btn btn-sm ${
                    sortOrder === "desc" ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Desc
                </button>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end">
            <button
              onClick={handleReset}
              className="px-6 py-2 bg-base-200 text-neutral rounded-lg hover:bg-base-300 transition-colors flex items-center gap-2"
            >
              <HiX className="w-4 h-4" />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <Loading />}

        {/* No Results */}
        {!isLoading && scholarships.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <HiSearch className="text-8xl text-primary/50 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-neutral mb-2">
              No Scholarships Found
            </h2>
            <p className="text-neutral/70 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary transition-all duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Scholarships Grid */}
        {!isLoading && scholarships.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scholarships.map((scholarship) => (
                <ScholarshipCard
                  key={scholarship._id}
                  scholarship={scholarship}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-col items-center gap-4">
              {/* Results Info */}
              <div className="text-neutral/70 text-center">
                Showing {(currentPage - 1) * limit + 1} -{" "}
                {Math.min(currentPage * limit, totalCount)} of {totalCount}{" "}
                scholarships
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg border-2 border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex gap-2 flex-wrap justify-center">
                    {[...Array(totalPages)].map((_, index) => {
                      const page = index + 1;
                      if (
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg border-2 transition-colors font-medium ${
                              currentPage === page
                                ? "bg-primary text-primary-content border-primary"
                                : "border-base-300 hover:border-primary"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      } else if (
                        page === currentPage - 2 ||
                        page === currentPage + 2
                      ) {
                        return (
                          <span key={page} className="px-2 text-neutral/50">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg border-2 border-base-300 hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllScholarships;
