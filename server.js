const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { URL } = require("node:url");

global.window = {};
require("./phones-data.js");

const root = __dirname;
const port = Number(process.env.PORT || 3000);
const databasePath = path.join(root, "price-database.json");
const staticTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

function readDatabase() {
  if (!fs.existsSync(databasePath)) {
    return { updatedAt: null, offers: {} };
  }

  return JSON.parse(fs.readFileSync(databasePath, "utf8"));
}

function writeDatabase(database) {
  fs.writeFileSync(databasePath, `${JSON.stringify(database, null, 2)}\n`);
}

function offerKey(model, variant, offer) {
  return `${model.id}|${variant.id}|${offer.name}`;
}

function applyLivePrices(models, database = readDatabase()) {
  return models.map((model) => ({
    ...model,
    variants: model.variants.map((variant) => ({
      ...variant,
      offers: variant.offers.map((offer) => {
        const live = database.offers[offerKey(model, variant, offer)];

        if (!live || live.status !== "ok") {
          return offer;
        }

        return {
          ...offer,
          price: live.price ?? offer.price,
          stock: typeof live.stock === "boolean" ? live.stock : offer.stock,
          liveUpdatedAt: live.checkedAt
        };
      })
    }))
  }));
}

function responseJson(response, status, payload) {
  response.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(payload));
}

function normalizePrice(value) {
  if (!value) return null;

  const cleaned = String(value)
    .replace(/\s/g, "")
    .replace(/[^\d,.]/g, "")
    .replace(",", ".");
  const price = Number.parseFloat(cleaned);

  return Number.isFinite(price) ? Math.round(price) : null;
}

function parseJsonLd(html) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];

  for (const [, content] of blocks) {
    try {
      const parsed = JSON.parse(content.trim());
      const nodes = Array.isArray(parsed) ? parsed : [parsed, ...(parsed["@graph"] || [])];

      for (const node of nodes.flat()) {
        const offers = Array.isArray(node.offers) ? node.offers : [node.offers].filter(Boolean);

        for (const offer of offers) {
          const price = normalizePrice(offer.price || offer.lowPrice || offer.highPrice);

          if (price) {
            return {
              price,
              stock: String(offer.availability || "").toLowerCase().includes("instock")
            };
          }
        }
      }
    } catch {
      // Some stores ship invalid JSON-LD; fall back to meta/HTML parsing below.
    }
  }

  return null;
}

function parseFallbackPrice(html) {
  const metaPatterns = [
    /<meta[^>]+property=["']product:price:amount["'][^>]+content=["']([^"']+)["']/i,
    /<meta[^>]+itemprop=["']price["'][^>]+content=["']([^"']+)["']/i,
    /"price"\s*:\s*"?([\d\s.,]+)"?/i
  ];

  for (const pattern of metaPatterns) {
    const match = html.match(pattern);
    const price = normalizePrice(match?.[1]);

    if (price) {
      return {
        price,
        stock: /i lager|instock|in stock/i.test(html)
      };
    }
  }

  return null;
}

async function scrapeOffer(offer) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(offer.url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Prisvy local price checker/1.0 (+local development)",
        Accept: "text/html,application/xhtml+xml"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const parsed = parseJsonLd(html) || parseFallbackPrice(html);

    if (!parsed?.price) {
      throw new Error("Kunde inte hitta pris på sidan");
    }

    return { status: "ok", price: parsed.price, stock: parsed.stock };
  } finally {
    clearTimeout(timeout);
  }
}

async function refreshPrices(limit = Infinity) {
  const database = readDatabase();
  const tasks = [];

  for (const model of window.phoneModels) {
    for (const variant of model.variants) {
      for (const offer of variant.offers) {
        tasks.push({ model, variant, offer });
      }
    }
  }

  const selectedTasks = tasks.slice(0, limit);
  let updated = 0;
  let failed = 0;

  for (const task of selectedTasks) {
    const key = offerKey(task.model, task.variant, task.offer);

    try {
      const live = await scrapeOffer(task.offer);
      database.offers[key] = {
        ...live,
        url: task.offer.url,
        checkedAt: new Date().toISOString()
      };
      updated += 1;
    } catch (error) {
      database.offers[key] = {
        status: "error",
        url: task.offer.url,
        message: error.message,
        checkedAt: new Date().toISOString()
      };
      failed += 1;
    }
  }

  database.updatedAt = new Date().toISOString();
  writeDatabase(database);

  return {
    checked: selectedTasks.length,
    updated,
    failed,
    updatedAt: database.updatedAt
  };
}

function serveStatic(request, response, pathname) {
  const safePath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.normalize(path.join(root, safePath));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": staticTypes[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);

  if (request.method === "GET" && url.pathname === "/api/models") {
    const database = readDatabase();
    responseJson(response, 200, {
      updatedAt: database.updatedAt,
      models: applyLivePrices(window.phoneModels, database)
    });
    return;
  }

  if (request.method === "POST" && url.pathname === "/api/refresh") {
    const limit = Number(url.searchParams.get("limit") || 80);
    const result = await refreshPrices(Number.isFinite(limit) && limit > 0 ? limit : 80);
    responseJson(response, 200, result);
    return;
  }

  serveStatic(request, response, url.pathname);
});

server.listen(port, () => {
  console.log(`Prisvy körs på http://localhost:${port}`);
  console.log("Livepriser sparas i price-database.json");
});
