export default function SpinLoader({
  size = "sm",
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-4",
    lg: "w-8 h-8 border-4",
    xl: "w-12 h-12 border-6",
  };

  return (
    <div
      className={` border-t-blue-500 border-gray-300 rounded-full animate-spin ${sizeClasses[size]} ${className}`}
    ></div>
  );
}
