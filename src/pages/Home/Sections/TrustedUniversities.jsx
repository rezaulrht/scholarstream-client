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

const TrustedUniversities = () => {
  // University data with counts
  const statistics = [
    { icon: HiAcademicCap, number: "500+", label: "Partner Universities" },
    { icon: HiGlobe, number: "150+", label: "Countries Worldwide" },
    { icon: HiCurrencyDollar, number: "$50M+", label: "Scholarships Awarded" },
    { icon: HiUserGroup, number: "10,000+", label: "Students Helped" },
    { icon: HiStar, number: "95%", label: "Success Rate" },
    { icon: HiBookOpen, number: "1,000+", label: "Programs Available" },
    { icon: FaTrophy, number: "200+", label: "Top-Ranked Schools" },
    { icon: HiCheckCircle, number: "100%", label: "Free to Use" },
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
