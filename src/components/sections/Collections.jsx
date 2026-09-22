import {
  ArrowUpRight,
  Crown,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

import SectionTitle from "../common/SectionTitle";

const collections = [
  {
    title: "For Him",
    subtitle: "Clean woods, spice & unforgettable depth.",
    icon: UserRound,
    background: "#dce7ff",
    rotation: "-rotate-1",
  },
  {
    title: "For Her",
    subtitle: "Floral signatures with radiant character.",
    icon: Sparkles,
    background: "#ffdfe7",
    rotation: "rotate-1",
  },
  {
    title: "Unisex",
    subtitle: "Fragrance without boundaries.",
    icon: UsersRound,
    background: "#fff3a8",
    rotation: "-rotate-1",
  },
  {
    title: "Luxury Vault",
    subtitle: "Rare scents for serious collectors.",
    icon: Crown,
    background: "#e1d3c3",
    rotation: "rotate-1",
  },
];

const Collections = () => {
  const goToPerfumes = () => {
    document.getElementById("perfumes")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="collections"
      className="
        px-5
        py-24
        md:px-8
        lg:px-12
        lg:py-32
      "
    >
      <div className="mx-auto max-w-[1320px]">
        <SectionTitle
          align="center"
          eyebrow="Pick your mood"
          title="A fragrance for every version of you."
          description="Fresh, floral, woody or unapologetically luxurious — start with the feeling, then discover the scent."
        />

        <div
          className="
            mt-14
            grid
            gap-7
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          {collections.map(
            ({ title, subtitle, icon: Icon, background, rotation }) => (
              <button
                key={title}
                type="button"
                onClick={goToPerfumes}
                className={`
                  wobbly-lg
                  group
                  min-h-[300px]
                  cursor-pointer
                  border-[3px]
                  border-[#2d2d2d]
                  p-6
                  text-left
                  shadow-[7px_7px_0_#2d2d2d]
                  transition-all
                  duration-200
                  hover:-translate-y-2
                  hover:rotate-0
                  ${rotation}
                `}
                style={{
                  background,
                }}
              >
                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border-[3px]
                    border-[#2d2d2d]
                    bg-[#fdfbf7]
                    shadow-[3px_3px_0_#2d2d2d]
                  "
                >
                  <Icon size={29} />
                </div>

                <h3
                  className="
                    mt-14
                    font-heading
                    text-4xl
                    font-bold
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[18px]
                    leading-relaxed
                  "
                >
                  {subtitle}
                </p>

                <div
                  className="
                    mt-7
                    inline-flex
                    items-center
                    gap-2
                    font-bold
                  "
                >
                  Explore
                  <ArrowUpRight
                    className="
                      transition-transform
                      group-hover:translate-x-1
                      group-hover:-translate-y-1
                    "
                    size={19}
                  />
                </div>
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
};

export default Collections;
