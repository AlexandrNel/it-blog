export const FilterLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={`text-base font-medium ${className || ""}`}>{children}</div>;
};
