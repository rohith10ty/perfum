import { Check, PenLine, Sparkles } from "lucide-react";

import SectionTitle from "../common/SectionTitle";

const AboutBrand = () => {
  return (
    <section
      id="about"
      className="
        px-5
        py-24
        md:px-8
        lg:px-12
        lg:py-32
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1250px]
          items-center
          gap-14
          lg:grid-cols-2
        "
      >
        <div>
          <SectionTitle
            eyebrow="Our little obsession"
            title="Luxury fragrance, without the boring luxury website."
            description="Perfum is imagined as a fragrance sketchbook — a place where iconic houses, expressive design and personal discovery meet."
          />

          <div className="mt-8 space-y-4">
            {[
              "20 carefully selected fragrances",
              "Five globally recognised fragrance houses",
              "Discover by mood, notes or personality",
              "A shopping experience with actual character",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  text-[19px]
                "
              >
                <span
                  className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border-2
                    border-[#2d2d2d]
                    bg-[#fff3a8]
                  "
                >
                  <Check size={16} />
                </span>

                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          className="
            relative
            min-h-[480px]
          "
        >
          <div
            className="
              wobbly-lg
              absolute
              left-[5%]
              top-[8%]
              w-[76%]
              rotate-[-4deg]
              border-[3px]
              border-[#2d2d2d]
              bg-[#dce7ff]
              p-8
              shadow-[8px_8px_0_#2d2d2d]
            "
          >
            <PenLine size={30} />

            <p
              className="
                mt-7
                font-heading
                text-4xl
                font-bold
              "
            >
              “A scent is invisible, but never unnoticed.”
            </p>
          </div>

          <div
            className="
              wobbly-lg
              absolute
              bottom-[7%]
              right-[4%]
              w-[72%]
              rotate-3
              border-[3px]
              border-[#2d2d2d]
              bg-[#ffdfe7]
              p-7
              shadow-[7px_7px_0_#2d2d2d]
            "
          >
            <Sparkles size={27} />

            <p
              className="
                mt-5
                text-[21px]
                leading-relaxed
              "
            >
              We wanted perfume shopping to feel like opening a perfumer's
              notebook — full of ideas, ingredients and personalities.
            </p>
          </div>

          <div
            className="
              absolute
              right-[3%]
              top-[5%]
              h-20
              w-20
              rounded-full
              border-[3px]
              border-dashed
              border-[#ff4d4d]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default AboutBrand;
