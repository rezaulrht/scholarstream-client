import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { HiStar } from "react-icons/hi";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      university: "Harvard University",
      country: "USA",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "ScholarStream made finding my dream scholarship incredibly easy. The platform is intuitive, and I received a full scholarship to Harvard. Forever grateful!",
      scholarship: "Harvard Global Scholarship",
    },
    {
      id: 2,
      name: "Ahmed Hassan",
      university: "University of Oxford",
      country: "UK",
      image: "https://i.pravatar.cc/150?img=12",
      rating: 5,
      text: "Thanks to ScholarStream, I'm now pursuing my Master's at Oxford. The detailed information and application tips were invaluable throughout my journey.",
      scholarship: "Rhodes Scholarship",
    },
    {
      id: 3,
      name: "Maria Garcia",
      university: "ETH Zurich",
      country: "Switzerland",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "I never thought I could study in Switzerland, but ScholarStream showed me opportunities I didn't know existed. Now I'm living my dream!",
      scholarship: "ETH Excellence Scholarship",
    },
    {
      id: 4,
      name: "Chen Wei",
      university: "Stanford University",
      country: "USA",
      image: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      text: "The platform's search filters and real-time updates helped me find the perfect scholarship match. Highly recommend to all international students!",
      scholarship: "Stanford Knight-Hennessy",
    },
    {
      id: 5,
      name: "Priya Patel",
      university: "Cambridge University",
      country: "UK",
      image: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      text: "ScholarStream's comprehensive database and user-friendly interface made my scholarship search stress-free. I secured full funding for my PhD!",
      scholarship: "Cambridge Trust Scholarship",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral mb-4">
            Success <span className="text-primary">Stories</span>
          </h2>
          <p className="text-neutral/70 max-w-2xl mx-auto">
            Hear from students who achieved their academic dreams through
            ScholarStream
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-base-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral/10">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <HiStar
                        key={i}
                        className="w-5 h-5 text-warning fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-neutral/80 mb-6 leading-relaxed line-clamp-4">
                    "{testimonial.text}"
                  </p>

                  {/* Scholarship Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {testimonial.scholarship}
                    </span>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral/10">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-neutral">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-neutral/70">
                        {testimonial.university}
                      </p>
                      <p className="text-xs text-neutral/60">
                        {testimonial.country}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
