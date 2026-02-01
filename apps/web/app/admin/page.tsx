'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { BookOpen, Moon, Plus, Calendar } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ readings: 0, nightPrayer: 0 });
  const [recentReadings, setRecentReadings] = useState<any[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      // Get counts
      const { count: readingsCount } = await supabase
        .from('daily_readings')
        .select('*', { count: 'exact', head: true });

      const { count: nightPrayerCount } = await supabase
        .from('night_prayer')
        .select('*', { count: 'exact', head: true });

      setStats({
        readings: readingsCount || 0,
        nightPrayer: nightPrayerCount || 0,
      });

      // Get recent readings
      const { data: readings } = await supabase
        .from('daily_readings')
        .select('id, date, liturgical_day')
        .order('date', { ascending: false })
        .limit(5);

      setRecentReadings(readings || []);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-serif text-3xl text-stone-800 mb-2">Dashboard</h1>
        <p className="text-stone-500 mb-8">Manage daily readings and night prayer content</p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div className="text-3xl font-light text-stone-800">{stats.readings}</div>
                <div className="text-stone-500">Daily Readings</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Moon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <div className="text-3xl font-light text-stone-800">{stats.nightPrayer}</div>
                <div className="text-stone-500">Night Prayers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            href="/admin/readings?new=true"
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl p-6 transition-colors flex items-center gap-4"
          >
            <Plus className="w-6 h-6" />
            <div>
              <div className="font-medium">Add Daily Reading</div>
              <div className="text-amber-100 text-sm">Create a new reading entry</div>
            </div>
          </Link>

          <Link
            href="/admin/night-prayer?new=true"
            className="bg-stone-800 hover:bg-stone-900 text-white rounded-xl p-6 transition-colors flex items-center gap-4"
          >
            <Plus className="w-6 h-6" />
            <div>
              <div className="font-medium">Add Night Prayer</div>
              <div className="text-stone-400 text-sm">Create a new night prayer</div>
            </div>
          </Link>
        </div>

        {/* Recent Readings */}
        <div className="bg-white rounded-xl border border-stone-200">
          <div className="p-6 border-b border-stone-200 flex justify-between items-center">
            <h2 className="font-serif text-xl text-stone-800">Recent Readings</h2>
            <Link href="/admin/readings" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentReadings.length > 0 ? (
            <div className="divide-y divide-stone-100">
              {recentReadings.map((reading) => (
                <Link
                  key={reading.id}
                  href={`/admin/readings?edit=${reading.id}`}
                  className="flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-stone-500" />
                  </div>
                  <div>
                    <div className="font-medium text-stone-800">
                      {new Date(reading.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <div className="text-sm text-stone-500">{reading.liturgical_day}</div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-stone-500">
              No readings yet. Add your first reading to get started.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
