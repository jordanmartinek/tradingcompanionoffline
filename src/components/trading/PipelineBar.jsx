import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'levelQueued', label: 'Queue Level' },
  { key: 'sweeping', label: 'Sweeping' },
  { key: 'swept', label: 'Swept' },
  { key: 'displacementConfirmed', label: 'Displacement' },
  { key: 'rulesScore', label: 'Rules' },
  { key: 'trapped', label: 'TRAPPED' },
  { key: 'executed', label: 'Execute' },
];

function getStepCompleted(step, props) {
  switch (step.key) {
    case 'levelQueued':
      return !!props.levelQueued;
    case 'sweeping':
      return !!props.sweeping;
    case 'swept':
      return !!props.swept;
    case 'displacementConfirmed':
      return !!props.displacementConfirmed;
    case 'rulesScore':
      return props.rulesScore >= 80;
    case 'trapped':
      return !!props.trapped;
    case 'executed':
      return !!props.executed;
    default:
      return false;
  }
}

function getActiveStepIndex(props) {
  for (let i = 0; i < STEPS.length; i++) {
    if (!getStepCompleted(STEPS[i], props)) {
      return i;
    }
  }
  return -1;
}

export default function PipelineBar({
  levelQueued = false,
  sweeping = false,
  swept = false,
  displacementConfirmed = false,
  rulesScore = 0,
  trapped = false,
  executed = false,
}) {
  const props = { levelQueued, sweeping, swept, displacementConfirmed, rulesScore, trapped, executed };
  const activeIndex = getActiveStepIndex(props);

  return (
    <div className="flex items-center w-full gap-0">
      {STEPS.map((step, i) => {
        const completed = getStepCompleted(step, props);
        const isActive = i === activeIndex;
        const nextCompleted = i < STEPS.length - 1 && getStepCompleted(STEPS[i + 1], props);

        return (
          <div key={step.key} className="flex items-center">
            {/* Step dot + label */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'w-2 h-2 rounded-full transition-all',
                  completed ? 'bg-teal-400' : 'bg-zinc-700',
                  isActive && 'animate-pulse ring-1 ring-teal-400/40'
                )}
              />
              <span
                className={cn(
                  'text-[9px] mt-0.5 whitespace-nowrap hidden sm:block',
                  completed ? 'text-teal-400' : 'text-zinc-500'
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={cn(
                  'h-[1px] w-3 sm:w-5 mx-0.5',
                  completed && nextCompleted ? 'bg-teal-400' : completed ? 'bg-teal-400/40' : 'bg-zinc-800'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
