// Utility for merging class names (simplified clsx + tailwind-merge)
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
