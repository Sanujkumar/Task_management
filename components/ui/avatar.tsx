
export function Avatar({ children, className }: any) {
  return <div className={`rounded-full bg-gray-300 ${className} flex items-center justify-center text-white text-xl`}>{children}</div>;
}

export function AvatarImage({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return <img src={src} alt={alt} className="rounded-full w-full h-full object-cover" />;
}

export function AvatarFallback({ children }: any) {
  return <span>{children}</span>;
}