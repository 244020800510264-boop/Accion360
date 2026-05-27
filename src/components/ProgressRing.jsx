import { useEffect, useRef } from "react";

export default function ProgressRing({ progress, size = 192, strokeWidth = 8, children }) {
  const circleRef = useRef(null);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (circleRef.current) {
      circleRef.current.style.strokeDasharray = `${circumference} ${circumference}`;
      circleRef.current.style.strokeDashoffset = circumference;
      
      setTimeout(() => {
        if (circleRef.current) {
          circleRef.current.style.strokeDashoffset = offset;
        }
      }, 500);
    }
  }, [circumference, offset]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-surface-container-high stroke-current"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          ref={circleRef}
          className="text-primary stroke-current transition-all duration-500 ease-out"
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          r={radius}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
