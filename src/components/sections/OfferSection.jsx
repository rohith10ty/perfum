import { ArrowRight, Copy, Sparkles } from "lucide-react";

const OfferSection = () => {
  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText("PERFUM20");
    } catch {
      // Clipboard permissions can vary by browser.
    }
  };

  return (
    <section
      className="
        px-5
        py-20
        md:px-8
        lg:px-12
      "
    >
      <div
        className="
          wobbly-lg
          relative
          mx-auto
          max-w-[1250px]
          overflow-hidden
          border-[4px]
          border-[#2d2d2d]
          bg-[#ff4d4d]
          px-7
          py-14
          text-white
          shadow-[10px_10px_0_#2d2d2d]
          md:px-12
          lg:px-16
        "
      >
        <div
          className="
            absolute
            -right-12
            -top-12
            h-52
            w-52
            rounded-full
            border-[3px]
            border-dashed
            border-white/35
          "
        />

        <div
          className="
            relative
            z-10
            grid
            items-center
            gap-10
            lg:grid-cols-[1fr_auto]
          "
        >
          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rotate-[-2deg]
                border-2
                border-[#2d2d2d]
                bg-[#fff3a8]
                px-4
                py-1
                font-bold
                text-[#2d2d2d]
              "
            >
              <Sparkles size={16} />
              Special sketchbook offer
            </div>

            <h2
              className="
                mt-6
                max-w-3xl
                font-heading
                text-5xl
                font-bold
                leading-[0.95]
                md:text-6xl
              "
            >
              Your next signature scent deserves a little excuse.
            </h2>

            <p
              className="
                mt-6
                max-w-2xl
                text-xl
                text-white/85
              "
            >
              Use the demo promotional code below at checkout.
            </p>
          </div>

          <div
            className="
              wobbly-lg
              rotate-2
              border-[3px]
              border-[#2d2d2d]
              bg-[#fdfbf7]
              p-6
              text-[#2d2d2d]
              shadow-[7px_7px_0_#2d2d2d]
            "
          >
            <p className="text-sm font-bold uppercase tracking-[0.15em]">
              Demo code
            </p>

            <button
              type="button"
              onClick={copyCode}
              className="
                mt-3
                flex
                cursor-pointer
                items-center
                gap-4
                font-heading
                text-4xl
                font-bold
              "
            >
              PERFUM20
              <Copy size={21} />
            </button>

            <button
              type="button"
              onClick={() =>
                document.getElementById("perfumes")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="
                mt-6
                flex
                cursor-pointer
                items-center
                gap-2
                font-bold
                text-[#ff4d4d]
              "
            >
              Shop perfumes
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
