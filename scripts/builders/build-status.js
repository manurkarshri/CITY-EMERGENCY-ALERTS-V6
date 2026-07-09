import { writeJson, readJson } from "../lib/io.js";
import { nowIso } from "../lib/time.js";

const intelligence = await readJson("data/intelligence.json", { alerts: [], incidents: [] });
const environmental = await readJson("data/environmental-context.json", { riverIntelligence: [], weatherIntelligence: { regions: {} } });

await writeJson("data/build-status.json", { schemaVersion: "6.0.0", build: { version: "6.0.0-dev", milestone: "B2", status: "healthy", buildTime: nowIso(), note: "Environmental Intelligence Layer", alerts: (intelligence.alerts || []).length, incidents: (intelligence.incidents || []).length, weatherRegions: Object.keys(environmental.weatherIntelligence?.regions || {}).length, riverEvents: (environmental.riverIntelligence || []).length } });
