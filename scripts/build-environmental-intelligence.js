import { readJson, writeJson } from "./lib/io.js";
import { log } from "./lib/logger.js";
import { buildWeatherIntelligence } from "./environment/weather-intelligence.js";
import { buildRiverIntelligence } from "./environment/river-intelligence.js";
import { buildGeographicIntelligence } from "./environment/geographic-intelligence.js";
import { buildSeasonalIntelligence } from "./environment/seasonal-intelligence.js";
import { buildCriticalInfrastructureIntelligence } from "./environment/critical-infrastructure.js";
import { buildEnvironmentalImpact } from "./environment/environmental-impact.js";
import { buildEmergencyStory } from "./environment/emergency-story-engine.js";

log("Environmental Intelligence build started.");
const intelligence = await readJson("data/intelligence.json", { alerts: [], incidents: [] });
const weather = await readJson("data/weather.json", null) || await readJson("data/weather-sample.json", { regions: {} });
const river = await readJson("data/river-status.json", null) || await readJson("data/river-sample.json", { items: [] });
const activeEvents = [...(intelligence.alerts || []), ...(intelligence.incidents || [])];

const weatherIntelligence = buildWeatherIntelligence(weather);
const riverIntelligence = await buildRiverIntelligence(river);
const geographicIntelligence = await buildGeographicIntelligence();
const seasonalIntelligence = await buildSeasonalIntelligence();
const criticalInfrastructure = await buildCriticalInfrastructureIntelligence(activeEvents);
const environmentalImpact = buildEnvironmentalImpact({ weatherIntelligence, riverIntelligence, activeEvents, seasonalIntelligence });
const story = buildEmergencyStory({ weatherIntelligence, riverIntelligence, environmentalImpact, activeEvents });
const generatedAt = new Date().toISOString();

await writeJson("data/environmental-context.json", { schemaVersion: "6.0.0", generatedAt, weatherIntelligence, riverIntelligence, seasonalIntelligence, geographicIntelligence, criticalInfrastructure, environmentalImpact, story });

intelligence.situation = { ...(intelligence.situation || {}), snapshot: story, weather: weatherIntelligence, environmentalImpact, changes: intelligence.situation?.changes || [] };
intelligence.environmentalContext = { riverIntelligence, seasonalIntelligence, geographicIntelligence, criticalInfrastructure };
await writeJson("data/intelligence.json", intelligence);
log("Environmental Intelligence build completed.", { weatherRegions: Object.keys(weatherIntelligence.regions || {}).length, riverEvents: riverIntelligence.length });
