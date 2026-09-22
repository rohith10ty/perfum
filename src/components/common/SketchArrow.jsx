const SketchArrow = ({ className = "" }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 180 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="sketch-arrow-path"
        d="M10 14C31 19 52 21 70 35C90 51 90 75 111 87C126 96 143 92 158 84"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="7 8"
      />

      <path
        className="sketch-arrow-head"
        d="M145 75C150 78 157 82 163 84C158 89 153 96 151 102"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SketchArrow;
