import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';
import { LOCATION_TYPES } from '@/lib/cockpitConstants';

export default function LocationPanel() {
  const { location, setLocation } = useCockpit();

  const handleClick = (loc) => {
    setLocation(location === loc ? '' : loc);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Location</h3>
        {location && (
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-teal-400/10 text-teal-400 font-medium">
            {location}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <div className="grid grid-cols-3 gap-1">
          {LOCATION_TYPES.map((loc) => (
            <button
              key={loc}
              onClick={() => handleClick(loc)}
              className={cn(
                'px-1.5 py-1.5 rounded text-[10px] font-medium border transition-colors text-center',
                location === loc
                  ? 'bg-teal-400/10 border-teal-400/50 text-teal-400'
                  : 'bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
