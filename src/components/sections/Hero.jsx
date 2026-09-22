import { useEffect, useRef } from "react";
import { ArrowDownRight, ArrowUpRight, Sparkles, Star } from "lucide-react";

import { gsap } from "gsap";

import MagneticButton from "../common/MagneticButton";
import SketchButton from "../common/SketchButton";
import SketchArrow from "../common/SketchArrow";

const Hero = () => {
  const heroRef = useRef(null);
  const perfumeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /* =====================================================
         PAGE LOAD ANIMATION
      ===================================================== */

      timeline
        .from(".hero-eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.55,
          delay: 0.3,
        })

        .from(
          ".hero-title-line",
          {
            opacity: 0,
            y: 80,
            rotate: 2,
            duration: 0.9,
            stagger: 0.11,
          },
          "-=0.2",
        )

        .from(
          ".hero-main-description",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
          },
          "-=0.4",
        )

        .from(
          ".hero-main-actions",
          {
            opacity: 0,
            y: 25,
            duration: 0.65,
          },
          "-=0.4",
        )

        .from(
          ".hero-perfume-wrapper",
          {
            opacity: 0,
            scale: 0.8,
            y: 60,
            rotate: 4,
            duration: 1.2,
            ease: "back.out(1.5)",
          },
          "-=0.95",
        )

        .from(
          ".hero-note",
          {
            opacity: 0,
            scale: 0.8,
            stagger: 0.12,
            duration: 0.45,
            ease: "back.out(1.8)",
          },
          "-=0.5",
        )

        .from(
          ".hero-main-rating",
          {
            opacity: 0,
            y: 15,
            duration: 0.55,
          },
          "-=0.35",
        )

        .from(
          ".hero-scroll-indicator",
          {
            opacity: 0,
            y: 12,
            duration: 0.6,
          },
          "-=0.2",
        );

      /* =====================================================
         PERFUME FLOATING
      ===================================================== */

      gsap.to(".floating-perfume", {
        y: -13,
        rotate: 1.4,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =====================================================
         DECORATIVE RED BLOB
      ===================================================== */

      gsap.to(".hero-red-blob", {
        y: -12,
        rotate: 12,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =====================================================
         DECORATIVE BLUE BLOB
      ===================================================== */

      gsap.to(".hero-blue-blob", {
        x: 10,
        y: 8,
        rotate: -12,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =====================================================
         DRAWN ARROW
      ===================================================== */

      gsap.fromTo(
        ".sketch-arrow-path",
        {
          strokeDashoffset: 180,
          strokeDasharray: 180,
        },
        {
          strokeDashoffset: 0,
          duration: 1.3,
          delay: 1.5,
          ease: "power2.inOut",
        },
      );

      gsap.from(".sketch-arrow-head", {
        opacity: 0,
        duration: 0.3,
        delay: 2.55,
      });

      /* =====================================================
         BLUE STAR ROTATION
      ===================================================== */

      gsap.to(".hero-star-spin", {
        rotate: 360,
        duration: 13,
        repeat: -1,
        ease: "none",
        transformOrigin: "center",
      });

      /* =====================================================
         SCROLL INDICATOR ANIMATION

         It only animates into view once.
         It DOES NOT disappear on scroll.
      ===================================================== */

      gsap.to(".scroll-indicator-line", {
        scaleY: 0.55,
        transformOrigin: "top center",
        repeat: -1,
        yoyo: true,
        duration: 0.8,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* =====================================================
     PERFUME MOUSE PARALLAX
  ===================================================== */

  const handleMouseMove = (event) => {
    if (!perfumeRef.current) return;

    const rect = perfumeRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(".floating-perfume", {
      rotateY: x * 8,
      rotateX: y * -6,
      x: x * 8,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(".floating-perfume", {
      rotateY: 0,
      rotateX: 0,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  /* =====================================================
     CTA SCROLL
  ===================================================== */

  const scrollToPerfumes = () => {
    const perfumeSection = document.getElementById("perfumes");

    perfumeSection?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="
        perfume-hero
        relative
        flex
        w-full
        max-w-[100vw]
        items-center
        overflow-hidden
        px-4
        pt-3
        pb-18
        sm:px-6
        lg:px-8
        lg:py-3
      "
    >
      {/* ==================================================
          MAIN HERO GRID
      ================================================== */}

      <div
        className="
          hero-main-grid
          mx-auto
          grid
          w-full
          max-w-[1240px]
          items-center
          gap-8
          lg:grid-cols-[0.96fr_1.04fr]
          lg:gap-6
          xl:gap-12
        "
      >
        {/* ==================================================
            LEFT CONTENT
        ================================================== */}

        <div className="relative z-10">
          {/* EYEBROW */}

          <div
            className="
              hero-eyebrow
              mb-6
              inline-flex
              rotate-[-1deg]
              items-center
              gap-2
              border-2
              border-dashed
              border-[#2d2d2d]
              bg-[#fff3a8]
              px-4
              py-1.5
              text-[17px]
              font-bold
            "
          >
            <Sparkles size={17} />
            The art of unforgettable fragrance
          </div>

          {/* ==================================================
              MAIN TITLE
          ================================================== */}

          <h1
            className="
              hero-main-title
              font-heading
              text-[52px]
              font-bold
              leading-[0.91]
              tracking-[-0.045em]

              sm:text-[66px]

              md:text-[80px]

              lg:text-[72px]

              xl:text-[92px]
            "
          >
            <span className="hero-title-line block">Find a scent</span>

            <span className="hero-title-line block">they won't</span>

            <span className="hero-title-line relative inline-block">
              <span className="sketch-underline">forget</span>

              <span
                className="
                  ml-2
                  inline-block
                  rotate-6
                  text-[#ff4d4d]
                "
              >
                !
              </span>
            </span>
          </h1>

          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <p
            className="
              hero-main-description
              mt-8
              max-w-[580px]
              text-[20px]
              leading-[1.6]
              text-[#2d2d2d]/80

              sm:text-[22px]
            "
          >
            A hand-picked world of iconic fragrances from BOSS, Versace, Gucci,
            Tom Ford and Louis Vuitton — drawn together for people who want
            their scent to leave a story behind.
          </p>

          {/* ==================================================
              CTA BUTTONS
          ================================================== */}

          <div
            className="
              hero-main-actions
              mt-9
              flex
              flex-col
              items-start
              gap-4

              sm:flex-row
              sm:items-center
            "
          >
            <MagneticButton onClick={scrollToPerfumes}>
              Explore Collection
              <ArrowUpRight size={21} strokeWidth={2.7} />
            </MagneticButton>

            <SketchButton variant="secondary" onClick={scrollToPerfumes}>
              Find Your Scent
              <ArrowDownRight size={20} strokeWidth={2.7} />
            </SketchButton>
          </div>

          {/* ==================================================
              RATING
          ================================================== */}

          <div
            className="
              hero-main-rating
              mt-9
              flex
              flex-wrap
              items-center
              gap-x-6
              gap-y-3
            "
          >
            <div className="flex items-center">
              {Array.from({
                length: 5,
              }).map((_, index) => (
                <Star
                  key={index}
                  size={18}
                  className="
                    fill-[#ff4d4d]
                    text-[#2d2d2d]
                  "
                />
              ))}
            </div>

            <span className="text-[18px]">
              Curated icons. Timeless signatures.
            </span>
          </div>

          {/* ==================================================
              HAND DRAWN ARROW (POINTING TO SCROLL BADGE)
          ================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -bottom-22
              right-6
              hidden
              h-[100px]
              w-[155px]
              rotate-[55deg]
              text-[#2d2d2d]
              lg:block
              xl:-bottom-24
              xl:right-14
            "
          >
            <SketchArrow className="h-full w-full" />
          </div>
        </div>

        {/* ==================================================
            RIGHT PERFUME VISUAL
        ================================================== */}

        <div
          ref={perfumeRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="
            hero-perfume-wrapper
            hero-visual
            relative
            flex
            min-h-[500px]
            items-center
            justify-center

            lg:min-h-[620px]
          "
          style={{
            perspective: "1000px",
          }}
        >
          {/* ==================================================
              OUTER DASHED CIRCLE
          ================================================== */}

          <div
            className="
              absolute
              h-[390px]
              w-[390px]
              rounded-full
              border-[3px]
              border-dashed
              border-[#2d2d2d]/35

              sm:h-[470px]
              sm:w-[470px]

              lg:h-[500px]
              lg:w-[500px]
            "
          />

          {/* ==================================================
              RED CIRCLE
          ================================================== */}

          <div
            className="
              absolute
              h-[330px]
              w-[330px]
              rotate-6
              rounded-full
              border-[2px]
              border-[#ff4d4d]/40

              sm:h-[405px]
              sm:w-[405px]

              lg:h-[430px]
              lg:w-[430px]
            "
          />

          {/* ==================================================
              YELLOW CIRCLE
          ================================================== */}

          <div
            className="
              absolute
              h-[260px]
              w-[260px]
              -rotate-3
              rounded-full
              bg-[#fff3a8]/65

              sm:h-[340px]
              sm:w-[340px]
            "
          />

          {/* ==================================================
              RED DECORATIVE BLOB
          ================================================== */}

          <div
            className="
              hero-red-blob
              left-[5%]
              top-[13%]

              sm:left-[8%]

              lg:left-[4%]
            "
          />

          {/* ==================================================
              BLUE DECORATIVE BLOB
          ================================================== */}

          <div
            className="
              hero-blue-blob
              bottom-[12%]
              right-[5%]

              sm:right-[10%]
            "
          />

          {/* ==================================================
              SPINNING STAR
          ================================================== */}

          <div
            className="
              hero-star-spin
              absolute
              right-[10%]
              top-[6%]
              hidden

              sm:block
            "
          >
            <Sparkles size={44} strokeWidth={1.8} className="text-[#2d5da1]" />
          </div>

          {/* ==================================================
              TOP NOTE
          ================================================== */}

          <div
            className="
              hero-note
              wobbly-md
              absolute
              left-[0%]
              top-[42%]
              z-10
              hidden
              -rotate-6
              border-2
              border-[#2d2d2d]
              bg-[#fdfbf7]
              px-4
              py-2
              shadow-[3px_3px_0_#2d2d2d]

              sm:block

              lg:left-[-2%]
            "
          >
            <span className="text-[16px] font-bold">Top note</span>

            <p className="text-[19px]">Bergamot ✦</p>
          </div>

          {/* ==================================================
              HEART NOTE
          ================================================== */}

          <div
            className="
              hero-note
              wobbly-md
              absolute
              right-[0%]
              top-[28%]
              z-10
              hidden
              rotate-6
              border-2
              border-[#2d2d2d]
              bg-[#ff4d4d]
              px-4
              py-2
              text-white
              shadow-[3px_3px_0_#2d2d2d]

              sm:block
            "
          >
            <span className="text-[16px] font-bold">Heart note</span>

            <p className="text-[19px]">Rose + Spice</p>
          </div>

          {/* ==================================================
              BASE NOTE
          ================================================== */}

          <div
            className="
              hero-note
              wobbly-md
              absolute
              bottom-[10%]
              left-[12%]
              z-10
              hidden
              rotate-3
              border-2
              border-[#2d2d2d]
              bg-[#2d5da1]
              px-4
              py-2
              text-white
              shadow-[3px_3px_0_#2d2d2d]

              sm:block
            "
          >
            <span className="text-[16px] font-bold">Base note</span>

            <p className="text-[19px]">Oud + Amber</p>
          </div>

          {/* ==================================================
              PERFUME BOTTLE
          ================================================== */}

          <div
            className="
              floating-perfume
              perfume-bottle
              relative
              z-[5]
            "
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* CAP */}

            <div className="perfume-bottle-cap" />

            {/* NECK */}

            <div className="perfume-bottle-neck" />

            {/* BODY */}

            <div className="perfume-bottle-body">
              {/* LIQUID */}

              <div className="perfume-liquid" />

              {/* GLASS SHINE */}

              <div className="perfume-shine" />

              {/* LABEL WITH ANIMATED SVG */}

              <div className="perfume-label overflow-hidden">
                <svg
                  viewBox="0 0 200 130"
                  className="w-full h-auto drop-shadow-sm select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="hero-shimmer-grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#2d2d2d">
                        <animate
                          attributeName="stop-color"
                          values="#2d2d2d; #ff4d4d; #2d5da1; #2d2d2d"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="50%" stopColor="#ff4d4d">
                        <animate
                          attributeName="stop-color"
                          values="#ff4d4d; #f59e0b; #ff4d4d; #2d5da1"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                      <stop offset="100%" stopColor="#2d5da1">
                        <animate
                          attributeName="stop-color"
                          values="#2d5da1; #2d2d2d; #ff4d4d; #2d5da1"
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </stop>
                    </linearGradient>

                    <filter id="svg-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Animated Twinkling Sparkles */}
                  <g className="animate-particle-1" transform="translate(25, 20)">
                    <path
                      d="M0,-5 L1.5,-1.5 L5,0 L1.5,1.5 L0,5 L-1.5,1.5 L-5,0 L-1.5,-1.5 Z"
                      fill="#ff4d4d"
                    />
                  </g>
                  <g className="animate-particle-2" transform="translate(175, 24)">
                    <path
                      d="M0,-6 L1.8,-1.8 L6,0 L1.8,1.8 L0,6 L-1.8,1.8 L-6,0 L-1.8,-1.8 Z"
                      fill="#f59e0b"
                    />
                  </g>
                  <g className="animate-particle-3" transform="translate(35, 95)">
                    <circle cx="0" cy="0" r="2" fill="#2d5da1" />
                  </g>
                  <g className="animate-particle-1" transform="translate(165, 92)">
                    <circle cx="0" cy="0" r="2.5" fill="#ff4d4d" />
                  </g>

                  {/* Perfum Brand Signature with SVG Gradient & Stroke */}
                  <text
                    x="100"
                    y="55"
                    textAnchor="middle"
                    fontFamily="var(--font-heading), Kalam, cursive"
                    fontSize="44"
                    fontWeight="700"
                    fill="url(#hero-shimmer-grad)"
                    stroke="#2d2d2d"
                    strokeWidth="0.8"
                    letterSpacing="-0.5"
                    className="animate-label-pulse"
                  >
                    Perfum
                  </text>

                  {/* Animated underline brush path */}
                  <path
                    d="M 50 68 Q 100 74 150 68"
                    fill="none"
                    stroke="#ff4d4d"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <animate
                      attributeName="d"
                      values="M 50 68 Q 100 74 150 68; M 50 70 Q 100 64 150 70; M 50 68 Q 100 74 150 68"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </path>

                  {/* Subtitle text */}
                  <text
                    x="100"
                    y="88"
                    textAnchor="middle"
                    fontFamily="var(--font-body), 'Patrick Hand', cursive"
                    fontSize="13"
                    fontWeight="700"
                    letterSpacing="3"
                    fill="#2d2d2d"
                    opacity="0.8"
                  >
                    SIGNATURE No. 01
                  </text>

                  <text
                    x="100"
                    y="108"
                    textAnchor="middle"
                    fontFamily="var(--font-body), 'Patrick Hand', cursive"
                    fontSize="13"
                    fill="#2d2d2d"
                    opacity="0.65"
                  >
                    ✦ Eau de Parfum ✦
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* ==================================================
              SMALL TEXT UNDER PERFUME (RESPONSIVE FIX)
          ================================================== */}

          <div
            className="
              hero-note
              absolute
              bottom-[0%]
              right-[0%]
              z-20
              rotate-[-4deg]
              whitespace-nowrap
              rounded-full
              border-2
              border-dashed
              border-[#ff4d4d]/70
              bg-[#fdfbf7]/95
              px-3
              py-1
              text-[14px]
              sm:text-[16px]
              font-bold
              shadow-[3px_3px_0_#2d2d2d]
              lg:bottom-[-8px]
              lg:right-[-4px]
            "
          >
            <span className="mr-1.5 text-[#ff4d4d]">↳</span>
            your next signature?
          </div>
        </div>
      </div>

      {/* ==================================================
          SCROLL TO EXPLORE (INSIDE DASHED CIRCLE BADGE)
      ================================================== */}

      <div
        className="
          hero-scroll-indicator
          pointer-events-none
          absolute
          bottom-2
          sm:bottom-3
          left-1/2
          z-30
          -translate-x-1/2
          flex
          flex-col
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            h-[84px]
            w-[84px]
            sm:h-[94px]
            sm:w-[94px]
            flex-col
            items-center
            justify-center
            rounded-full
            border-[2.5px]
            border-dashed
            border-[#ff4d4d]
            bg-[#fdfbf7]/95
            shadow-[0_4px_12px_rgba(255,77,77,0.18)]
            backdrop-blur-[2px]
            p-1
          "
        >
          <span
            className="
              rotate-[-2deg]
              font-heading
              text-[11px]
              sm:text-[12px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-[#ff4d4d]
            "
          >
            SCROLL
          </span>
          <span
            className="
              text-[9px]
              sm:text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-[#2d2d2d]/75
            "
          >
            TO EXPLORE
          </span>
          <div
            className="
              scroll-indicator-line
              mt-1
              h-2.5
              border-l-2
              border-dashed
              border-[#ff4d4d]
            "
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
