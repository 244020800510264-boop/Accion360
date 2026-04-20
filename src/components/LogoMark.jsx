export function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="24" cy="26" r="10" fill="#bfdbfe" />
      <path
        d="M16 30c2.5 3 6.5 5 11 5s8.5-2 11-5"
        stroke="#1d4ed8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M24 8c-6 0-11 4-12 9h24c-1-5-6-9-12-9z"
        fill="#2563eb"
      />
      <path d="M12 17h24l-2 6H14l-2-6z" fill="#1d4ed8" />
      <ellipse cx="24" cy="17" rx="13" ry="3.5" fill="#3b82f6" />
    </svg>
  );
}
