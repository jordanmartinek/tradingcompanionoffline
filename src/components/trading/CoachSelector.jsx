import React from 'react';
import { Select, SelectOption } from '@/components/ui/select';
import { personalityList } from '@/shared/coachPersonalities';

export default function CoachSelector({ value, onChange }) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 text-xs w-40"
    >
      {personalityList.map((p) => (
        <SelectOption key={p.key} value={p.key}>
          {p.label}
        </SelectOption>
      ))}
    </Select>
  );
}
