import { engineRegistry } from "./engine-registry.js";
import { log } from "../lib/logger.js";
export async function runDecisionIntelligencePipeline(context = {}) { log("Decision Intelligence Engine framework started.", { engines: engineRegistry.length }); return { status: "framework-ready", context, engines: engineRegistry }; }
