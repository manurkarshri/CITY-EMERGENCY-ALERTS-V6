import { validateJsonFile } from "./validate-json.js";
import { validateEvent } from "./validate-events.js";
import { readJson } from "../lib/io.js";
import { log } from "../lib/logger.js";

const files = ["data/intelligence.json","data/alerts.json","data/incidents.json","data/weather.json","data/journey-context.json","data/source-health.json","data/build-status.json"];
for (const file of files) { await validateJsonFile(file); log("Valid JSON", { file }); }

for (const file of ["data/alerts.json", "data/incidents.json"]) {
  const data = await readJson(file, { items: [] });
  for (const event of data.items || []) {
    const errors = validateEvent(event);
    if (errors.length) throw new Error(`${file}: ${event.id || "unknown"}: ${errors.join(", ")}`);
  }
}
log("Milestone B1 validation complete.");
