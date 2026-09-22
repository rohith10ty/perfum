import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import perfumes from "../../data/perfumes";
import PerfumeArt from "../common/PerfumeArt";

const SearchOverlay = ({ open, onClose, onSelect }) => {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();

    if (!clean) {
      return perfumes.slice(0, 6);
    }

    return perfumes
      .filter((product) => {
        return [
          product.brand,
          product.name,
          product.type,
          product.category,
          product.notes.top,
          product.notes.heart,
          product.notes.base,
        ]
          .join(" ")
          .toLowerCase()
          .includes(clean);
      })
      .slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        overflow-y-auto
        bg-[#2d2d2d]/50
        p-4
        backdrop-blur-sm
        sm:p-8
      "
    >
      <div
        className="
          wobbly-lg
          mx-auto
          max-w-3xl
          border-[3px]
          border-[#2d2d2d]
          bg-[#fdfbf7]
          p-5
          shadow-[10px_10px_0_#2d2d2d]
          sm:p-8
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              font-heading
              text-3xl
              font-bold
            "
          >
            Find your scent
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-2
              border-[#2d2d2d]
              hover:bg-[#ffdddd]
            "
          >
            <X size={19} />
          </button>
        </div>

        <div
          className="
            wobbly
            mt-7
            flex
            items-center
            gap-3
            border-[3px]
            border-[#2d2d2d]
            bg-white
            px-4
          "
        >
          <Search size={20} />

          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try oud, Gucci, floral..."
            className="
              min-h-[55px]
              min-w-0
              flex-1
              bg-transparent
              text-[18px]
              outline-none
            "
          />
        </div>

        <div
          className="
            mt-7
            grid
            gap-4
            sm:grid-cols-2
          "
        >
          {results.map((product) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                onSelect(product);
                onClose();
              }}
              className="
                wobbly-md
                grid
                grid-cols-[72px_1fr]
                items-center
                gap-3
                border-2
                border-[#2d2d2d]
                bg-white
                p-3
                text-left
                transition
                hover:-translate-y-1
                hover:bg-[#fff3a8]/45
              "
            >
              <div className="h-[72px] w-[72px] overflow-hidden rounded-xl border-2 border-[#2d2d2d] bg-[#fdfbf7]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#2d5da1]
                    "
                  >
                    {product.brand}
                  </p>
                  <span className="text-[10px] font-bold bg-[#dce7ff] border border-[#2d2d2d] px-1.5 py-0.2 rounded-full">
                    {product.gender || (product.category === "Men" ? "For Him" : product.category === "Women" ? "For Her" : "Unisex")}
                  </span>
                </div>

                <h3
                  className="
                    mt-1
                    font-heading
                    text-xl
                    font-bold
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#2d2d2d]/60
                  "
                >
                  {product.type}
                </p>
              </div>
            </button>
          ))}
        </div>

        {results.length === 0 && (
          <div
            className="
              py-16
              text-center
            "
          >
            <p
              className="
                font-heading
                text-3xl
                font-bold
              "
            >
              No scent found.
            </p>

            <p className="mt-2">Try another brand, note or perfume name.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
