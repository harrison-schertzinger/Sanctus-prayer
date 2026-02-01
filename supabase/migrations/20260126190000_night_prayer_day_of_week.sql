-- Modify Night Prayer to be day-of-week based instead of date-based
-- Each day of the week (Monday-Sunday) has the same content every week

-- Drop the date column and add day_of_week
ALTER TABLE public.night_prayer
  DROP COLUMN IF EXISTS date;

ALTER TABLE public.night_prayer
  ADD COLUMN IF NOT EXISTS day_of_week integer NOT NULL DEFAULT 0
  CHECK (day_of_week >= 0 AND day_of_week <= 6);

-- Create unique index on day_of_week (only 7 entries possible: 0=Sunday through 6=Saturday)
DROP INDEX IF EXISTS idx_night_prayer_date;
CREATE UNIQUE INDEX IF NOT EXISTS idx_night_prayer_day_of_week ON public.night_prayer(day_of_week);

-- Add comment explaining the day mapping
COMMENT ON COLUMN public.night_prayer.day_of_week IS 'Day of week: 0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday';
