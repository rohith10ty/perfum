import { useRef } from "react";
import gsap from "gsap";

const MagneticButton = ({ children, className = "", onClick }) => {
  const buttonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.18,
      y: y * 0.18,
      duration: 0.35,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.35)",
    });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      <button
        type="button"
        onClick={onClick}
        className="
          wobbly
          sketch-shadow
          flex
          min-h-[54px]
          cursor-pointer
          items-center
          justify-center
          gap-2
          border-[3px]
          border-[#2d2d2d]
          bg-[#2d2d2d]
          px-8
          py-3
          text-[20px]
          font-bold
          text-white
          transition-all
          duration-150
          hover:translate-x-[3px]
          hover:translate-y-[3px]
          hover:bg-[#ff4d4d]
          hover:shadow-[2px_2px_0_0_#2d2d2d]
          active:translate-x-[5px]
          active:translate-y-[5px]
          active:shadow-none
        "
      >
        {children}
      </button>
    </div>
  );
};

export default MagneticButton;
