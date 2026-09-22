const SketchButton = ({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}) => {
  const variants = {
    primary: "bg-[#fdfbf7] text-[#2d2d2d] hover:bg-[#ff4d4d] hover:text-white",

    secondary:
      "bg-[#fff3a8] text-[#2d2d2d] hover:bg-[#2d5da1] hover:text-white",

    dark: "bg-[#2d2d2d] text-white hover:bg-[#ff4d4d]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        wobbly
        sketch-shadow
        inline-flex
        min-h-[52px]
        cursor-pointer
        items-center
        justify-center
        gap-2
        border-[3px]
        border-[#2d2d2d]
        px-7
        py-3
        text-[19px]
        font-bold
        transition-all
        duration-150
        hover:translate-x-[3px]
        hover:translate-y-[3px]
        hover:shadow-[2px_2px_0_0_#2d2d2d]
        active:translate-x-[5px]
        active:translate-y-[5px]
        active:shadow-none
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SketchButton;
