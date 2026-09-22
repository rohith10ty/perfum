import { useState } from "react";
import { Plus, Star, X, Check } from "lucide-react";

const QuickView = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const basePrice = product.price;

  const sizeOptions = [
    {
      size: "50 ml",
      multiplier: 0.65,
      price: Math.round((basePrice * 0.65) / 100) * 100,
      imageIndex: 0,
    },
    {
      size: "100 ml",
      multiplier: 1.0,
      price: basePrice,
      imageIndex: 1,
    },
    {
      size: "150 ml",
      multiplier: 1.4,
      price: Math.round((basePrice * 1.4) / 100) * 100,
      imageIndex: 2,
    },
  ];

  const [selectedSizeIndex, setSelectedSizeIndex] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(1);

  const productImages = product.images && product.images.length > 0
    ? product.images
    : [
        product.image || "/Purfum/Boss/Bottled%20absolu/IWxAsk_8B2l-000000000494512089_1.jpg",
      ];

  const currentOption = sizeOptions[selectedSizeIndex] || sizeOptions[1];

  const handleSelectSize = (index) => {
    setSelectedSizeIndex(index);
    if (productImages[index]) {
      setActiveImageIndex(index);
    }
  };

  const handleSelectImage = (index) => {
    setActiveImageIndex(index);
    if (index < sizeOptions.length) {
      setSelectedSizeIndex(index);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      size: currentOption.size,
      price: currentOption.price,
      cartId: `${product.id}-${currentOption.size}`,
    };
    onAddToCart(customizedProduct);
    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[110]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-[#2d2d2d]/65
        p-3
        backdrop-blur-sm
        sm:p-5
      "
      onClick={onClose}
    >
      <div
        className="
          wobbly-lg
          relative
          mx-auto
          my-auto
          grid
          w-full
          max-w-3xl
          overflow-hidden
          border-[3px]
          border-[#2d2d2d]
          bg-[#fdfbf7]
          shadow-[8px_8px_0_#2d2d2d]
          md:grid-cols-2
        "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          onClick={onClose}
          className="
            absolute
            right-3
            top-3
            z-30
            flex
            h-9
            w-9
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-2
            border-[#2d2d2d]
            bg-[#fdfbf7]
            shadow-[2px_2px_0_#2d2d2d]
            transition
            hover:rotate-12
            hover:bg-[#ffdddd]
          "
        >
          <X size={17} />
        </button>

        {/* LEFT: COMPACT GALLERY */}
        <div
          className="
            flex
            flex-col
            justify-between
            border-b-[3px]
            border-[#2d2d2d]
            bg-[#fff3a8]/25
            p-4
            sm:p-5
            md:border-b-0
            md:border-r-[3px]
          "
        >
          {/* Main Display Image */}
          <div
            className="
              relative
              flex
              h-[220px]
              w-full
              items-center
              justify-center
              overflow-hidden
              rounded-[18px]
              border-[2.5px]
              border-[#2d2d2d]
              bg-white
              shadow-[3px_3px_0_#2d2d2d]
              sm:h-[260px]
            "
          >
            <img
              key={activeImageIndex}
              src={productImages[activeImageIndex] || productImages[0]}
              alt={`${product.name} view ${activeImageIndex + 1}`}
              className="
                h-full
                w-full
                object-contain
                object-center
                p-2.5
                transition-all
                duration-300
              "
            />

            {/* View Tag Label */}
            <div
              className="
                absolute
                bottom-2.5
                left-2.5
                rounded-full
                border
                border-[#2d2d2d]
                bg-[#fdfbf7]/90
                px-2.5
                py-0.5
                text-[11px]
                font-bold
                shadow-sm
              "
            >
              {`View ${activeImageIndex + 1} of ${productImages.length}`}
            </div>
          </div>

          {/* Interactive Thumbnail Switchers */}
          <div className="mt-3 flex gap-2.5">
            {productImages.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectImage(idx)}
                className={`
                  relative
                  flex-1
                  h-14
                  overflow-hidden
                  rounded-lg
                  border-2
                  cursor-pointer
                  transition-all
                  bg-white
                  ${
                    activeImageIndex === idx
                      ? "border-[#ff4d4d] ring-2 ring-[#ff4d4d] shadow-[2px_2px_0_#2d2d2d] scale-102"
                      : "border-[#2d2d2d]/40 opacity-70 hover:opacity-100"
                  }
                `}
              >
                <img
                  src={imgUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="h-full w-full object-contain p-1"
                />
                <span className="absolute bottom-0 inset-x-0 bg-[#2d2d2d]/80 text-[9px] text-white text-center py-0.2 font-bold">
                  View {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: DETAILS & QUANTITY / SIZE */}
        <div className="p-4 sm:p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2">
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-[#2d5da1]
                "
              >
                {product.brand}
              </p>

              <span
                className={`
                  rounded-full
                  border
                  border-[#2d2d2d]
                  px-2
                  py-0.2
                  text-[11px]
                  font-bold
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

            <h2
              className="
                mt-1.5
                font-heading
                text-2xl
                sm:text-3xl
                font-bold
                leading-tight
              "
            >
              {product.name}
            </h2>

            <div className="mt-2 flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <Star size={15} className="fill-[#ff4d4d] text-[#ff4d4d]" />
                <span className="font-bold text-xs">{product.rating}</span>
              </div>
              <span className="text-[#2d2d2d]/40 text-xs">·</span>
              <span className="text-xs font-bold text-[#2d2d2d]/70">
                {product.type}
              </span>
            </div>

            <p
              className="
                mt-2.5
                text-sm
                leading-snug
                text-[#2d2d2d]/80
                line-clamp-2
              "
            >
              {product.description}
            </p>

            {/* QUANTITY / BOTTLE SIZE SELECTOR */}
            <div className="mt-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2d2d2d]/70 mb-1.5">
                Select Quantity / Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((opt, index) => {
                  const isSelected = selectedSizeIndex === index;
                  return (
                    <button
                      key={opt.size}
                      type="button"
                      onClick={() => handleSelectSize(index)}
                      className={`
                        wobbly
                        cursor-pointer
                        py-2
                        px-2
                        text-center
                        border-2
                        transition-all
                        ${
                          isSelected
                            ? "border-[#2d2d2d] bg-[#ff4d4d] text-white shadow-[2px_2px_0_#2d2d2d] translate-x-[1px] translate-y-[1px]"
                            : "border-[#2d2d2d]/30 bg-white hover:border-[#2d2d2d] hover:bg-[#fff3a8]"
                        }
                      `}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <span className="font-bold text-xs sm:text-sm">{opt.size}</span>
                        {isSelected && <Check size={12} className="stroke-[3]" />}
                      </div>
                      <p
                        className={`
                          mt-0.5
                          font-bold
                          text-[11px]
                          ${isSelected ? "text-white" : "text-[#2d2d2d]/80"}
                        `}
                      >
                        {formatPrice(opt.price)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="mt-4 pt-3 border-t border-dashed border-[#2d2d2d]/20">
            <div className="flex items-baseline justify-between mb-2.5">
              <div>
                <span className="text-[11px] text-[#2d2d2d]/60">Total for {currentOption.size}:</span>
                <p className="text-xl sm:text-2xl font-bold leading-tight">
                  {formatPrice(currentOption.price)}
                </p>
              </div>
              <span className="text-[11px] font-bold bg-[#fff3a8] border border-[#2d2d2d] px-2 py-0.5 rounded-full">
                In Stock & Authentic
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="
                wobbly
                flex
                min-h-[44px]
                w-full
                cursor-pointer
                items-center
                justify-center
                gap-2
                border-[2.5px]
                border-[#2d2d2d]
                bg-[#2d2d2d]
                px-5
                py-2.5
                font-bold
                text-sm
                text-white
                shadow-[3px_3px_0_#ff4d4d]
                transition-all
                hover:translate-x-[2px]
                hover:translate-y-[2px]
                hover:bg-[#ff4d4d]
                hover:shadow-[2px_2px_0_#2d2d2d]
              "
            >
              <Plus size={17} />
              Add {currentOption.size} to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
