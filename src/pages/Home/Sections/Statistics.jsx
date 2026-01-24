import { motion } from "framer-motion";
import {
  HiAcademicCap,
  HiGlobeAlt,
  HiUsers,
  HiTrendingUp,
} from "react-icons/hi";
import { useState, useEffect, useRef } from "react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const stats = [
    {
      icon: HiAcademicCap,
      end: 1500,
      suffix: "+",
      label: "Scholarships Available",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: HiUsers,
      end: 50000,
      suffix: "+",
      label: "Students Helped",
      color: "bg-secondary/10 text-secondary",
    },
    {
      icon: HiGlobeAlt,
      end: 75,
      suffix: "+",
      label: "Countries Covered",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: HiTrendingUp,
      end: 95,
      suffix: "%",
      label: "Success Rate",
      color: "bg-success/10 text-success",
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-base md:text-lg text-neutral/70 max-w-2xl mx-auto">
            Join thousands of students who have achieved their academic dreams
            through our platform
          </p>
        </motion.div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ stat, isVisible, delay }) => {
  const [count, setCount] = useState(0);
  const Icon = stat.icon;

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const increment = stat.end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.end) {
          setCount(stat.end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, stat.end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8 text-center"
    >
      <div
        className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${stat.color} rounded-2xl mb-4`}
      >
        <Icon className="w-8 h-8 md:w-10 md:h-10" />
      </div>
      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral mb-2">
        {count.toLocaleString()}
        {stat.suffix}
      </div>
      <p className="text-sm md:text-base text-neutral/70 font-medium">
        {stat.label}
      </p>
    </motion.div>
  );
};

export default Statistics;
