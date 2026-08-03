import { useState, useEffect, useCallback } from 'react';
import { TradingRule, bulkUpdateRules } from '@/api/db';

const DEFAULT_RULES = [
  { title: 'EMA Alignment', description: 'Price respecting EMA structure', category: 'entry', order: 1 },
  { title: 'Liquidity Sweep', description: 'Clear liquidity taken before entry', category: 'entry', order: 2 },
  { title: 'MSS on LTF', description: 'Market structure shift confirmed on lower timeframe', category: 'entry', order: 3 },
  { title: 'R/R Minimum 1:2', description: 'Risk to reward ratio at least 1:2', category: 'risk', order: 4 },
  { title: 'Max 3 Trades', description: 'Do not exceed 3 trades per day', category: 'risk', order: 5 },
  { title: 'No Red News', description: 'No high-impact news within 30 minutes', category: 'filter', order: 6 },
  { title: 'Killzone Hours Only', description: 'Only trade during London or NY killzones', category: 'filter', order: 7 },
];

export function useTradingRules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRules = useCallback(async () => {
    try {
      let existing = await TradingRule.list();
      
      // Seed defaults if empty
      if (existing.length === 0) {
        for (const rule of DEFAULT_RULES) {
          await TradingRule.create({ ...rule, enabled: false });
        }
        existing = await TradingRule.list();
      }
      
      // Sort by order
      existing.sort((a, b) => (a.order || 0) - (b.order || 0));
      setRules(existing);
    } catch (err) {
      console.error('Failed to load rules:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRules();
  }, [loadRules]);

  const toggleRule = useCallback(async (ruleId) => {
    setRules(prev => {
      const updated = prev.map(r => 
        r.id === ruleId ? { ...r, enabled: !r.enabled } : r
      );
      return updated;
    });
    
    const rule = rules.find(r => r.id === ruleId);
    if (rule) {
      await TradingRule.update(ruleId, { enabled: !rule.enabled });
    }
  }, [rules]);

  const addRule = useCallback(async ({ title, category, description = '' }) => {
    const maxOrder = rules.reduce((max, r) => Math.max(max, r.order || 0), 0);
    const newRule = await TradingRule.create({
      title,
      category,
      description,
      enabled: false,
      order: maxOrder + 1,
    });
    setRules(prev => [...prev, newRule]);
  }, [rules]);

  const deleteRule = useCallback(async (ruleId) => {
    await TradingRule.delete(ruleId);
    setRules(prev => prev.filter(r => r.id !== ruleId));
  }, []);

  const resetAllRules = useCallback(async () => {
    const updates = rules.map(r => ({ id: r.id, enabled: false }));
    await bulkUpdateRules(updates);
    setRules(prev => prev.map(r => ({ ...r, enabled: false })));
  }, [rules]);

  return { rules, setRules, toggleRule, addRule, deleteRule, resetAllRules, loading, reload: loadRules };
}
