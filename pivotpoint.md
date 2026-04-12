# Counseling Therapy Website

## Pivot Point Page

The `pivotpoint/` directory contains **built output only** — there is no source code here.

- **Source repo:** `/Users/nickmichael/Documents/GitHub/pivot-point-stories`
- **Framework:** React + Vite + Tailwind (built with `npm run build`)
- **Vite base path:** `/pivotpoint/` (set in `vite.config.ts`)
- **Main page component:** `src/pages/Index.tsx` in the source repo
- **Static images:** `pivotpoint/lovable-uploads/` — these are NOT part of the Vite build and persist across deploys

### Build & Deploy

Edit source in `pivot-point-stories`, then run:

```sh
./scripts/deploy-pivotpoint.sh
```

Or manually:

```sh
cd /Users/nickmichael/Documents/GitHub/pivot-point-stories
npm run build
rm -rf /Users/nickmichael/Documents/GitHub/counselingtherapy/pivotpoint/assets
cp -r dist/* /Users/nickmichael/Documents/GitHub/counselingtherapy/pivotpoint/
```

Then commit and push this repo.
