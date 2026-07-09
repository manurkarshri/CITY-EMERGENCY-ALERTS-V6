import { writeJson, readJson } from "../lib/io.js";
import { nowIso } from "../lib/time.js";

const intelligence = await readJson("data/intelligence.json", { alerts: [], incidents: [] });
await writeJson("data/build-status.json", {
  schemaVersion: "6.0.0",
  build: {
    version: "6.0.0-dev",
    milestone: "B1",
    status: "healthy",
    buildTime: nowIso(),
    note: "Intelligence Core Foundation",
    alerts: (intelligence.alerts || []).length,
    incidents: (intelligence.incidents || []).length
  }
});
