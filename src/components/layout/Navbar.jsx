import { useEffect, useRef, useState } from "react";

import { Menu, Search, ShoppingBag, X } from "lucide-react";

import { gsap } from "gsap";

const links = [
  {
    label: "Home",
    href: "#home",
  },
  {
    label: "Perfumes",
    href: "#perfumes",
  },
  {
    label: "Collections",
    href: "#collections",
  },
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const Navbar = ({ cartCount = 0, onSearch, onCart }) => {
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-reveal", {
        y: -22,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out",
        delay: 0.15,
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen || !mobileMenuRef.current) {
      return;
    }

    gsap.fromTo(
      mobileMenuRef.current,
      {
        opacity: 0,
        y: -15,
        rotate: -1,
        scale: 0.98,
      },
      {
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      },
    );

    gsap.fromTo(
      ".mobile-nav-link",
      {
        opacity: 0,
        x: -25,
      },
      {
        opacity: 1,
        x: 0,
        stagger: 0.06,
        duration: 0.35,
        ease: "power3.out",
      },
    );
  }, [menuOpen]);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className="
          fixed
          top-0
          left-0
          right-0
          z-50
          w-full
          bg-[#fdfbf7]/95
          backdrop-blur-md
          border-b-2
          border-[#2d2d2d]/15
          px-3
          py-2.5
          transition-all
          duration-200
          sm:px-6
          lg:px-8
          shadow-[0_2px_10px_rgba(45,45,45,0.06)]
        "
      >
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1240px]
            items-center
            justify-between
            gap-3
          "
        >
          <a
            href="#home"
            className="
              group
              relative
              shrink-0
            "
          >
            <div
              className="
                wobbly-pill
                flex
                min-w-[110px]
                items-center
                justify-center
                border-[3px]
                border-[#2d2d2d]
                bg-[#fdfbf7]
                px-4
                py-1.5
                shadow-[3px_3px_0_#2d2d2d]
                transition-transform
                group-hover:-rotate-2
              "
            >
              <span
                className="
                  font-heading
                  text-[25px]
                  sm:text-[27px]
                  font-bold
                  leading-none
                "
              >
                Perfum
              </span>
            </div>

            <span
              className="
                absolute
                -right-2.5
                -top-1.5
                h-3
                w-3
                rounded-full
                border-2
                border-[#2d2d2d]
                bg-[#ff4d4d]
              "
            />
          </a>

          <div
            className="
              hidden
              items-center
              gap-6
              lg:flex
              xl:gap-9
            "
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  group
                  relative
                  text-[17px]
                  font-bold
                "
              >
                {link.label}

                <span
                  className="
                    absolute
                    -bottom-1.5
                    left-0
                    h-[3px]
                    w-0
                    rotate-[-1deg]
                    bg-[#ff4d4d]
                    transition-all
                    duration-300
                    group-hover:w-full
                  "
                />
              </a>
            ))}
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              sm:gap-3
              shrink-0
              z-10
            "
          >
            <button
              type="button"
              aria-label="Search"
              onClick={onSearch}
              className="
                wobbly-pill
                flex
                h-10
                w-10
                sm:h-11
                sm:w-11
                shrink-0
                cursor-pointer
                items-center
                justify-center
                border-2
                border-[#2d2d2d]
                bg-[#fdfbf7]
                transition-all
                hover:-rotate-6
                hover:bg-[#fff3a8]
              "
            >
              <Search size={19} strokeWidth={2.5} />
            </button>

            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="
                wobbly-pill
                flex
                h-10
                w-10
                sm:h-11
                sm:w-11
                shrink-0
                cursor-pointer
                items-center
                justify-center
                border-2
                border-[#2d2d2d]
                bg-[#fdfbf7]
                shadow-[2px_2px_0_#2d2d2d]
                lg:hidden
              "
            >
              {menuOpen ? (
                <X size={20} strokeWidth={2.7} />
              ) : (
                <Menu size={20} strokeWidth={2.7} />
              )}
            </button>

            {/* Cart Button on the far right */}
            <button
              type="button"
              aria-label="Cart"
              onClick={onCart}
              className="
                wobbly
                flex
                h-10
                sm:h-11
                shrink-0
                cursor-pointer
                items-center
                gap-2
                border-[2.5px]
                border-[#2d2d2d]
                bg-[#2d2d2d]
                px-3.5
                sm:px-4
                text-white
                shadow-[3px_3px_0_#ff4d4d]
                transition-all
                hover:translate-x-[1px]
                hover:translate-y-[1px]
                hover:bg-[#ff4d4d]
                hover:shadow-[1px_1px_0_#2d2d2d]
              "
            >
              <ShoppingBag size={18} strokeWidth={2.4} />
              <span className="font-bold text-[14px] sm:text-[15px]">Cart</span>
              <span
                className="
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#2d2d2d]
                  bg-[#ff4d4d]
                  px-1.5
                  text-[11px]
                  font-bold
                  text-white
                "
              >
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-[#2d2d2d]/25
            px-5
            pt-[88px]
            backdrop-blur-[2px]
            lg:hidden
          "
          onClick={() => setMenuOpen(false)}
        >
          <div
            ref={mobileMenuRef}
            onClick={(event) => event.stopPropagation()}
            className="
              mobile-menu-panel
              wobbly-lg
              mx-auto
              max-w-md
              border-[3px]
              border-[#2d2d2d]
              bg-[#fdfbf7]
              p-7
            "
          >
            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >
              <p
                className="
                  font-heading
                  text-2xl
                  font-bold
                "
              >
                Explore Perfum
              </p>

              <span
                className="
                  inline-block
                  rotate-2
                  bg-[#fff3a8]
                  px-3
                  py-1
                  text-sm
                "
              >
                find your scent ✦
              </span>
            </div>

            <div className="flex flex-col">
              {links.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="
                      mobile-nav-link
                      flex
                      items-center
                      justify-between
                      border-b-2
                      border-dashed
                      border-[#2d2d2d]/25
                      py-4
                      text-[24px]
                      font-bold
                      hover:text-[#ff4d4d]
                    "
                >
                  <span>{link.label}</span>

                  <span
                    className="
                        font-heading
                        text-sm
                      "
                  >
                    0{index + 1}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
