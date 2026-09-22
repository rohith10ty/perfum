import { Flower2, Leaf, Sparkles } from "lucide-react";

import SectionTitle from "../common/SectionTitle";

const notes = [
  {
    number: "01",
    title: "Top Notes",
    description: "The opening impression — bright, fresh and immediate.",
    examples: "Bergamot · Lemon · Mint · Mandarin",
    icon: Sparkles,
    color: "#fff3a8",
    rotation: "-rotate-1",
  },
  {
    number: "02",
    title: "Heart Notes",
    description: "The personality of the fragrance begins to unfold.",
    examples: "Rose · Jasmine · Lavender · Spice",
    icon: Flower2,
    color: "#ffdfe7",
    rotation: "rotate-1",
  },
  {
    number: "03",
    title: "Base Notes",
    description: "The lasting memory — warm, deep and unforgettable.",
    examples: "Oud · Amber · Vanilla · Sandalwood",
    icon: Leaf,
    color: "#dce7ff",
    rotation: "-rotate-1",
  },
];

const FragranceExperience = () => {
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
      <div className="mx-auto max-w-[1200px]">
        <SectionTitle
          align="center"
          eyebrow="How fragrance unfolds"
          title="A perfume tells its story in three acts."
          description="Every scent evolves on skin. What you smell in the first minute is only the beginning."
        />

        <div
          className="
            relative
            mt-16
            grid
            gap-10
            lg:grid-cols-3
          "
        >
          <div
            className="
              pointer-events-none
              absolute
              left-[15%]
              right-[15%]
              top-[48%]
              hidden
              border-t-[3px]
              border-dashed
              border-[#2d2d2d]/35
              lg:block
            "
          />

          {notes.map(
            ({
              number,
              title,
              description,
              examples,
              icon: Icon,
              color,
              rotation,
            }) => (
              <div
                key={title}
                className={`
                  wobbly-lg
                  relative
                  z-10
                  min-h-[320px]
                  border-[3px]
                  border-[#2d2d2d]
                  p-7
                  shadow-[7px_7px_0_#2d2d2d]
                  ${rotation}
                `}
                style={{
                  background: color,
                }}
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                  "
                >
                  <span
                    className="
                      font-heading
                      text-5xl
                      font-bold
                      text-[#2d2d2d]/20
                    "
                  >
                    {number}
                  </span>

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border-[3px]
                      border-[#2d2d2d]
                      bg-[#fdfbf7]
                    "
                  >
                    <Icon size={26} />
                  </div>
                </div>

                <h3
                  className="
                    mt-10
                    font-heading
                    text-4xl
                    font-bold
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-3
                    text-[19px]
                    leading-relaxed
                  "
                >
                  {description}
                </p>

                <p
                  className="
                    mt-6
                    border-t-2
                    border-dashed
                    border-[#2d2d2d]/35
                    pt-4
                    font-bold
                  "
                >
                  {examples}
                </p>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default FragranceExperience;
