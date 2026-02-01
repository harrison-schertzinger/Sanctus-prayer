'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient, DailyReadingRow } from '@/lib/supabase';
import { Save, Trash2, ChevronLeft, ChevronRight, Check, Circle } from 'lucide-react';

const LITURGICAL_COLORS = [
  { value: 'green', label: 'Green', color: '#22c55e' },
  { value: 'white', label: 'White', color: '#e5e5e5' },
  { value: 'red', label: 'Red', color: '#ef4444' },
  { value: 'violet', label: 'Violet', color: '#8b5cf6' },
  { value: 'rose', label: 'Rose', color: '#f472b6' },
  { value: 'black', label: 'Black', color: '#1f2937' },
];

const SEASONS = [
  { value: 'ordinary_time', label: 'Ordinary Time' },
  { value: 'advent', label: 'Advent' },
  { value: 'christmas', label: 'Christmas' },
  { value: 'lent', label: 'Lent' },
  { value: 'triduum', label: 'Triduum' },
  { value: 'easter', label: 'Easter' },
];

export default function ReadingsAdmin() {
  const supabase = createClient();

  // Date navigation state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Readings data
  const [existingDates, setExistingDates] = useState<Set<string>>(new Set());
  const [reading, setReading] = useState<Partial<DailyReadingRow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const dateListRef = useRef<HTMLDivElement>(null);

  // Fetch all existing reading dates
  useEffect(() => {
    const fetchExistingDates = async () => {
      const { data } = await supabase
        .from('daily_readings')
        .select('date');

      const dates = new Set(data?.map(r => r.date) || []);
      setExistingDates(dates);
      setLoading(false);
    };
    fetchExistingDates();
  }, []);

  // Fetch reading for selected date
  useEffect(() => {
    const fetchReading = async () => {
      if (!selectedDate) return;

      const { data } = await supabase
        .from('daily_readings')
        .select('*')
        .eq('date', selectedDate)
        .single();

      if (data) {
        setReading(data);
      } else {
        // Create empty reading for this date
        setReading({
          date: selectedDate,
          liturgical_day: '',
          liturgical_color: 'green',
          season: 'ordinary_time',
          first_reading_reference: '',
          first_reading_text: '',
          first_reading_introduction: 'A reading from ',
          psalm_reference: '',
          psalm_response: '',
          psalm_text: '',
          gospel_reference: '',
          gospel_text: '',
          gospel_introduction: 'A reading from the holy Gospel according to ',
        });
      }
    };
    fetchReading();
  }, [selectedDate]);

  // Generate dates for the sidebar (show ~60 days centered on current month)
  const generateDates = () => {
    const dates: Date[] = [];
    const start = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    start.setDate(start.getDate() - 15); // Start 15 days before month

    for (let i = 0; i < 60; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const handleSave = async () => {
    if (!reading) return;

    setSaving(true);
    setMessage(null);

    const isUpdate = existingDates.has(selectedDate);

    try {
      if (isUpdate) {
        const { error } = await supabase
          .from('daily_readings')
          .update(reading)
          .eq('date', selectedDate);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('daily_readings')
          .insert(reading);

        if (error) throw error;
        setExistingDates(prev => new Set([...prev, selectedDate]));
      }

      setMessage({ type: 'success', text: 'Saved!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this reading?')) return;

    const { error } = await supabase
      .from('daily_readings')
      .delete()
      .eq('date', selectedDate);

    if (!error) {
      setExistingDates(prev => {
        const next = new Set(prev);
        next.delete(selectedDate);
        return next;
      });
      setReading({
        date: selectedDate,
        liturgical_day: '',
        liturgical_color: 'green',
        season: 'ordinary_time',
        first_reading_reference: '',
        first_reading_text: '',
        first_reading_introduction: 'A reading from ',
        psalm_reference: '',
        psalm_response: '',
        psalm_text: '',
        gospel_reference: '',
        gospel_text: '',
        gospel_introduction: 'A reading from the holy Gospel according to ',
      });
      setMessage({ type: 'success', text: 'Deleted' });
    }
  };

  const updateField = (field: string, value: any) => {
    setReading(prev => prev ? { ...prev, [field]: value } : null);
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const formatDateForDisplay = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toISOString().split('T')[0] === selectedDate;
  };

  const hasContent = (date: Date) => {
    return existingDates.has(date.toISOString().split('T')[0]);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-stone-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] lg:h-screen">
      {/* Date Sidebar */}
      <div className={`${sidebarOpen ? 'w-48' : 'w-0'} transition-all duration-300 bg-stone-900 text-white overflow-hidden flex-shrink-0`}>
        <div className="w-48">
          {/* Month Navigation */}
          <div className="p-4 border-b border-stone-800 flex items-center justify-between">
            <button onClick={prevMonth} className="p-1 hover:bg-stone-800 rounded">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {currentMonth.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-stone-800 rounded">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Date List */}
          <div ref={dateListRef} className="overflow-y-auto h-[calc(100%-60px)]">
            {dates.map((date) => {
              const dateStr = date.toISOString().split('T')[0];
              const selected = isSelected(date);
              const today = isToday(date);
              const hasData = hasContent(date);

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`w-full px-4 py-3 text-left flex items-center justify-between transition-colors ${
                    selected
                      ? 'bg-amber-600 text-white'
                      : today
                      ? 'bg-stone-800 text-amber-400'
                      : 'hover:bg-stone-800'
                  }`}
                >
                  <span className={`${selected || today ? 'font-semibold' : ''}`}>
                    {formatDateForDisplay(date)}
                  </span>
                  {hasData && !selected && (
                    <Check className="w-4 h-4 text-green-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Toggle Sidebar Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-stone-800 text-white p-1 rounded-r lg:hidden"
        style={{ left: sidebarOpen ? '192px' : '0' }}
      >
        {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

      {/* Main Editor */}
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <div className="max-w-3xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl text-stone-800">
                {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {existingDates.has(selectedDate) ? (
                  <span className="text-sm text-green-600 flex items-center gap-1">
                    <Check className="w-4 h-4" /> Content saved
                  </span>
                ) : (
                  <span className="text-sm text-stone-400 flex items-center gap-1">
                    <Circle className="w-4 h-4" /> No content yet
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {message && (
                <span className={`text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {message.text}
                </span>
              )}
              {existingDates.has(selectedDate) && (
                <button
                  onClick={handleDelete}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {reading && (
            <div className="space-y-6">
              {/* Liturgical Info */}
              <div className="bg-white rounded-xl border border-stone-200 p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
                      Liturgical Day
                    </label>
                    <input
                      type="text"
                      value={reading.liturgical_day || ''}
                      onChange={(e) => updateField('liturgical_day', e.target.value)}
                      placeholder="e.g., Third Sunday in Ordinary Time"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-200 outline-none text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
                        Color
                      </label>
                      <select
                        value={reading.liturgical_color || 'green'}
                        onChange={(e) => updateField('liturgical_color', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm"
                      >
                        {LITURGICAL_COLORS.map(c => (
                          <option key={c.value} value={c.value}>{c.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-stone-500 uppercase tracking-wide mb-2">
                        Season
                      </label>
                      <select
                        value={reading.season || 'ordinary_time'}
                        onChange={(e) => updateField('season', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm"
                      >
                        {SEASONS.map(s => (
                          <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* First Reading */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-stone-100 bg-stone-50">
                  <div className="w-1 h-5 bg-blue-600 rounded" />
                  <span className="font-medium text-stone-700 text-sm">First Reading</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={reading.first_reading_reference || ''}
                        onChange={(e) => updateField('first_reading_reference', e.target.value)}
                        placeholder="Isaiah 55:10-11"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={reading.first_reading_introduction || ''}
                        onChange={(e) => updateField('first_reading_introduction', e.target.value)}
                        placeholder="A reading from..."
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm italic text-stone-600"
                      />
                    </div>
                  </div>
                  <textarea
                    value={reading.first_reading_text || ''}
                    onChange={(e) => updateField('first_reading_text', e.target.value)}
                    rows={5}
                    placeholder="Enter the reading text..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-serif leading-relaxed"
                  />
                </div>
              </div>

              {/* Responsorial Psalm */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-stone-100 bg-stone-50">
                  <div className="w-1 h-5 bg-amber-500 rounded" />
                  <span className="font-medium text-stone-700 text-sm">Responsorial Psalm</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={reading.psalm_reference || ''}
                      onChange={(e) => updateField('psalm_reference', e.target.value)}
                      placeholder="Psalm 65"
                      className="w-1/4 px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-medium"
                    />
                    <input
                      type="text"
                      value={reading.psalm_response || ''}
                      onChange={(e) => updateField('psalm_response', e.target.value)}
                      placeholder="R. The seed that falls on good ground..."
                      className="flex-1 px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-serif italic text-amber-700"
                    />
                  </div>
                  <textarea
                    value={reading.psalm_text || ''}
                    onChange={(e) => updateField('psalm_text', e.target.value)}
                    rows={3}
                    placeholder="Psalm verses..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-serif leading-relaxed"
                  />
                </div>
              </div>

              {/* Gospel */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-stone-100 bg-stone-50">
                  <div className="w-1 h-5 bg-red-700 rounded" />
                  <span className="font-medium text-stone-700 text-sm">Gospel</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex gap-3">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={reading.gospel_reference || ''}
                        onChange={(e) => updateField('gospel_reference', e.target.value)}
                        placeholder="Matthew 13:1-23"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={reading.gospel_introduction || ''}
                        onChange={(e) => updateField('gospel_introduction', e.target.value)}
                        placeholder="A reading from the holy Gospel..."
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm italic text-stone-600"
                      />
                    </div>
                  </div>
                  <textarea
                    value={reading.gospel_text || ''}
                    onChange={(e) => updateField('gospel_text', e.target.value)}
                    rows={8}
                    placeholder="Enter the Gospel text..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-serif leading-relaxed"
                  />
                </div>
              </div>

              {/* Second Reading (Optional) */}
              <details className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                <summary className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-stone-50">
                  <div className="w-1 h-5 bg-stone-400 rounded" />
                  <span className="font-medium text-stone-500 text-sm">Second Reading (Optional - Sundays)</span>
                </summary>
                <div className="p-5 space-y-3 border-t border-stone-100">
                  <div className="flex gap-3">
                    <div className="w-1/3">
                      <input
                        type="text"
                        value={reading.second_reading_reference || ''}
                        onChange={(e) => updateField('second_reading_reference', e.target.value)}
                        placeholder="Romans 8:18-23"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-medium"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={reading.second_reading_introduction || ''}
                        onChange={(e) => updateField('second_reading_introduction', e.target.value)}
                        placeholder="A reading from..."
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm italic text-stone-600"
                      />
                    </div>
                  </div>
                  <textarea
                    value={reading.second_reading_text || ''}
                    onChange={(e) => updateField('second_reading_text', e.target.value)}
                    rows={5}
                    placeholder="Enter the reading text..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 focus:border-amber-500 outline-none text-sm font-serif leading-relaxed"
                  />
                </div>
              </details>

              <div className="h-8" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
