import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import {
  requestPermission,
  getNotificationSettings,
  saveNotificationSettings,
  sendNotification,
} from '@/lib/notifications';

export default function NotificationSettings() {
  const [settings, setSettings] = useState(getNotificationSettings);
  const [permissionStatus, setPermissionStatus] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'denied'
  );

  useEffect(() => {
    saveNotificationSettings(settings);
  }, [settings]);

  const handleEnable = async (enabled) => {
    if (enabled) {
      const granted = await requestPermission();
      if (!granted) {
        setPermissionStatus(Notification.permission);
        return;
      }
      setPermissionStatus('granted');
      // Send a test notification
      sendNotification('Notifications Enabled', 'You will receive trading reminders at your scheduled times.', 'test');
    }
    setSettings(prev => ({ ...prev, enabled }));
  };

  const update = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <Label className="text-xs">Push Notifications</Label>
          <p className="text-[10px] text-zinc-600 mt-0.5">Motivational reminders + rule alerts</p>
        </div>
        <Switch
          checked={settings.enabled}
          onCheckedChange={handleEnable}
        />
      </div>

      {permissionStatus === 'denied' && settings.enabled && (
        <p className="text-[10px] text-red-400">Browser blocked notifications. Enable in browser settings.</p>
      )}

      {settings.enabled && permissionStatus === 'granted' && (
        <div className="space-y-3 pt-2 border-t border-zinc-800/50 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px]">Session Start</Label>
              <Input
                type="time"
                value={settings.sessionStartTime}
                onChange={(e) => update('sessionStartTime', e.target.value)}
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px]">Session End</Label>
              <Input
                type="time"
                value={settings.sessionEndTime}
                onChange={(e) => update('sessionEndTime', e.target.value)}
                className="h-8 text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-[10px]">Rule Reminder Interval (minutes)</Label>
            <Input
              type="number"
              min={5}
              max={60}
              step={5}
              value={settings.reminderIntervalMinutes}
              onChange={(e) => update('reminderIntervalMinutes', Math.max(5, Number(e.target.value) || 15))}
              className="h-8 text-xs"
            />
            <p className="text-[10px] text-zinc-600">
              During trading hours, sends reminders about your specific rules every {settings.reminderIntervalMinutes} min.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
