"use client";

import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import TemplateOne from "@/components/templates/TemplateOne";
import TemplateTwo from "@/components/templates/TemplateTwo";

interface TemplateSelectorProps {
  selected: string;
  setSelected: (id: string) => void;
}

const templates = [
  { id: "template1", name: "Modern Clean", component: TemplateOne },
  { id: "template2", name: "Classic Professional", component: TemplateTwo },
];

const sampleResumeData = {
  contact: {
    fullName: "Jane Doe",
    email: "jane@example.com",
    phone: "1234567890",
    location: "New York",
    linkedin: "https://linkedin.com/in/janedoe",
    github: "https://github.com/janedoe",
    portfolio: "https://janedoe.dev",
  },
  summary: "Creative software engineer with a passion for UI/UX.",
  skills: {
    technical: "React, Next.js, Tailwind",
    soft: "Teamwork, Communication",
    proficiency: "Advanced",
  },
  experience: [],
  education: [],
  certifications: [],
  languages: [],
};

export default function TemplateSelector({ selected, setSelected }: TemplateSelectorProps) {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const navEls = document.querySelectorAll(".swiper-button");
      navEls.forEach((el) => el.classList.remove("swiper-button-disabled"));
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-[94%]">
      <h2 className="text-xl font-bold mb-4 text-center">Choose a Resume Template</h2>

      <div className="relative max-w-3xl mx-auto">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          onSlideChange={(swiper) => {
            const newTemplate = templates[swiper.activeIndex]?.id;
            if (newTemplate) setSelected(newTemplate);
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            // bind navigation buttons
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current;
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {templates.map((template) => {
            const Component = template.component;
            return (
              <SwiperSlide key={template.id}>
                <div
                  className={`rounded-xl overflow-hidden bg-white shadow border transition-transform duration-300 ${
                    selected === template.id ? "scale-[1.03] border-primary" : "scale-100"
                  } cursor-pointer`}
                  onClick={() => setSelected(template.id)}
                >
                  <div className="bg-white p-3 font-medium text-lg text-center border-b">{template.name}</div>
                  <div className="bg-gray-50 text-sm max-h-[600px] overflow-y-auto px-4 py-6">
                    <Component data={sampleResumeData} />
                  </div>
                </div>
              </SwiperSlide>
            );
          })}

          <button
            ref={prevRef}
            className="swiper-button absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow hover:bg-gray-100"
            aria-label="Previous"
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <button
            ref={nextRef}
            className="swiper-button absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 text-gray-700 rounded-full p-3 shadow hover:bg-gray-100"
            aria-label="Next"
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </Swiper>
      </div>
    </div>
  );
}
