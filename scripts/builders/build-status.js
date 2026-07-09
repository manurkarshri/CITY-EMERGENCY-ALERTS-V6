import { writeJson, readJson } from "../lib/io.js";
import { nowIso } from "../lib/time.js";

const intelligence = await readJson("data/intelligence.json", { alerts: [], incidents: [] });
const environmental = await readJson("data/environmental-context.json", { riverIntelligence: [], weatherIntelligence: { regions: {} } });
const journey = await readJson("data/journey-intelligence.json", { journeys: [] });

await writeJson("data/build-status.json", {
  schemaVersion: "6.0.0",
  build: {
    version: "6.0.0-production-stabilization",
    milestone: "Production Stabilization Update 1",
    status: "healthy",
    buildTime: nowIso(),
    note: "Production-stabilized app shell with decision, environmental and journey intelligence",
    alerts: (intelligence.alerts || []).length,
    incidents: (intelligence.incidents || []).length,
    weatherRegions: Object.keys(environmental.weatherIntelligence?.regions || {}).length,
    riverEvents: (environmental.riverIntelligence || []).length,
    journeys: (journey.journeys || []).length
  }
});
