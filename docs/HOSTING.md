# Hosting Shop Reference

## Public demo on jeffavery.com

Extract `ShopReference-static-demo.zip` into the `shop-reference` directory of your public website. The archive contents belong directly inside that directory, so `index.html` is at:

`https://jeffavery.com/shop-reference/`

Retain the `assets`, `data` and `lib` folders and all JavaScript/CSS files. All paths are relative, so the site works in a subdirectory without rebuilding. Use the trailing slash on the demo URL. Serve `.js` as JavaScript, `.json` as JSON and `.png` as PNG; ordinary static hosting does this automatically. No PHP, database, API keys, Node runtime or writable server storage is needed.

This is the full working calculator site, not a mockup. Visitor inputs stay in the browser. Source links are optional outbound reading links. There is no server-side save or administration endpoint.

## ShopDocker

Project folder: `/opt/docker/shop-reference`.

```sh
docker compose -f compose.shopdocker.yaml up -d --build
```

The service joins the existing external `proxy` network and exposes port 80 to that network, with no host port. In Caddy Manager, use upstream `http://shop-reference:80` for the chosen hostname. The generic `compose.yaml` remains available for other hosts using loopback port 8088.

The host's documented nightly backup includes `/opt/docker` recursively. No persistent application data is required; the repository and static files reconstruct the site.

## Updating or rolling back

Pull the desired Git revision, then rerun the Compose command. To roll back, check out the previous known-good commit and rebuild. This new service does not replace existing services or upstreams.
