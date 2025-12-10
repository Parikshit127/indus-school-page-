# Deployment & Usage Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Locally**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Lead Management (Backend)

The project uses a lightweight file-based database for demonstration.
- **Endpoint**: `POST /api/leads`
- **Data File**: `leads.json` (Created in the project root upon first submission)

### How to Test Submissions
1. Open the website.
2. Fill out the form only the Hero section or Footer.
3. Click "Submit Inquiry".
4. Check `leads.json` in your project folder to see the saved data.

## Deployment

### Vercel (Recommended)
1. Push this code to GitHub/GitLab.
2. Import project into Vercel.
3. Vercel will auto-detect Next.js.
4. **Deploy**.

> **Note on File System in Serverless**: On Vercel (Serverless), `leads.json` will not persist permanently across redeploys because the file system is ephemeral. For production, uncomment the MongoDB instructions in `lib/db.ts` or connect a real database (Supabase/Postgres).

## Project Structure
- `app/`: Next.js App Router pages & API.
- `components/`: UI building blocks.
- `lib/`: Utilities and Database logic.
- `globals.css`: "Royal" theme configuration (Colors/Fonts).
