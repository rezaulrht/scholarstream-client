import Marquee from "react-fast-marquee";
import { FaTrophy } from "react-icons/fa";
import {
  HiAcademicCap,
  HiGlobe,
  HiCurrencyDollar,
  HiUserGroup,
  HiStar,
  HiBookOpen,
  HiCheckCircle,
} from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const TrustedUniversities = () => {
  // Fetch statistics from database
  const { data: stats } = useQuery({
    queryKey: ["home-statistics"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:5000/statistics/home");
      return response.data;
    },
  });

  // University data with counts
  const statistics = [
    {
      icon: HiAcademicCap,
      number: stats?.totalScholarships || "0",
      label: "Scholarships Available",
    },
    {
      icon: HiGlobe,
      number: stats?.totalCountries || "0",
      label: "Countries Worldwide",
    },
    {
      icon: HiUserGroup,
      number: stats?.totalApplications || "0",
      label: "Applications Submitted",
    },
    {
      icon: HiStar,
      number: stats?.totalReviews || "0",
      label: "Student Reviews",
    },
    {
      icon: HiBookOpen,
      number: stats?.totalUniversities || "0",
      label: "Partner Universities",
    },
    {
      icon: FaTrophy,
      number: stats?.totalUsers || "0",
      label: "Registered Users",
    },
    { icon: HiCheckCircle, number: "100%", label: "Free to Use" },
    { icon: HiCurrencyDollar, number: "24/7", label: "Support Available" },
  ];

  return (
    <section className="py-16 md:py-20 bg-base-200">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral mb-3">
            Connecting Students to{" "}
            <span className="text-primary">Global Opportunities</span>
          </h2>
          <p className="text-neutral/70">
            Your gateway to world-class education and funding
          </p>
        </div>

        {/* Marquee */}
        <Marquee gradient={false} speed={40} pauseOnHover={true}>
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="mx-6 md:mx-8 flex items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-md hover:shadow-lg transition-all duration-300 min-w-[280px] border border-neutral/10"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {stat.number}
                  </div>
                  <div className="text-sm text-neutral/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustedUniversities;
