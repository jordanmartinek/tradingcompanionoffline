// Cross-window state synchronization via BroadcastChannel + storage event
// When one window writes to localStorage, the other detects it and reloads.

const CHANNEL_NAME = 'tcai_sync';

let channel = null;
try {
  channel = new BroadcastChannel(CHANNEL_NAME);
} catch (e) {
  // BroadcastChannel not supported — fall back to storage event only
}

/**
 * Notify other windows that data has changed.
 * @param {string} type - e.g. 'rules', 'trades', 'session'
 */
export function notifyChange(type) {
  const msg = { type, timestamp: Date.now() };
  
  // BroadcastChannel works across tabs/windows on same origin
  if (channel) {
    channel.postMessage(msg);
  }

  // Also set a volatile localStorage key to trigger the 'storage' event
  // (storage event fires on OTHER windows, not the current one)
  localStorage.setItem('tcai_sync_signal', JSON.stringify(msg));
}

/**
 * Listen for changes from other windows.
 * @param {function} callback - called with { type, timestamp } when another window signals a change
 * @returns {function} cleanup function
 */
export function onSyncChange(callback) {
  // Listen via BroadcastChannel
  const handleMessage = (event) => {
    callback(event.data);
  };
  if (channel) {
    channel.addEventListener('message', handleMessage);
  }

  // Listen via storage event (fires when another tab/window modifies localStorage)
  const handleStorage = (event) => {
    if (event.key === 'tcai_sync_signal' && event.newValue) {
      try {
        const msg = JSON.parse(event.newValue);
        callback(msg);
      } catch (e) {}
    }
    // Also catch direct DB changes
    if (event.key && event.key.startsWith('tcai_db_')) {
      const entityName = event.key.replace('tcai_db_', '');
      callback({ type: entityName, timestamp: Date.now() });
    }
  };
  window.addEventListener('storage', handleStorage);

  return () => {
    if (channel) channel.removeEventListener('message', handleMessage);
    window.removeEventListener('storage', handleStorage);
  };
}
