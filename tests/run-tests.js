import { normalizeText, createStableId } from "../scripts/lib/text.js";
import { haversineKm } from "../scripts/lib/geo.js";
function assert(condition, message) { if (!condition) throw new Error(message); }
assert(normalizeText(" Heavy   Rain! ") === "heavy rain", "normalizeText failed");
assert(createStableId("Heavy Rain Alert").includes("heavy-rain"), "createStableId failed");
assert(haversineKm({lat:18.52, lon:73.85}, {lat:18.52, lon:73.85}) === 0, "haversine zero distance failed");
console.log("Milestone A tests passed.");
