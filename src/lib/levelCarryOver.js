const STORAGE_KEY = 'tcai_level_queue';
const CARRYOVER_KEY = 'tcai_level_carryover';

// Save current unswept levels for tomorrow
export function saveUnsweptLevels() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  const queue = JSON.parse(raw);
  const unswept = queue.filter(l => l.status !== 'swept');
  if (unswept.length > 0) {
    localStorage.setItem(CARRYOVER_KEY, JSON.stringify({
      levels: unswept,
      date: new Date().toISOString().slice(0, 10),
    }));
  }
}

// Get yesterday's unswept levels (if any)
export function getCarryOverLevels() {
  const raw = localStorage.getItem(CARRYOVER_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  // Only offer if saved yesterday (not older)
  const today = new Date().toISOString().slice(0, 10);
  if (data.date === today) return []; // same day, no carryover needed
  return data.levels || [];
}

// Clear carryover after importing
export function clearCarryOver() {
  localStorage.removeItem(CARRYOVER_KEY);
}

// Import carryover levels into the active queue
export function importCarryOverLevels() {
  const levels = getCarryOverLevels();
  if (levels.length === 0) return false;
  const raw = localStorage.getItem(STORAGE_KEY);
  const current = raw ? JSON.parse(raw) : [];
  // Reset status to 'watching' and add
  const imported = levels.map(l => ({ ...l, status: 'watching', id: Date.now() + '_' + Math.random().toString(36).slice(2) }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...current, ...imported]));
  clearCarryOver();
  return true;
}
