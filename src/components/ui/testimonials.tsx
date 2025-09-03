"use client";

import { testimonials } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fade in on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Carousel auto-rotation
  useEffect(() => {
    if (!isVisible) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000); // 6 seconds per testimonial for breathing room
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div>
      <style jsx>
        {`
          @keyframes fadeInOut {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            10% {
              opacity: 1;
              transform: translateY(0);
            }
            90% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-20px);
            }
          }
        `}
      </style>

      <section
        ref={ref}
        className="bg-gray-50 py-20 mx-auto px-6 text-center relative rounded-lg shadow-lg"
        aria-label="Testimonials"
      >
        {isVisible && (
          <blockquote
            key={currentIndex}
            className="text-2xl italic text-gray-800 font-light leading-relaxed tracking-wide px-8 py-10 bg-white rounded-lg shadow-md animate-[fadeInOut_6s_ease-in-out]"
          >
            “{testimonials[currentIndex].quote}”
            <p className="mt-8 font-semibold text-indigo-600 tracking-wide">
              {testimonials[currentIndex].author}
            </p>
          </blockquote>
        )}

        {/* Navigation dots */}
        <div className="flex justify-center mt-10 space-x-4">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full transition-colors duration-300 focus:outline-none
                ${
                  idx === currentIndex
                    ? "bg-indigo-600 shadow-lg shadow-indigo-300"
                    : "bg-indigo-300 hover:bg-indigo-400"
                }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
