const PerfumeArt = ({ product, compact = false }) => {
  const palette = product.palette;

  return (
    <div
      className={`
        relative
        flex
        items-end
        justify-center
        ${compact ? "h-[150px]" : "h-[250px] sm:h-[280px]"}
      `}
    >
      <div
        className="
          absolute
          bottom-[5%]
          h-[65%]
          w-[72%]
          rounded-full
          opacity-25
          blur-2xl
        "
        style={{
          background: palette.accent,
        }}
      />

      <div
        className={`
          relative
          transition-transform
          duration-300
          ${compact ? "h-[125px] w-[85px]" : "h-[215px] w-[145px]"}
        `}
      >
        <div
          className="
            absolute
            left-1/2
            top-0
            z-20
            -translate-x-1/2
            border-[3px]
            border-[#2d2d2d]
          "
          style={{
            width: compact ? "40px" : "62px",
            height: compact ? "27px" : "42px",
            background: palette.bottle,
            borderRadius: "7px 3px 6px 2px / 3px 7px 3px 6px",
            boxShadow: "4px 4px 0 #2d2d2d",
          }}
        />

        <div
          className="
            absolute
            left-1/2
            z-10
            -translate-x-1/2
            border-x-[3px]
            border-[#2d2d2d]
          "
          style={{
            top: compact ? "24px" : "37px",
            width: compact ? "30px" : "45px",
            height: compact ? "19px" : "30px",
            background: palette.label,
          }}
        />

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            overflow-hidden
            border-[3px]
            border-[#2d2d2d]
          "
          style={{
            top: compact ? "40px" : "60px",
            background: `linear-gradient(145deg, ${palette.label}, ${palette.liquid})`,
            borderRadius: "25px 8px 29px 9px / 11px 28px 10px 24px",
            boxShadow: compact ? "5px 5px 0 #2d2d2d" : "7px 7px 0 #2d2d2d",
          }}
        >
          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-[55%]
              opacity-60
            "
            style={{
              background: palette.liquid,
            }}
          />

          <div
            className="
              absolute
              left-[12%]
              top-[10%]
              h-[62%]
              w-[10%]
              rounded-full
              bg-white/55
            "
          />

          <div
            className="
              absolute
              left-1/2
              top-1/2
              z-10
              w-[76%]
              -translate-x-1/2
              -translate-y-1/2
              rotate-[-1deg]
              border-2
              border-dashed
              border-[#2d2d2d]
              bg-[#fdfbf7]/90
              px-2
              py-3
              text-center
            "
          >
            <p
              className={`
                font-heading
                font-bold
                leading-tight
                ${compact ? "text-[11px]" : "text-[16px]"}
              `}
            >
              {product.shortBrand || product.brand}
            </p>

            {!compact && (
              <p
                className="
                  mt-1
                  line-clamp-2
                  text-[12px]
                  leading-tight
                "
              >
                {product.name}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfumeArt;
