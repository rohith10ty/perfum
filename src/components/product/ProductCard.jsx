import { Eye, Heart, Plus, Star } from "lucide-react";

import PerfumeArt from "../common/PerfumeArt";

const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
}) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <article
      className="
        group
        wobbly-lg
        relative
        overflow-hidden
        border-[3px]
        border-[#2d2d2d]
        bg-white/75
        p-4
        shadow-[6px_6px_0_#2d2d2d]
        transition-all
        duration-200
        hover:-translate-y-2
        hover:rotate-[0.5deg]
        hover:shadow-[10px_10px_0_#2d2d2d]
      "
    >
      {/* BADGES (FEATURE & GENDER) */}
      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-1.5 items-center">
        <span
          className="
            rotate-[-2deg]
            border-2
            border-[#2d2d2d]
            bg-[#fff3a8]
            px-2.5
            py-0.5
            text-xs
            font-bold
            shadow-[2px_2px_0_#2d2d2d]
          "
        >
          {product.badge}
        </span>

        <span
          className={`
            rotate-[1deg]
            border-2
            border-[#2d2d2d]
            px-2.5
            py-0.5
            text-xs
            font-bold
            shadow-[2px_2px_0_#2d2d2d]
            ${
              product.gender === "For Him"
                ? "bg-[#dce7ff] text-[#173b6d]"
                : product.gender === "For Her"
                ? "bg-[#ffdfe7] text-[#9b2c47]"
                : "bg-[#fff8cc] text-[#6b4712]"
            }
          `}
        >
          {product.gender || (product.category === "Men" ? "For Him" : product.category === "Women" ? "For Her" : "Unisex")}
        </span>
      </div>

      <button
        type="button"
        aria-label="Wishlist"
        onClick={() => onToggleWishlist(product)}
        className="
          absolute
          right-4
          top-4
          z-20
          flex
          h-10
          w-10
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border-2
          border-[#2d2d2d]
          bg-[#fdfbf7]
          shadow-[2px_2px_0_#2d2d2d]
          transition
          hover:rotate-[-8deg]
          hover:bg-[#ffdddd]
        "
      >
        <Heart
          size={18}
          className={isWishlisted ? "fill-[#ff4d4d] text-[#ff4d4d]" : ""}
        />
      </button>

      {/* REALISTIC PHOTO FRAME */}
      <div
        className="
          relative
          mt-8
          mb-2
          h-[240px]
          sm:h-[260px]
          w-full
          overflow-hidden
          rounded-[22px]
          border-[2.5px]
          border-[#2d2d2d]
          bg-[#fdfbf7]
          shadow-[4px_4px_0_#2d2d2d]
          transition-transform
          duration-300
          group-hover:-translate-y-1
        "
      >
        {/* Ambient Glow */}
        <div
          className="
            absolute
            inset-0
            opacity-20
            transition-opacity
            group-hover:opacity-40
          "
          style={{
            background: `radial-gradient(circle at center, ${product.palette?.accent || "#ff4d4d"}, transparent 70%)`,
          }}
        />

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
            duration-500
            ease-out
            group-hover:scale-108
          "
        />

        {/* Decorative corner paper stamp */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-2
            right-2
            rounded-md
            border
            border-dashed
            border-[#2d2d2d]/30
            bg-[#fdfbf7]/85
            px-2
            py-0.5
            text-[10px]
            font-bold
            tracking-wider
            text-[#2d2d2d]/60
          "
        >
          {product.shortBrand || product.brand}
        </div>
      </div>

      <div className="mt-2">
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <p
              className="
                text-sm
                font-bold
                uppercase
                tracking-[0.14em]
                text-[#2d5da1]
              "
            >
              {product.brand}
            </p>

            <h3
              className="
                mt-1
                font-heading
                text-[25px]
                font-bold
                leading-tight
              "
            >
              {product.name}
            </h3>

            <p
              className="
                mt-1
                text-[16px]
                text-[#2d2d2d]/65
              "
            >
              {product.type} · {product.size}
            </p>
          </div>

          <div
            className="
              flex
              shrink-0
              items-center
              gap-1
            "
          >
            <Star size={15} className="fill-[#ff4d4d]" />

            <span className="font-bold">{product.rating}</span>
          </div>
        </div>

        <div
          className="
            mt-5
            flex
            items-end
            gap-2
          "
        >
          <span
            className="
              text-[22px]
              font-bold
            "
          >
            {formatPrice(product.price)}
          </span>

          <span
            className="
              pb-[2px]
              text-[14px]
              text-[#2d2d2d]/45
              line-through
            "
          >
            {formatPrice(product.oldPrice)}
          </span>
        </div>

        <div
          className="
            mt-5
            grid
            grid-cols-[1fr_auto]
            gap-3
          "
        >
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            className="
              wobbly
              flex
              min-h-[46px]
              cursor-pointer
              items-center
              justify-center
              gap-2
              border-[3px]
              border-[#2d2d2d]
              bg-[#2d2d2d]
              px-4
              font-bold
              text-white
              shadow-[4px_4px_0_#ff4d4d]
              transition-all
              hover:translate-x-[2px]
              hover:translate-y-[2px]
              hover:bg-[#ff4d4d]
              hover:shadow-[2px_2px_0_#2d2d2d]
            "
          >
            <Plus size={18} />
            Add to Cart
          </button>

          <button
            type="button"
            aria-label="Quick view"
            onClick={() => onQuickView(product)}
            className="
              flex
              h-[46px]
              w-[48px]
              cursor-pointer
              items-center
              justify-center
              rounded-full
              border-[3px]
              border-[#2d2d2d]
              bg-[#fff3a8]
              transition
              hover:rotate-6
              hover:bg-[#2d5da1]
              hover:text-white
            "
          >
            <Eye size={19} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
