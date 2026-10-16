-- Namibian Insight: run once in Supabase SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.stories (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  category text not null check (category in ('National','International','Sports','Entertainment & Lifestyle','Fashion & Styling')),
  excerpt text not null default '',
  body text not null default '',
  author text not null default 'Insight Desk',
  image_url text,
  image_path text,
  image_credit text,
  featured boolean not null default false,
  published boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
create index if not exists stories_published_category_idx on public.stories (published, category, published_at desc);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  topic text not null default 'Story idea',
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.stories enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Published stories are public" on public.stories;
create policy "Published stories are public" on public.stories for select to anon, authenticated using (published = true);
drop policy if exists "Editors manage stories" on public.stories;
create policy "Editors manage stories" on public.stories for all to authenticated using (true) with check (true);

drop policy if exists "Visitors may submit contact messages" on public.contact_messages;
create policy "Visitors may submit contact messages" on public.contact_messages for insert to anon, authenticated with check (length(name) > 0 and length(email) > 3 and length(message) >= 10);
drop policy if exists "Editors may read contact messages" on public.contact_messages;
create policy "Editors may read contact messages" on public.contact_messages for select to authenticated using (true);
drop policy if exists "Editors may delete contact messages" on public.contact_messages;
create policy "Editors may delete contact messages" on public.contact_messages for delete to authenticated using (true);

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('story-images', 'story-images', true, 10485760, array['image/png','image/jpeg','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 10485760, allowed_mime_types = array['image/png','image/jpeg','image/webp'];

drop policy if exists "Story images are publicly viewable" on storage.objects;
create policy "Story images are publicly viewable" on storage.objects for select to anon, authenticated using (bucket_id = 'story-images');
drop policy if exists "Authenticated editors upload story images" on storage.objects;
create policy "Authenticated editors upload story images" on storage.objects for insert to authenticated with check (bucket_id = 'story-images');
drop policy if exists "Authenticated editors update story images" on storage.objects;
create policy "Authenticated editors update story images" on storage.objects for update to authenticated using (bucket_id = 'story-images') with check (bucket_id = 'story-images');
drop policy if exists "Authenticated editors delete story images" on storage.objects;
create policy "Authenticated editors delete story images" on storage.objects for delete to authenticated using (bucket_id = 'story-images');

grant select on public.stories to anon, authenticated;
grant insert, update, delete on public.stories to authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select, delete on public.contact_messages to authenticated;
