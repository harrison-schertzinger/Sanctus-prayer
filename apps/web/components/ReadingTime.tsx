'use client';

import { Clock } from 'lucide-react';

interface ReadingTimeProps {
  minutes: number;
}

export default function ReadingTime({ minutes }: ReadingTimeProps) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-[#6B6B6B]">
      <Clock size={14} />
      <span>{minutes} min read</span>
    </div>
  );
}
