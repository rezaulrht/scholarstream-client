import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { HiStar } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Testimonials = () => {
  const axios = useAxios();
  // Fetch reviews from database
  const { data: testimonials = [] } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const response = await axios.get("/reviews/public?limit=10");
      return response.data;
    },
  });

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
              <SwiperSlide key={testimonial._id} className="h-auto">
                <div className="bg-base-100 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full min-h-[380px] border border-neutral/10 flex flex-col">
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.ratingPoint)].map((_, i) => (
                      <HiStar
                        key={i}
                        className="w-5 h-5 text-warning fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-neutral/80 mb-6 leading-relaxed line-clamp-5 flex-grow">
                    "{testimonial.reviewComment}"
                  </p>

                  {/* Scholarship Badge */}
                  <div className="mb-6">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {testimonial.scholarshipName}
                    </span>
                  </div>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-neutral/10">
                    <img
                      src={testimonial.userImage}
                      alt={testimonial.userName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <h4 className="font-bold text-neutral">
                        {testimonial.userName}
                      </h4>
                      <p className="text-sm text-neutral/70">
                        {testimonial.universityName}
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
