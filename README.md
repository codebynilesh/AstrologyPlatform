<p align="center"><img src="packages/shared/src/logo.svg" width="72" alt="Chitra star logo" /></p>

<h1 align="center">Chitra</h1>

<p align="center"><strong>Vedic astrology, computed from real starlight.</strong></p>

Chitra is a clean-room TypeScript platform for exploring Vedic astrology with a modern, calm interface. This repository contains a React web app, a Node API, a shared astronomical calculation package, and a single-image Docker deployment.

> **Preview status:** this is an early product build, not a production-ready paid service. Birth-chart calculations and a basic daily panchang endpoint are wired end to end. The Ashtakoota endpoint is intentionally marked incomplete: it returns only Tara and Bhakoot and must not be treated as a complete compatibility assessment. Sunrise-based panchang limbs, complete match scoring, account security, billing, rate limits, and saved-chart authorization are not yet production-ready.

## Run locally

Requirements: Node.js 22 or newer and npm.

```sh
npm install
npm run dev:api
```

In a second terminal:

```sh
npm run dev
```

Open the Vite URL printed by npm. The web dev server proxies `/api` to the local API on port 3000. Set `PORT` and `DATABASE_PATH` as needed; see `.env.example`.

## Build and verify

```sh
npm run typecheck
npm run build
```

Run the single-container deployment:

```sh
docker build -t chitra .
docker run --rm -p 3000:3000 -e JWT_SECRET='use-a-long-random-secret' -v chitra-data:/app/data chitra
```

Then open `http://localhost:3000`. The API and compiled web app are served by the same Node process. API health is available at `/healthz`; the initial OpenAPI document is at `/api/v1/openapi.json`.

## Included capabilities

- Sidereal planetary positions using `astronomy-engine` and a Lahiri/Chitrapaksha ayanamsa approximation.
- Whole-sign house assignment, sign and nakshatra labels, retrograde flags, ascendant and a birth Vimshottari balance preview.
- Daily tithi, nakshatra and yoga-number preview. Sunrise/sunset and location-specific observance boundaries are not yet computed.
- Compatibility preview with explicit partial-result disclosure.
- A small preset-place list for development; it is not a geocoding service.
- SQLite persistence for chart snapshots, without user accounts or access-control yet.
- Responsive Chitra-branded interface, motion, favicon, web manifest and social preview artwork.

## API overview

All request/response bodies are JSON.

- `GET /healthz`
- `GET /api/v1/geo/presets`
- `POST /api/v1/chart` — `{ "name":"Example", "date":"1995-08-15", "time":"07:24", "utcOffsetMinutes":330, "latitude":18.5204, "longitude":73.8567 }`
- `POST /api/v1/panchang` — `{ "date":"2026-10-03", "utcOffsetMinutes":330 }`
- `POST /api/v1/match` — `{ "personA": <birth input>, "personB": <birth input> }`; response is partial and explicitly identified as such.
- `GET /api/v1/charts`, `POST /api/v1/charts` — local development snapshot storage; not a secure user vault.
- `GET /api/v1/openapi.json`

## Product scope

The first product focus is Birth Chart, Match/Ashtakoota, Vimshottari Dasha and Panchang, with selected dosha and yoga checks planned as the calculation and reference data are verified. No astrological statement is medical, legal, financial or other professional advice. Calculations should be independently validated before commercial use.

## Brand

Chitra Astro Technologies · [chitra.app](https://chitra.app)

## License

All rights reserved. See [LICENSE](LICENSE). The astronomical dependency retains its own upstream license and notices.
