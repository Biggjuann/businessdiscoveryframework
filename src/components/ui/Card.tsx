interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`rounded-xl border border-kova-navy-light bg-kova-navy-mid p-6 shadow-sm ${className}`}>
      {title && <h3 className="mb-4 text-lg font-semibold font-display text-white">{title}</h3>}
      {children}
    </div>
  );
}
