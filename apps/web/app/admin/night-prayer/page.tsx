'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { createClient, NightPrayerRow } from '@/lib/supabase';
import { Save, Trash2, ChevronLeft, ChevronRight, Check, Moon } from 'lucide-react';

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
];

const MARIAN_ANTIPHONS = [
  { name: 'Alma Redemptoris Mater', season: 'Advent to Presentation' },
  { name: 'Ave Regina Caelorum', season: 'Presentation to Easter' },
  { name: 'Regina Caeli', season: 'Easter to Pentecost' },
  { name: 'Salve Regina', season: 'Pentecost to Advent' },
];

export default function NightPrayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();

  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDay());
  const [existingContent, setExistingContent] = useState<Map<number, NightPrayerRow>>(new Map());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    examen_opening_prayer: '',
    examen_prompts: ['', '', '', '', ''],
    examen_act_of_contrition: '',
    hymn: '',
    psalm_antiphon: '',
    psalm_reference: '',
    psalm_text: '',
    reading_reference: '',
    reading_text: '',
    responsory_versicle: '',
    responsory_response: '',
    canticle_antiphon: '',
    canticle_text: `Lord, now you let your servant go in peace;
your word has been fulfilled:
my own eyes have seen the salvation
which you have prepared in the sight of every people:
a light to reveal you to the nations
and the glory of your people Israel.`,
    closing_prayer: '',
    marian_antiphon_name: 'Salve Regina',
    marian_antiphon_text: '',
  });

  // Load all night prayer content
  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('night_prayer')
        .select('*')
        .order('day_of_week');

      const contentMap = new Map<number, NightPrayerRow>();
      data?.forEach((item: NightPrayerRow) => {
        contentMap.set(item.day_of_week, item);
      });
      setExistingContent(contentMap);
      setLoading(false);
    };

    fetchContent();
  }, []);

  // Load form when day changes
  useEffect(() => {
    const content = existingContent.get(selectedDay);
    if (content) {
      setFormData({
        examen_opening_prayer: content.examen_opening_prayer,
        examen_prompts: content.examen_prompts.length >= 5
          ? content.examen_prompts.slice(0, 5)
          : [...content.examen_prompts, ...Array(5 - content.examen_prompts.length).fill('')],
        examen_act_of_contrition: content.examen_act_of_contrition,
        hymn: content.hymn || '',
        psalm_antiphon: content.psalm_antiphon,
        psalm_reference: content.psalm_reference,
        psalm_text: content.psalm_text,
        reading_reference: content.reading_reference,
        reading_text: content.reading_text,
        responsory_versicle: content.responsory_versicle,
        responsory_response: content.responsory_response,
        canticle_antiphon: content.canticle_antiphon,
        canticle_text: content.canticle_text,
        closing_prayer: content.closing_prayer,
        marian_antiphon_name: content.marian_antiphon_name,
        marian_antiphon_text: content.marian_antiphon_text,
      });
    } else {
      // Reset to defaults for new entry
      setFormData({
        examen_opening_prayer: '',
        examen_prompts: ['', '', '', '', ''],
        examen_act_of_contrition: '',
        hymn: '',
        psalm_antiphon: '',
        psalm_reference: '',
        psalm_text: '',
        reading_reference: '',
        reading_text: '',
        responsory_versicle: '',
        responsory_response: '',
        canticle_antiphon: '',
        canticle_text: `Lord, now you let your servant go in peace;
your word has been fulfilled:
my own eyes have seen the salvation
which you have prepared in the sight of every people:
a light to reveal you to the nations
and the glory of your people Israel.`,
        closing_prayer: '',
        marian_antiphon_name: 'Salve Regina',
        marian_antiphon_text: '',
      });
    }
  }, [selectedDay, existingContent]);

  const handleSave = async () => {
    setSaving(true);

    const payload = {
      day_of_week: selectedDay,
      examen_opening_prayer: formData.examen_opening_prayer,
      examen_prompts: formData.examen_prompts.filter(p => p.trim() !== ''),
      examen_act_of_contrition: formData.examen_act_of_contrition,
      hymn: formData.hymn || null,
      psalm_antiphon: formData.psalm_antiphon,
      psalm_reference: formData.psalm_reference,
      psalm_text: formData.psalm_text,
      reading_reference: formData.reading_reference,
      reading_text: formData.reading_text,
      responsory_versicle: formData.responsory_versicle,
      responsory_response: formData.responsory_response,
      canticle_antiphon: formData.canticle_antiphon,
      canticle_text: formData.canticle_text,
      closing_prayer: formData.closing_prayer,
      marian_antiphon_name: formData.marian_antiphon_name,
      marian_antiphon_text: formData.marian_antiphon_text,
    };

    const existing = existingContent.get(selectedDay);

    let error;
    if (existing) {
      const result = await supabase
        .from('night_prayer')
        .update(payload)
        .eq('id', existing.id);
      error = result.error;
    } else {
      const result = await supabase
        .from('night_prayer')
        .insert(payload);
      error = result.error;
    }

    if (error) {
      alert('Error saving: ' + error.message);
    } else {
      // Refresh content
      const { data } = await supabase
        .from('night_prayer')
        .select('*')
        .order('day_of_week');

      const contentMap = new Map<number, NightPrayerRow>();
      data?.forEach((item: NightPrayerRow) => {
        contentMap.set(item.day_of_week, item);
      });
      setExistingContent(contentMap);
    }

    setSaving(false);
  };

  const handleDelete = async () => {
    const existing = existingContent.get(selectedDay);
    if (!existing) return;

    if (!confirm('Delete this night prayer content?')) return;

    const { error } = await supabase
      .from('night_prayer')
      .delete()
      .eq('id', existing.id);

    if (error) {
      alert('Error deleting: ' + error.message);
    } else {
      const newMap = new Map(existingContent);
      newMap.delete(selectedDay);
      setExistingContent(newMap);
    }
  };

  const updatePrompt = (index: number, value: string) => {
    const newPrompts = [...formData.examen_prompts];
    newPrompts[index] = value;
    setFormData({ ...formData, examen_prompts: newPrompts });
  };

  const currentDayName = DAYS_OF_WEEK.find(d => d.value === selectedDay)?.label || '';

  return (
    <div className="flex h-screen">
      {/* Day Selector Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-12' : 'w-56'} bg-indigo-950 text-white flex flex-col transition-all duration-300`}>
        <div className="p-4 border-b border-indigo-800 flex items-center justify-between">
          {!sidebarCollapsed && <span className="font-medium">Days of Week</span>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 hover:bg-indigo-800 rounded"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Day List */}
        <div className="flex-1 overflow-y-auto py-2">
          {DAYS_OF_WEEK.map((day) => {
            const hasContent = existingContent.has(day.value);
            const isSelected = selectedDay === day.value;

            return (
              <button
                key={day.value}
                onClick={() => setSelectedDay(day.value)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                  isSelected
                    ? 'bg-indigo-800'
                    : 'hover:bg-indigo-900'
                }`}
              >
                {sidebarCollapsed ? (
                  <div className="relative">
                    <Moon className={`w-5 h-5 ${hasContent ? 'text-purple-400' : 'text-indigo-400'}`} />
                    {hasContent && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full" />
                    )}
                  </div>
                ) : (
                  <>
                    <div className="flex-1 text-left">
                      <div className="font-medium">{day.label}</div>
                    </div>
                    {hasContent && (
                      <Check className="w-4 h-4 text-green-400" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>

        {/* Progress */}
        {!sidebarCollapsed && (
          <div className="p-4 border-t border-indigo-800">
            <div className="text-sm text-indigo-300">
              {existingContent.size}/7 days complete
            </div>
            <div className="mt-2 h-2 bg-indigo-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 transition-all"
                style={{ width: `${(existingContent.size / 7) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Main Editor */}
      <div className="flex-1 overflow-y-auto bg-stone-50">
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-2xl text-stone-800">
                {currentDayName} Night Prayer
              </h1>
              <p className="text-stone-500 mt-1">
                This content will be used every {currentDayName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {existingContent.has(selectedDay) && (
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              )}
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>

          {/* Editor Form */}
          <div className="space-y-8">
            {/* Examen Section */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-violet-50 px-6 py-4 border-b border-violet-100">
                <h2 className="font-serif text-lg text-violet-900">Examen</h2>
                <p className="text-sm text-violet-600 mt-1">Evening reflection and examination of conscience</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Opening Prayer
                  </label>
                  <textarea
                    value={formData.examen_opening_prayer}
                    onChange={(e) => setFormData({ ...formData, examen_opening_prayer: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
                    placeholder="Lord, as this day comes to a close..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Reflection Prompts (up to 5)
                  </label>
                  <div className="space-y-2">
                    {formData.examen_prompts.map((prompt, index) => (
                      <input
                        key={index}
                        type="text"
                        value={prompt}
                        onChange={(e) => updatePrompt(index, e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-stone-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all"
                        placeholder={`Prompt ${index + 1}: e.g., "Where did I encounter God's presence today?"`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Act of Contrition
                  </label>
                  <textarea
                    value={formData.examen_act_of_contrition}
                    onChange={(e) => setFormData({ ...formData, examen_act_of_contrition: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none transition-all resize-none"
                    placeholder="O my God, I am heartily sorry..."
                  />
                </div>
              </div>
            </section>

            {/* Hymn (Optional) */}
            <details className="bg-white rounded-xl border border-stone-200 overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer hover:bg-stone-50 flex items-center justify-between">
                <span className="font-serif text-lg text-stone-800">Hymn (Optional)</span>
                <span className="text-stone-400 text-sm">Click to expand</span>
              </summary>
              <div className="p-6 border-t border-stone-100">
                <textarea
                  value={formData.hymn}
                  onChange={(e) => setFormData({ ...formData, hymn: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  placeholder="Te lucis ante terminum..."
                />
              </div>
            </details>

            {/* Psalmody */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-amber-50 px-6 py-4 border-b border-amber-100">
                <h2 className="font-serif text-lg text-amber-900">Psalmody</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Antiphon
                  </label>
                  <input
                    type="text"
                    value={formData.psalm_antiphon}
                    onChange={(e) => setFormData({ ...formData, psalm_antiphon: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="Night holds no terrors for me..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Psalm Reference
                  </label>
                  <input
                    type="text"
                    value={formData.psalm_reference}
                    onChange={(e) => setFormData({ ...formData, psalm_reference: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    placeholder="Psalm 91"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Psalm Text
                  </label>
                  <textarea
                    value={formData.psalm_text}
                    onChange={(e) => setFormData({ ...formData, psalm_text: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none font-serif"
                    placeholder="He who dwells in the shelter of the Most High..."
                  />
                </div>
              </div>
            </section>

            {/* Reading */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
                <h2 className="font-serif text-lg text-blue-900">Short Reading</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Reference
                  </label>
                  <input
                    type="text"
                    value={formData.reading_reference}
                    onChange={(e) => setFormData({ ...formData, reading_reference: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    placeholder="Revelation 22:4-5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Text
                  </label>
                  <textarea
                    value={formData.reading_text}
                    onChange={(e) => setFormData({ ...formData, reading_text: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none font-serif"
                    placeholder="They shall see the Lord face to face..."
                  />
                </div>
              </div>
            </section>

            {/* Responsory */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-stone-100 px-6 py-4 border-b border-stone-200">
                <h2 className="font-serif text-lg text-stone-800">Responsory</h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Versicle (V.)
                  </label>
                  <input
                    type="text"
                    value={formData.responsory_versicle}
                    onChange={(e) => setFormData({ ...formData, responsory_versicle: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                    placeholder="Into your hands, Lord, I commend my spirit."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Response (R.)
                  </label>
                  <input
                    type="text"
                    value={formData.responsory_response}
                    onChange={(e) => setFormData({ ...formData, responsory_response: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all"
                    placeholder="You have redeemed us, Lord God of truth."
                  />
                </div>
              </div>
            </section>

            {/* Canticle of Simeon */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
                <h2 className="font-serif text-lg text-emerald-900">Gospel Canticle (Nunc Dimittis)</h2>
                <p className="text-sm text-emerald-600 mt-1">Luke 2:29-32</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Antiphon
                  </label>
                  <input
                    type="text"
                    value={formData.canticle_antiphon}
                    onChange={(e) => setFormData({ ...formData, canticle_antiphon: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                    placeholder="Protect us, Lord, as we stay awake..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Canticle Text
                  </label>
                  <textarea
                    value={formData.canticle_text}
                    onChange={(e) => setFormData({ ...formData, canticle_text: e.target.value })}
                    rows={8}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all resize-none font-serif"
                  />
                </div>
              </div>
            </section>

            {/* Closing Prayer */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-stone-100 px-6 py-4 border-b border-stone-200">
                <h2 className="font-serif text-lg text-stone-800">Closing Prayer</h2>
              </div>
              <div className="p-6">
                <textarea
                  value={formData.closing_prayer}
                  onChange={(e) => setFormData({ ...formData, closing_prayer: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-stone-500 focus:ring-2 focus:ring-stone-200 outline-none transition-all resize-none"
                  placeholder="Visit this house, we beg you, Lord..."
                />
              </div>
            </section>

            {/* Marian Antiphon */}
            <section className="bg-white rounded-xl border border-stone-200 overflow-hidden">
              <div className="bg-rose-50 px-6 py-4 border-b border-rose-100">
                <h2 className="font-serif text-lg text-rose-900">Marian Antiphon</h2>
                <p className="text-sm text-rose-600 mt-1">Varies by liturgical season</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Antiphon Name
                  </label>
                  <select
                    value={formData.marian_antiphon_name}
                    onChange={(e) => setFormData({ ...formData, marian_antiphon_name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all bg-white"
                  >
                    {MARIAN_ANTIPHONS.map((antiphon) => (
                      <option key={antiphon.name} value={antiphon.name}>
                        {antiphon.name} ({antiphon.season})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Antiphon Text
                  </label>
                  <textarea
                    value={formData.marian_antiphon_text}
                    onChange={(e) => setFormData({ ...formData, marian_antiphon_text: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-stone-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-200 outline-none transition-all resize-none font-serif"
                    placeholder="Hail, holy Queen, Mother of Mercy..."
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Bottom Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : `Save ${currentDayName}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
