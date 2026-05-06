import React from "react";

export function Loader({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={`inline-block align-middle animate-spin border-2 border-t-transparent border-gray-400 rounded-full ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
