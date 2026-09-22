import { Send, Mail, MapPin, Phone, ArrowUp } from "lucide-react";

const Instagram = ({ size = 24, strokeWidth = 2, className = "", ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className="
        relative
        mt-20
        overflow-hidden
        border-t-[3px]
        border-[#2d2d2d]
        bg-[#2d2d2d]
        px-5
        pb-8
        pt-16
        text-white

        md:px-8

        lg:px-12
      "
    >
      {/* ==================================================
          DECORATIVE ELEMENTS
      ================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-52
          w-52
          rounded-full
          border-[3px]
          border-dashed
          border-white/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[12%]
          left-[4%]
          hidden
          h-28
          w-28
          rotate-12
          rounded-full
          border-[3px]
          border-dashed
          border-[#ff4d4d]/30

          lg:block
        "
      />

      {/* ==================================================
          FOOTER CONTENT
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          max-w-[1250px]
          gap-12

          md:grid-cols-2

          lg:grid-cols-4
        "
      >
        {/* ==================================================
            BRAND
        ================================================== */}

        <div>
          <div
            className="
              wobbly-pill
              inline-flex
              rotate-[-2deg]
              border-[3px]
              border-white
              px-5
              py-2
              shadow-[4px_4px_0_#ff4d4d]
            "
          >
            <span
              className="
                font-heading
                text-3xl
                font-bold
              "
            >
              Perfum
            </span>
          </div>

          <p
            className="
              mt-6
              max-w-xs
              text-[18px]
              leading-relaxed
              text-white/65
            "
          >
            Luxury scents, sketched a little differently.
          </p>

          <div
            className="
              mt-6
              inline-block
              rotate-[-1deg]
              border-2
              border-dashed
              border-white/30
              px-3
              py-1
              text-sm
              text-white/60
            "
          >
            ✦ smell unforgettable
          </div>
        </div>

        {/* ==================================================
            QUICK LINKS
        ================================================== */}

        <div>
          <h3
            className="
              relative
              inline-block
              font-heading
              text-2xl
              font-bold
            "
          >
            Explore
            <span
              className="
                absolute
                -bottom-2
                left-0
                h-[3px]
                w-full
                rotate-[-2deg]
                bg-[#ff4d4d]
              "
            />
          </h3>

          <div
            className="
              mt-7
              flex
              flex-col
              items-start
              gap-3
            "
          >
            {[
              ["Home", "home"],
              ["Perfumes", "perfumes"],
              ["Collections", "collections"],
              ["About", "about"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => scrollTo(id)}
                className="
                  group
                  relative
                  cursor-pointer
                  text-[17px]
                  text-white/70
                  transition-all
                  duration-200

                  hover:translate-x-1
                  hover:text-[#ff4d4d]
                "
              >
                <span
                  className="
                    mr-2
                    text-[#ff4d4d]
                    opacity-0
                    transition-opacity
                    group-hover:opacity-100
                  "
                >
                  ↳
                </span>

                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ==================================================
            CONTACT
        ================================================== */}

        <div>
          <h3
            className="
              relative
              inline-block
              font-heading
              text-2xl
              font-bold
            "
          >
            Say hello
            <span
              className="
                absolute
                -bottom-2
                left-0
                h-[3px]
                w-full
                rotate-[2deg]
                bg-[#2d5da1]
              "
            />
          </h3>

          <div
            className="
              mt-7
              space-y-5
              text-white/70
            "
          >
            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <Mail
                size={19}
                className="
                  mt-[3px]
                  shrink-0
                  text-[#fff3a8]
                "
              />

              <span>hello@perfum.store</span>
            </div>

            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <Phone
                size={19}
                className="
                  mt-[3px]
                  shrink-0
                  text-[#fff3a8]
                "
              />

              <span>+91 90000 00000</span>
            </div>

            <div
              className="
                flex
                items-start
                gap-3
              "
            >
              <MapPin
                size={19}
                className="
                  mt-[3px]
                  shrink-0
                  text-[#fff3a8]
                "
              />

              <span>India</span>
            </div>
          </div>
        </div>

        {/* ==================================================
            SOCIAL
        ================================================== */}

        <div>
          <h3
            className="
              relative
              inline-block
              font-heading
              text-2xl
              font-bold
            "
          >
            Follow the trail
            <span
              className="
                absolute
                -bottom-2
                left-0
                h-[3px]
                w-full
                rotate-[-1deg]
                bg-[#fff3a8]
              "
            />
          </h3>

          <p
            className="
              mt-7
              max-w-xs
              text-[17px]
              leading-relaxed
              text-white/60
            "
          >
            Follow Perfum for scent stories, new drops and a little fragrance
            obsession.
          </p>

          <div
            className="
              mt-6
              flex
              gap-3
            "
          >
            {/* Instagram */}

            <button
              type="button"
              aria-label="Instagram"
              className="
                flex
                h-12
                w-12
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border-[2px]
                border-white
                bg-transparent
                transition-all
                duration-200

                hover:-rotate-6
                hover:bg-[#ff4d4d]
                hover:shadow-[3px_3px_0_#ffffff]
              "
            >
              <Instagram size={20} strokeWidth={2.3} />
            </button>

            {/* Generic social/share */}

            <button
              type="button"
              aria-label="Share"
              className="
                flex
                h-12
                w-12
                cursor-pointer
                items-center
                justify-center
                rounded-full
                border-[2px]
                border-white
                bg-transparent
                transition-all
                duration-200

                hover:rotate-6
                hover:bg-[#2d5da1]
                hover:shadow-[3px_3px_0_#ffffff]
              "
            >
              <Send size={20} strokeWidth={2.3} />
            </button>
          </div>

          {/* BACK TO TOP */}

          <button
            type="button"
            onClick={scrollToTop}
            className="
              wobbly
              mt-8
              inline-flex
              cursor-pointer
              items-center
              gap-2
              border-[2px]
              border-white
              bg-white
              px-4
              py-2
              font-bold
              text-[#2d2d2d]
              shadow-[3px_3px_0_#ff4d4d]
              transition-all

              hover:translate-x-[2px]
              hover:translate-y-[2px]
              hover:bg-[#fff3a8]
              hover:shadow-[1px_1px_0_#ff4d4d]
            "
          >
            Back to top
            <ArrowUp size={17} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* ==================================================
          BOTTOM FOOTER
      ================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          mt-14
          flex
          max-w-[1250px]
          flex-col
          gap-3
          border-t
          border-dashed
          border-white/25
          pt-7
          text-sm
          text-white/50

          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <p>© {year} Perfum. Frontend demonstration project.</p>

        <p>
          Crafted with React, Tailwind, GSAP & a little fragrance obsession.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
