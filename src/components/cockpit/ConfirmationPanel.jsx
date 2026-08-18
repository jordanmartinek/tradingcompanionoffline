import { useCockpit } from '@/lib/cockpitStore';
import { cn } from '@/lib/utils';

export default function ConfirmationPanel() {
  const {
    confirmation,
    setConfirmation,
    internalStructure,
    setInternalStructure,
    confirmationCount,
    confirmationTotal,
  } = useCockpit();

  const allComplete = confirmationCount === confirmationTotal && internalStructure;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Confirmation</h3>
        <span className={cn(
          'text-[10px] tabular-nums font-medium',
          allComplete ? 'text-green-400' : 'text-zinc-500'
        )}>
          {confirmationCount}/{confirmationTotal}
        </span>
      </div>
      <div className="space-y-2">
        {/* Internal Structure Toggle */}
        <button
          onClick={() => setInternalStructure(!internalStructure)}
          className={cn(
            'w-full flex items-center gap-2 px-2 py-1.5 rounded border transition-colors text-left',
            internalStructure
              ? 'bg-green-400/5 border-green-400/30'
              : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
          )}
        >
          <span className={cn(
            'flex-shrink-0 w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px]',
            internalStructure
              ? 'border-green-400 bg-green-400/20 text-green-400'
              : 'border-zinc-600 text-transparent'
          )}>
            ✓
          </span>
          <span className={cn(
            'text-xs',
            internalStructure ? 'text-green-400' : 'text-zinc-400'
          )}>
            Internal Structure Supports
          </span>
        </button>

        {/* Confirmation Checklist */}
        <div className="space-y-1">
          {confirmation.map((item) => (
            <button
              key={item.id}
              onClick={() => setConfirmation(item.id, !item.checked)}
              className={cn(
                'w-full flex items-center gap-2 px-2 py-1 rounded border transition-colors text-left',
                item.checked
                  ? 'bg-green-400/5 border-green-400/20'
                  : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
              )}
            >
              <span className={cn(
                'flex-shrink-0 w-3 h-3 rounded-full border flex items-center justify-center text-[7px]',
                item.checked
                  ? 'border-green-400 bg-green-400/20 text-green-400'
                  : 'border-zinc-600 text-transparent'
              )}>
                ✓
              </span>
              <span className={cn(
                'text-[11px]',
                item.checked ? 'text-green-400' : 'text-zinc-400'
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {/* Complete Banner */}
        {allComplete && (
          <div className="text-center py-1.5 rounded bg-green-400/10 border border-green-400/30">
            <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">
              Confirmation Complete
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
