import { motion } from "framer-motion";
import { HiChevronDown } from "react-icons/hi";
import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How do I apply for scholarships on ScholarStream?",
      answer:
        "Browse our scholarship database, filter by your criteria, and click on any scholarship to view detailed information. Each listing includes application requirements, deadlines, and direct links to apply through the official provider's website.",
    },
    {
      question: "Are all scholarships on ScholarStream legitimate?",
      answer:
        "Yes! Every scholarship is thoroughly verified by our team. We only list opportunities from recognized institutions, government agencies, and reputable organizations. We never charge students to access scholarship information.",
    },
    {
      question: "Can international students apply for these scholarships?",
      answer:
        "Many scholarships on our platform welcome international students. Use our filters to search specifically for 'International' or 'Study Abroad' scholarships. Each listing clearly states eligibility requirements.",
    },
    {
      question: "How often are new scholarships added?",
      answer:
        "We update our database daily with new opportunities. Enable notifications in your account settings to receive alerts about scholarships matching your profile and interests.",
    },
    {
      question: "Is ScholarStream really free to use?",
      answer:
        "Absolutely! ScholarStream is 100% free for students. We believe every student deserves access to scholarship opportunities regardless of their financial situation. There are no hidden fees or premium memberships.",
    },
    {
      question: "What if I need help with my scholarship application?",
      answer:
        "We offer comprehensive application guides, essay tips, and resource materials. For personalized assistance, join our community forum where you can connect with other students and scholarship advisors.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 md:py-24 bg-base-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-neutral mb-4"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral/70 max-w-2xl mx-auto"
          >
            Find answers to common questions about scholarships and our platform
          </motion.p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-neutral/10"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-base-100 transition-colors duration-200"
              >
                <span className="font-semibold text-neutral pr-8">
                  {faq.question}
                </span>
                <HiChevronDown
                  className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 text-neutral/70 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-neutral/70 mb-4">Still have questions?</p>
          <a
            href="/contact"
            className="inline-block px-8 py-3 bg-primary text-primary-content font-semibold rounded-xl hover:bg-secondary hover:shadow-lg transition-all duration-300"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
