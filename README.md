# Shop Reference

A local machining and fabrication reference with original design, graphics and code. All 11 requested functions are implemented across Keys & Keyways, Threads & Tap Drills, Counterbores, Bolt/Material Strength, and Gears.

Results update immediately when inputs change. No Calculate buttons, package installation, build process, CDN, external fonts, analytics, or online data requests are required.

## Run locally

From this folder with Node.js 20 or newer:

```sh
node scripts/serve.mjs
```

Open http://127.0.0.1:4173. Stop with Ctrl+C. Serve the site over HTTP rather than opening index.html directly; modules and JSON use local HTTP requests. Any static web server can serve `dist/`.

## Structure

- `dist/index.html`, `dist/styles.css`: shared interface, navigation, styles and key diagrams.
- `dist/app.js`, `dist/depths.js`: key sizing and depth interfaces.
- `dist/reference.js`: thread, counterbore, strength and gear interfaces.
- `dist/lib/`: pure lookup, formatting and selection helpers.
- `dist/data/`: published datasets, including source URL and retrieval date.
- `docs/`: source review, corrections, validation and release notes.
- `docs/research/`: original factual research staging; not production data.
- `tests/`: engineering-data, input and lookup checks.
- `scripts/serve.mjs`: local static server.
- `Dockerfile`, `compose.yaml`: prepared static nginx deployment.

The data is editable independently of the UI. Preserve units and range boundaries. Use null for unavailable values, document corrections, and verify new data before release. Do not copy source prose, artwork, markup or executable code into the project.

## Test

```sh
node --test
```

See `docs/RELEASE-NOTES.md` for coverage, corrections, known unavailable values and review routes. Automated checks have passed. The newly added sections are ready for our browser review; full standards certification is not claimed.

## GitHub / ShopDocker preparation

This folder is the intended repository root. No remote repository or deployment has been created. When ready, push this folder to GitHub. A future GitHub Pages workflow can publish `dist/`.

On ShopDocker, clone the repository and run:

```sh
docker compose up -d --build
```

The included sample binds host loopback port 8088. A host reverse proxy can target `http://127.0.0.1:8088`. If the proxy runs in a container, adapt to its existing Docker network and target service port 80. Confirm host ports, network, hostname and TLS before deployment. Container startup has not been tested on ShopDocker. Pin the nginx image to a reviewed digest when deploying.

## Review status

All 11 pages are ready for local review. Source omissions and questionable values are explicitly labelled rather than guessed. Next: review each page together, then configure GitHub and ShopDocker.
