const Star = ({ filledPercentage }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="star"
      width="24px"
      height="24px"
    >
      <defs>
        <linearGradient id="half-fill">
          <stop offset={`${filledPercentage}%`} stopColor="#FFD700" />
          <stop offset={`${filledPercentage}%`} stopColor="none" />
        </linearGradient>
      </defs>
      <path
        fill="url(#half-fill)"
        d="M12 .587l3.668 7.571 8.332 1.151-6.001 5.859 1.416 8.284L12 18.897l-7.415 4.555 1.416-8.284-6.001-5.859 8.332-1.151z"
      />
    </svg>
  );

export default Star