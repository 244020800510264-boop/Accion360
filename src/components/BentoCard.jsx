export default function BentoCard({ children, className = "", ...props }) {
  return (
    <div
      className={`bg-surface-container-lowest p-6 md:p-8 rounded-xl shadow-soft-focus border border-outline-variant/30 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
