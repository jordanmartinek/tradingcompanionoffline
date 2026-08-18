/**
 * Cockpit Database Layer — localStorage CRUD for the professional trading cockpit
 * Uses 'dt_' prefix to avoid conflicts with the main app's 'tcai_db_' prefix
 */

const DB_PREFIX = 'dt_';

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

function getCollection(entity) {
  const key = `${DB_PREFIX}${entity}`;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveCollection(entity, data) {
  const key = `${DB_PREFIX}${entity}`;
  localStorage.setItem(key, JSON.stringify(data));
}

export function create(entity, record) {
  const collection = getCollection(entity);
  const now = new Date().toISOString();
  const newRecord = { id: generateId(), created_date: now, updated_date: now, ...record };
  collection.push(newRecord);
  saveCollection(entity, collection);
  return newRecord;
}

export function list(entity, filter = null) {
  const collection = getCollection(entity);
  if (!filter) return collection;
  return collection.filter((item) =>
    Object.entries(filter).every(([key, value]) => item[key] === value)
  );
}

export function get(entity, id) {
  return getCollection(entity).find((item) => item.id === id) || null;
}

export function update(entity, id, updates) {
  const collection = getCollection(entity);
  const index = collection.findIndex((item) => item.id === id);
  if (index === -1) return null;
  collection[index] = { ...collection[index], ...updates, updated_date: new Date().toISOString() };
  saveCollection(entity, collection);
  return collection[index];
}

export function remove(entity, id) {
  const collection = getCollection(entity);
  saveCollection(entity, collection.filter((item) => item.id !== id));
}

export function getOrCreate(entity, defaults, filter = null) {
  const existing = list(entity, filter);
  if (existing.length > 0) return existing[0];
  return create(entity, defaults);
}

export function upsert(entity, filter, data) {
  const existing = list(entity, filter);
  if (existing.length > 0) return update(entity, existing[0].id, data);
  return create(entity, { ...filter, ...data });
}

export const ENTITIES = {
  MARKET_LEVELS: 'market_levels',
  LIQUIDITY_ZONES: 'liquidity_zones',
  MARKET_CONTEXT: 'market_context',
  TRADES: 'trades',
  DISCIPLINE_VIOLATIONS: 'discipline_violations',
  RISK_PROFILE: 'risk_profile',
};

export default { create, list, get, update, remove, getOrCreate, upsert, ENTITIES };
