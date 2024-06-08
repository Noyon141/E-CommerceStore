const Loading = () => {
  return (
    <div className="flex items-center justify-center p-72">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="198"
        height="198"
        style={{
          shapeRendering: "auto", // Corrected property name and value syntax
          display: "block", // Corrected property name and value syntax
          background: "transparent", // Corrected property name and value syntax
        }}
      >
        <g>
          <circle
            stroke-dasharray="160.22122533307947 55.40707511102649"
            r="34"
            stroke-width="4"
            stroke="#3a3a3a"
            fill="none"
            cy="50"
            cx="50"
          >
            <animateTransform
              keyTimes="0;1"
              values="0 50 50;360 50 50"
              dur="0.7518796992481203s"
              repeatCount="indefinite"
              type="rotate"
              attributeName="transform"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
};

export default Loading;
