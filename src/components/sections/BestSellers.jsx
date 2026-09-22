import perfumes from "../../data/perfumes";

import SectionTitle from "../common/SectionTitle";
import PerfumeArt from "../common/PerfumeArt";

const BestSellers = ({ onQuickView }) => {
  const products = perfumes.filter((product) => product.bestSeller).slice(0, 5);

  return (
    <section
      className="
        border-y-[3px]
        border-[#2d2d2d]
        bg-[#fff3a8]/35
        px-5
        py-24
        md:px-8
        lg:px-12
        lg:py-32
      "
    >
      <div className="mx-auto max-w-[1320px]">
        <SectionTitle
          eyebrow="Most wanted"
          title="The scents everyone keeps coming back to."
          description="Five fragrance icons from our collection — each with a completely different personality."
        />

        <div
          className="
            mt-14
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          {products.map((product, index) => (
            <button
              type="button"
              key={product.id}
              onClick={() => onQuickView(product)}
              className="
                wobbly-lg
                group
                relative
                flex
                flex-col
                justify-between
                cursor-pointer
                overflow-hidden
                border-[3px]
                border-[#2d2d2d]
                bg-[#fdfbf7]
                p-4
                text-left
                shadow-[5px_5px_0_#2d2d2d]
                transition-all
                hover:-translate-y-2
              "
            >
              <span
                className="
                  absolute
                  left-3
                  top-3
                  z-20
                  font-heading
                  text-5xl
                  font-bold
                  text-[#ff4d4d]/25
                "
              >
                0{index + 1}
              </span>

              <div
                className="
                  relative
                  my-2
                  aspect-square
                  w-full
                  overflow-hidden
                  rounded-[18px]
                  border-2
                  border-[#2d2d2d]
                  bg-white
                  shadow-[3px_3px_0_#2d2d2d]
                  transition-transform
                  group-hover:-translate-y-1
                "
              >
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="
                    h-full
                    w-full
                    object-contain
                    object-center
                    p-3
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>

              <div>
                <p
                  className="
                    mt-2
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-[#2d5da1]
                  "
                >
                  {product.brand}
                </p>

                <h3
                  className="
                    mt-0.5
                    font-heading
                    text-xl
                    font-bold
                    leading-snug
                  "
                >
                  {product.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
