import { useEffect, useRef } from "react";
import gsap from "gsap";

const brands = ["BOSS", "VERSACE", "GUCCI", "TOM FORD", "LOUIS VUITTON"];

const BrandMarquee = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    const animation = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 22,
      repeat: -1,
      ease: "none",
    });

    return () => animation.kill();
  }, []);

  return (
    <section
      className="
        overflow-hidden
        border-y-[3px]
        border-[#2d2d2d]
        bg-[#2d2d2d]
        py-4
        text-white
      "
    >
      <div
        ref={trackRef}
        className="
          flex
          w-max
          items-center
          whitespace-nowrap
        "
      >
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={`${brand}-${index}`}
            className="
                flex
                items-center
                gap-8
                px-8
                sm:px-12
              "
          >
            <span
              className="
                  font-heading
                  text-2xl
                  font-bold
                  sm:text-3xl
                "
            >
              {brand}
            </span>

            <span className="text-[#ff4d4d]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
