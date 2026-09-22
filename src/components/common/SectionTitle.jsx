const SectionTitle = ({ eyebrow, title, description, align = "left" }) => {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && (
        <span
          className="
            inline-block
            rotate-[-1deg]
            border-2
            border-dashed
            border-[#2d2d2d]
            bg-[#fff3a8]
            px-4
            py-1
            text-[16px]
            font-bold
          "
        >
          {eyebrow}
        </span>
      )}

      <h2
        className="
          mt-4
          font-heading
          text-4xl
          font-bold
          leading-[0.95]
          tracking-[-0.03em]
          sm:text-5xl
          lg:text-6xl
        "
      >
        {title}
      </h2>

      {description && (
        <p
          className="
            mt-5
            text-[19px]
            leading-relaxed
            text-[#2d2d2d]/75
            sm:text-[21px]
          "
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
