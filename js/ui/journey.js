import { state } from "../core/state.js";
import { escapeHtml, escapeAttr } from "../utils/format.js";

let manualJourney = null;

export function renderJourney() {
  const panel = document.getElementById("tab-journey");
  const journeys = state.journey?.journeys || [];
  const best = manualJourney || journeys[0]?.bestRoute;

  panel.innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Route Safety</div>
      <h2>Journey</h2>
      <p>Check route suitability based on current alerts, incidents, weather and environmental intelligence.</p>
      <div class="form-row">
        <input id="journeyStart" placeholder="Start location" value="${escapeHtml(manualJourney?.start || "Kharadi")}" />
        <input id="journeyDestination" placeholder="Destination" value="${escapeHtml(manualJourney?.destination || "Hinjawadi")}" />
        <select id="journeyDeparture"><option>Leave Now</option><option>Choose Time</option></select>
        <button class="primary-btn" id="journeyBtn">Analyse Journey</button>
      </div>
      <p class="small">Current release provides front-end journey assessment using configured intelligence. Live map API routing will come in the live-data phase.</p>
    </section>
    ${best ? renderBestRoute(best) : `<section class="card empty">Journey intelligence has not generated route assessments yet.</section>`}
    ${journeys.map(renderJourneyComparison).join("")}
  `;

  document.getElementById("journeyBtn")?.addEventListener("click", analyseTypedJourney);
}

function analyseTypedJourney() {
  const start = document.getElementById("journeyStart")?.value?.trim() || "Start";
  const destination = document.getElementById("journeyDestination")?.value?.trim() || "Destination";

  const known = findKnownJourney(start, destination);
  if (known?.bestRoute) {
    manualJourney = { ...known.bestRoute, start, destination };
  } else {
    manualJourney = createManualRoute(start, destination);
  }

  renderJourney();
}

function findKnownJourney(start, destination) {
  const s = start.toLowerCase();
  const d = destination.toLowerCase();
  return (state.journey?.journeys || []).find(j =>
    (j.start || "").toLowerCase().includes(s) ||
    (j.destination || "").toLowerCase().includes(d) ||
    s.includes((j.start || "").toLowerCase()) ||
    d.includes((j.destination || "").toLowerCase())
  );
}

function createManualRoute(start, destination) {
  const alerts = (state.alerts || []).length;
  const incidents = (state.incidents || []).length;
  const river = (state.environmental?.riverIntelligence || []).length;
  const penalty = Math.min(35, alerts * 8 + incidents * 6 + river * 5);
  const score = Math.max(45, 100 - penalty);
  const label = score >= 85 ? "Good to Go" : score >= 65 ? "Proceed with Caution" : "Replan if Possible";
  const delay = score >= 85 ? 5 : score >= 65 ? 15 : 30;

  return {
    label: `${start} to ${destination}`,
    start,
    destination,
    journeySuitability: {
      score,
      label,
      recommendation: `${label}. Assessment based on current alerts, incidents and environmental intelligence.`
    },
    estimatedTimeMin: null,
    estimatedDelayMin: delay,
    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(start + " to " + destination)}`,
    explanation: `${start} to ${destination}: Journey suitability is ${label} (${score}/100). Estimated delay may be around ${delay} minutes. Open in Maps to review live traffic route options.`
  };
}

function renderBestRoute(route) {
  return `
    <section class="card route-card recommended">
      <div class="section-kicker">Recommended</div>
      <h2>Best Route</h2>
      <h3>${escapeHtml(route.label)}</h3>
      <div class="grid">
        <div class="metric"><strong>${route.journeySuitability?.score ?? "--"}/100</strong><span>Journey Suitability</span></div>
        <div class="metric"><strong>${escapeHtml(route.journeySuitability?.label || "Unknown")}</strong><span>Recommendation</span></div>
        <div class="metric"><strong>${route.estimatedTimeMin ?? "Maps"} ${route.estimatedTimeMin ? "min" : ""}</strong><span>Estimated Time</span></div>
        <div class="metric"><strong>${route.estimatedDelayMin ?? "--"} min</strong><span>Estimated Delay</span></div>
      </div>
      <p>${escapeHtml(route.explanation || route.journeySuitability?.recommendation || "")}</p>
      <a class="primary-btn" href="${escapeAttr(route.googleMapsUrl || "#")}" target="_blank" rel="noopener" style="display:inline-block;text-decoration:none">Open in Google Maps</a>
    </section>
  `;
}

function renderJourneyComparison(journey) {
  return `
    <section class="card">
      <h2>${escapeHtml(journey.start)} → ${escapeHtml(journey.destination)}</h2>
      <details>
        <summary>Compare routes</summary>
        ${(journey.routes || []).map(route => `
          <div class="metric" style="margin-top:8px">
            <strong>${escapeHtml(route.label)}</strong>
            <span>${route.journeySuitability?.score ?? "--"}/100 · ${escapeHtml(route.journeySuitability?.label || "")} · ${route.estimatedTimeMin ?? "--"} min</span>
          </div>
        `).join("")}
      </details>
    </section>
  `;
}
