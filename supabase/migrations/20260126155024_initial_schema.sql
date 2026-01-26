-- Sanctus Prayer App - Initial Schema
-- Migration: 20260126155024_initial_schema.sql

-- ============================================
-- 1. PROFILES (extends Supabase Auth users)
-- ============================================
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  avatar_url text,

  -- Preferences
  default_duration smallint default 10 check (default_duration in (5, 10, 15)),
  default_practice text default 'peace' check (default_practice in ('peace', 'joy')),
  notifications_enabled boolean default true,
  haptic_feedback boolean default true,

  -- Timezone for streak calculations
  timezone text default 'America/New_York',

  -- Journey tracking
  journey_start_date date,
  current_journey_day smallint default 1,

  -- Timestamps
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================
-- 2. SESSIONS (prayer practice completions)
-- ============================================
create table sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,

  date date not null,
  duration smallint not null,
  practice text not null check (practice in ('peace', 'joy', 'night')),
  completed_at timestamptz default now(),

  -- For offline sync
  local_id text,
  synced_at timestamptz default now(),

  created_at timestamptz default now()
);

create index sessions_user_date_idx on sessions(user_id, date);
create index sessions_user_practice_idx on sessions(user_id, practice);
create unique index sessions_user_local_id_idx on sessions(user_id, local_id) where local_id is not null;

-- ============================================
-- 3. COMPLETED_READINGS (daily readings marked done)
-- ============================================
create table completed_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,

  reading_id text not null,
  completed_at timestamptz default now(),

  unique(user_id, reading_id)
);

create index completed_readings_user_idx on completed_readings(user_id);

-- ============================================
-- 4. STREAKS (computed/cached streak data)
-- ============================================
create table streaks (
  user_id uuid primary key references profiles(id) on delete cascade,

  current_streak smallint default 0,
  longest_streak smallint default 0,
  last_active_date date,

  total_sessions int default 0,
  total_minutes int default 0,

  updated_at timestamptz default now()
);

-- ============================================
-- 5. DAILY_PROGRESS (40-day journey daily checklist)
-- ============================================
create table daily_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,

  journey_day smallint not null check (journey_day >= 1 and journey_day <= 40),
  date date not null,

  morning_reading boolean default false,
  sacred_center boolean default false,
  divine_rhythm boolean default false,
  night_prayer boolean default false,

  completed_at timestamptz,

  unique(user_id, date)
);

create index daily_progress_user_day_idx on daily_progress(user_id, journey_day);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

alter table profiles enable row level security;
alter table sessions enable row level security;
alter table completed_readings enable row level security;
alter table streaks enable row level security;
alter table daily_progress enable row level security;

-- Profiles policies
create policy "Users can view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on profiles for insert with check (auth.uid() = id);

-- Sessions policies
create policy "Users can view own sessions"
  on sessions for select using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on sessions for insert with check (auth.uid() = user_id);

create policy "Users can delete own sessions"
  on sessions for delete using (auth.uid() = user_id);

-- Completed Readings policies
create policy "Users can view own readings"
  on completed_readings for select using (auth.uid() = user_id);

create policy "Users can insert own readings"
  on completed_readings for insert with check (auth.uid() = user_id);

create policy "Users can delete own readings"
  on completed_readings for delete using (auth.uid() = user_id);

-- Streaks policies
create policy "Users can view own streaks"
  on streaks for select using (auth.uid() = user_id);

create policy "Users can update own streaks"
  on streaks for update using (auth.uid() = user_id);

create policy "Users can insert own streaks"
  on streaks for insert with check (auth.uid() = user_id);

-- Daily Progress policies
create policy "Users can view own progress"
  on daily_progress for select using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on daily_progress for insert with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on daily_progress for update using (auth.uid() = user_id);

-- ============================================
-- TRIGGERS
-- ============================================

-- Function to create profile and streaks when user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email)
  values (new.id, new.email);

  insert into streaks (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Function to update updated_at timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute function update_updated_at();

create trigger streaks_updated_at
  before update on streaks
  for each row execute function update_updated_at();
