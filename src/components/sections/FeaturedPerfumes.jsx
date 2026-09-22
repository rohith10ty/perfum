import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import perfumes from "../../data/perfumes";
import ProductCard from "../product/ProductCard";
import SectionTitle from "../common/SectionTitle";

const filters = [
  "ALL",
  "BOSS",
  "VERSACE",
  "GUCCI",
  "TOM FORD",
  "LOUIS VUITTON",
];

const FeaturedPerfumes = ({
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlist,
}) => {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    if (activeFilter === "ALL") {
      return perfumes;
    }

    return perfumes.filter((product) => product.brand === activeFilter);
  }, [activeFilter]);

  const visibleProducts =
    activeFilter === "ALL" && !showAll ? filtered.slice(0, 8) : filtered;

  return (
    <section
      id="perfumes"
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
          eyebrow="20 scents · 5 iconic houses"
          title="Perfumes worth remembering."
          description="Explore our hand-picked fragrance wardrobe — from bright everyday signatures to deep, unforgettable evening scents."
        />

        <div
          className="
            mt-10
            flex
            flex-wrap
            gap-3
          "
        >
          {filters.map((filter) => {
            const active = filter === activeFilter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActiveFilter(filter);
                  setShowAll(false);
                }}
                className={`
                  wobbly
                  cursor-pointer
                  border-[2px]
                  border-[#2d2d2d]
                  px-4
                  py-2
                  text-[16px]
                  font-bold
                  transition-all
                  ${
                    active
                      ? "translate-x-[2px] translate-y-[2px] bg-[#ff4d4d] text-white shadow-none"
                      : "bg-[#fdfbf7] shadow-[3px_3px_0_#2d2d2d] hover:bg-[#fff3a8]"
                  }
                `}
              >
                {filter === "LOUIS VUITTON" ? "LV" : filter}
              </button>
            );
          })}
        </div>

        <div
          className="
            mt-12
            grid
            gap-7
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlist.includes(product.id)}
            />
          ))}
        </div>

        {activeFilter === "ALL" && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="
                wobbly
                sketch-shadow
                inline-flex
                min-h-[52px]
                cursor-pointer
                items-center
                gap-2
                border-[3px]
                border-[#2d2d2d]
                bg-[#fff3a8]
                px-7
                py-3
                text-[18px]
                font-bold
                transition
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:bg-[#ff4d4d]
                hover:text-white
              "
            >
              {showAll ? "Show fewer perfumes" : "Explore all 20 perfumes"}

              <ChevronDown size={19} className={showAll ? "rotate-180" : ""} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPerfumes;
