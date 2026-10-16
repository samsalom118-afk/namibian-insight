# Namibian Insight

A mobile-responsive student news portal built with Next.js App Router, JavaScript, Tailwind CSS and Supabase. It includes national, international, sports, entertainment & lifestyle, and fashion sections, a story reader, light/dark theme, contact form, editor studio and installable PWA shell.

## Deploy quickly

1. Import this public repository into Vercel: https://vercel.com/new
2. Choose **samsalom118-afk/namibian-insight** and click **Deploy**.
3. Add the two environment variables below in Vercel Project Settings → Environment Variables, then redeploy if they are not configured during import.
4. To turn on shared publishing, image storage and editor sign-in, create a free Supabase project and run `supabase-schema.sql` in the SQL Editor.
5. In Supabase Authentication → Users, create an editor account. Keep editor passwords private.

## Environment variables

Copy `.env.example` into `.env.local` for local development and fill in your own Supabase project values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_OR_ANON_KEY
```

The publishable/anon key is intended for browser use when Row Level Security (RLS) is configured. Never put a Supabase service-role key in `NEXT_PUBLIC_*` variables or commit secrets.

## Run locally

Node.js 20.9+ recommended.

```bash
npm install
cp .env.example .env.local
npm run dev
``

Open http://localhost:3000.

## Editorial setup — important for marking

This repo contains **demo drafts and demo images** for layout preview only. Replace them with the exact stories and images used in Question 1 before submitting. Add all group members' full names and student numbers on the homepage. Replace contact details, editorial credits, and placeholder social references with real group information and active official links. Check all image credits and article facts.

The editor studio is at `/admin` (open **Newsroom**). Once Supabase is configured, sign in using a user created in Supabase Authentication to create, edit, publish, delete stories, upload/delete story images and review/delete contact submissions. Without Supabase credentials, edits are stored only in that browser for preview; they are not shared across devices.

## Supabase

- `supabase-schema.sql` creates `stories` and `contact_messages`, enables RLS, and configures the public `story-images` storage bucket and policies.
- Public visitors can read published stories and submit contact messages.
- Authenticated editors can manage stories, images, and reader messages.
- Review policies and invite only trusted editors before sharing the website.

## PWA note

The app includes a web manifest, SVG icon and a basic same-origin service worker. Installability/offline behaviour must be tested on the deployed HTTPS URL. Dynamic story-management actions require a working network and Supabase when cloud mode is enabled.
