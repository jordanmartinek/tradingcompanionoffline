import { cn } from '@/lib/utils';

export default function CompactModeToggle({ compact, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        'p-1 rounded text-[10px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors',
        'border border-zinc-800/50'
      )}
      title={compact ? 'Expand view' : 'Compact view'}
    >
      {compact ? (
        // Expand icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H3.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 .75-.75v-3.5a.75.75 0 0 0-1.5 0v1.69L3.28 2.22ZM12.72 13.78a.75.75 0 1 0 1.06-1.06L10.56 9.5h1.69a.75.75 0 0 0 0-1.5h-3.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 0 1.5 0v-1.69l3.22 3.22Z" />
        </svg>
      ) : (
        // Compact/minimize icon
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5a.75.75 0 0 0 .75.75h3.5a.75.75 0 0 0 0-1.5h-1.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L8.75 5.44V3.75ZM7.25 12.25a.75.75 0 0 0 1.5 0v-3.5a.75.75 0 0 0-.75-.75h-3.5a.75.75 0 0 0 0 1.5h1.69L2.97 12.72a.75.75 0 1 0 1.06 1.06l3.22-3.22v1.69Z" />
        </svg>
      )}
    </button>
  );
}
