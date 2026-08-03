// Local database — localStorage-based entity management
// Provides async CRUD operations for all entities with no external dependencies

const DB_PREFIX = 'tcai_db_';

function getCollection(entityName) {
  const raw = localStorage.getItem(`${DB_PREFIX}${entityName}`);
  return raw ? JSON.parse(raw) : [];
}

function saveCollection(entityName, data) {
  localStorage.setItem(`${DB_PREFIX}${entityName}`, JSON.stringify(data));
}

function generateId() {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

class Entity {
  constructor(name) {
    this.name = name;
  }

  async list(filters = {}) {
    let records = getCollection(this.name);
    
    // Apply basic filters
    for (const [key, value] of Object.entries(filters)) {
      if (key === 'sort_by') continue;
      if (key === 'limit') continue;
      records = records.filter(r => r[key] === value);
    }

    // Sort by created_date descending by default
    if (filters.sort_by) {
      const [field, dir] = filters.sort_by.split(':');
      records.sort((a, b) => {
        if (dir === 'asc') return a[field] > b[field] ? 1 : -1;
        return a[field] < b[field] ? 1 : -1;
      });
    } else {
      records.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    if (filters.limit) {
      records = records.slice(0, filters.limit);
    }

    return records;
  }

  async get(id) {
    const records = getCollection(this.name);
    return records.find(r => r.id === id) || null;
  }

  async create(data) {
    const records = getCollection(this.name);
    const now = new Date().toISOString();
    const record = {
      id: generateId(),
      created_date: now,
      updated_date: now,
      created_by_id: 'user_1',
      ...data,
    };
    records.push(record);
    saveCollection(this.name, records);
    return record;
  }

  async update(id, data) {
    const records = getCollection(this.name);
    const idx = records.findIndex(r => r.id === id);
    if (idx === -1) throw new Error(`${this.name} with id ${id} not found`);
    
    records[idx] = {
      ...records[idx],
      ...data,
      updated_date: new Date().toISOString(),
    };
    saveCollection(this.name, records);
    return records[idx];
  }

  async delete(id) {
    const records = getCollection(this.name);
    const filtered = records.filter(r => r.id !== id);
    saveCollection(this.name, filtered);
    return { success: true };
  }

  async filter(filterFn) {
    const records = getCollection(this.name);
    return records.filter(filterFn);
  }
}

// Entity instances
export const TradingSession = new Entity('trading_sessions');
export const Trade = new Entity('trades');
export const TradingRule = new Entity('trading_rules');
export const WeeklyGoal = new Entity('weekly_goals');
export const Receipt = new Entity('receipts');
export const TradingDNA = new Entity('trading_dna');

// Helper to get or create the singleton TradingDNA record
export async function getOrCreateDNA() {
  const records = await TradingDNA.list();
  if (records.length > 0) return records[0];
  return await TradingDNA.create({
    total_sessions: 0,
    best_hours: [],
    worst_hours: [],
    common_mistakes: [],
    strongest_habits: [],
    emotional_triggers: [],
    most_profitable_behaviors: [],
    recurring_patterns: [],
    avg_execution_score: 0,
  });
}

// Helper to bulk update rules
export async function bulkUpdateRules(updates) {
  const records = getCollection('trading_rules');
  for (const { id, ...data } of updates) {
    const idx = records.findIndex(r => r.id === id);
    if (idx !== -1) {
      records[idx] = { ...records[idx], ...data, updated_date: new Date().toISOString() };
    }
  }
  saveCollection('trading_rules', records);
  return records;
}
