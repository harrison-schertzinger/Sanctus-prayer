-- Content Management Tables for Sanctus
-- Stores daily readings and night prayer content

-- ============================================
-- Daily Mass Readings
-- ============================================
create table if not exists public.daily_readings (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,

  -- Liturgical info
  liturgical_day text not null,
  liturgical_color text default 'green' check (liturgical_color in ('green', 'white', 'red', 'violet', 'rose', 'black')),
  season text default 'ordinary_time' check (season in ('advent', 'christmas', 'ordinary_time', 'lent', 'easter', 'triduum')),

  -- First Reading
  first_reading_reference text not null,
  first_reading_text text not null,
  first_reading_introduction text,

  -- Responsorial Psalm
  psalm_reference text not null,
  psalm_response text not null,
  psalm_text text not null,

  -- Second Reading (optional - Sundays/Solemnities)
  second_reading_reference text,
  second_reading_text text,
  second_reading_introduction text,

  -- Gospel
  gospel_reference text not null,
  gospel_text text not null,
  gospel_introduction text,

  -- Optional saint info
  saint_name text,
  saint_title text,
  saint_biography text,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

-- ============================================
-- Night Prayer Content
-- ============================================
create table if not exists public.night_prayer (
  id uuid primary key default gen_random_uuid(),
  date date not null unique,

  -- Examen
  examen_opening_prayer text not null,
  examen_prompts text[] not null default '{}',
  examen_act_of_contrition text not null,

  -- Hymn (optional)
  hymn text,

  -- Psalm
  psalm_antiphon text not null,
  psalm_reference text not null,
  psalm_text text not null,

  -- Reading
  reading_reference text not null,
  reading_text text not null,

  -- Responsory
  responsory_versicle text not null,
  responsory_response text not null,

  -- Canticle of Simeon
  canticle_antiphon text not null,
  canticle_text text not null,

  -- Closing
  closing_prayer text not null,

  -- Marian Antiphon
  marian_antiphon_name text not null,
  marian_antiphon_text text not null,

  -- Metadata
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  created_by uuid references auth.users(id)
);

-- ============================================
-- Admin users table (for access control)
-- ============================================
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text default 'editor' check (role in ('editor', 'admin')),
  created_at timestamptz default now()
);

-- ============================================
-- Indexes
-- ============================================
create index if not exists idx_daily_readings_date on public.daily_readings(date);
create index if not exists idx_night_prayer_date on public.night_prayer(date);

-- ============================================
-- RLS Policies
-- ============================================

-- Daily Readings: Public read, admin write
alter table public.daily_readings enable row level security;

create policy "Anyone can read daily readings"
  on public.daily_readings for select
  using (true);

create policy "Admins can insert daily readings"
  on public.daily_readings for insert
  with check (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can update daily readings"
  on public.daily_readings for update
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can delete daily readings"
  on public.daily_readings for delete
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

-- Night Prayer: Public read, admin write
alter table public.night_prayer enable row level security;

create policy "Anyone can read night prayer"
  on public.night_prayer for select
  using (true);

create policy "Admins can insert night prayer"
  on public.night_prayer for insert
  with check (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can update night prayer"
  on public.night_prayer for update
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

create policy "Admins can delete night prayer"
  on public.night_prayer for delete
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

-- Admin Users: Only admins can see/modify
alter table public.admin_users enable row level security;

create policy "Admins can read admin_users"
  on public.admin_users for select
  using (
    exists (select 1 from public.admin_users where user_id = auth.uid())
  );

-- ============================================
-- Updated at trigger
-- ============================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger daily_readings_updated_at
  before update on public.daily_readings
  for each row execute function update_updated_at();

create trigger night_prayer_updated_at
  before update on public.night_prayer
  for each row execute function update_updated_at();
