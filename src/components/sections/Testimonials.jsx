import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

import SectionTitle from "../common/SectionTitle";

const testimonials = [
  {
    name: "Aarav Mehta",
    initials: "AM",
    text: "The fragrance filtering is simple, but the whole experience feels completely different from a normal perfume store.",
    scent: "Tom Ford Oud Wood",
  },
  {
    name: "Maya Kapoor",
    initials: "MK",
    text: "I love how the notes are explained. It made choosing a fragrance feel far less confusing.",
    scent: "Gucci Flora",
  },
  {
    name: "Rohan Shah",
    initials: "RS",
    text: "Imagination immediately became my favourite. The website actually makes browsing perfumes fun.",
    scent: "LV Imagination",
  },
  {
    name: "Ishita Rao",
    initials: "IR",
    text: "The sketchbook aesthetic is playful without losing the premium feeling. Crystal Noir is my pick.",
    scent: "Versace Crystal Noir",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const current = testimonials[index];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const previous = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section
      className="
        px-5
        py-24
        md:px-8
        lg:px-12
        lg:py-32
      "
    >
      <div className="mx-auto max-w-[1050px]">
        <SectionTitle
          align="center"
          eyebrow="Notes from our people"
          title="Apparently, we smell pretty good."
        />

        <div
          className="
            wobbly-lg
            relative
            mt-14
            border-[3px]
            border-[#2d2d2d]
            bg-white/80
            p-8
            shadow-[8px_8px_0_#2d2d2d]
            md:p-12
          "
        >
          <div className="flex gap-1">
            {Array.from({
              length: 5,
            }).map((_, starIndex) => (
              <Star
                key={starIndex}
                size={19}
                className="
                  fill-[#ff4d4d]
                  text-[#2d2d2d]
                "
              />
            ))}
          </div>

          <blockquote
            className="
              mt-7
              font-heading
              text-3xl
              font-bold
              leading-[1.25]
              md:text-4xl
            "
          >
            “{current.text}”
          </blockquote>

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-between
              gap-6
            "
          >
            <div
              className="
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-[#2d2d2d]
                  bg-[#fff3a8]
                  font-bold
                "
              >
                {current.initials}
              </div>

              <div>
                <p className="text-lg font-bold">{current.name}</p>

                <p className="text-[#2d2d2d]/60">wears {current.scent}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous review"
                onClick={previous}
                className="
                  flex
                  h-11
                  w-11
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-[#2d2d2d]
                  bg-[#fdfbf7]
                  hover:bg-[#fff3a8]
                "
              >
                <ChevronLeft />
              </button>

              <button
                type="button"
                aria-label="Next review"
                onClick={next}
                className="
                  flex
                  h-11
                  w-11
                  cursor-pointer
                  items-center
                  justify-center
                  rounded-full
                  border-[3px]
                  border-[#2d2d2d]
                  bg-[#2d2d2d]
                  text-white
                  hover:bg-[#ff4d4d]
                "
              >
                <ChevronRight />
              </button>
            </div>
          </div>

          <div
            className="
              mt-8
              flex
              gap-2
            "
          >
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Review ${dotIndex + 1}`}
                onClick={() => setIndex(dotIndex)}
                className={`
                    h-2.5
                    cursor-pointer
                    rounded-full
                    border
                    border-[#2d2d2d]
                    transition-all
                    ${
                      index === dotIndex
                        ? "w-8 bg-[#ff4d4d]"
                        : "w-2.5 bg-[#e5e0d8]"
                    }
                  `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
