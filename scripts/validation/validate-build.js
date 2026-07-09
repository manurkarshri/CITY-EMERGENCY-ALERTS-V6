import { validateJsonFile } from "./validate-json.js";
import { log } from "../lib/logger.js";
const files = ["data/intelligence.json","data/alerts.json","data/incidents.json","data/weather.json","data/journey-context.json","data/source-health.json","data/build-status.json"];
for (const file of files) { await validateJsonFile(file); log("Valid JSON", { file }); }
log("Milestone A validation complete.");
