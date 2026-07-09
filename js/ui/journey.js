import { state } from "../core/state.js";
import { escapeHtml, escapeAttr } from "../utils/format.js";

export function renderJourney() {
  const panel = document.getElementById("tab-journey");
  const journeys = state.journey?.journeys || [];
  const best = journeys[0]?.bestRoute;

  panel.innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Route Safety</div>
      <h2>Journey</h2>
      <p>Check route suitability based on current alerts, incidents, weather and environmental intelligence.</p>
      <div class="form-row">
        <input placeholder="Start location" value="Kharadi" />
        <input placeholder="Destination" value="Hinjawadi" />
        <select><option>Leave Now</option><option>Choose Time</option></select>
        <button class="primary-btn" id="journeyBtn">Analyse Journey</button>
      </div>
      <p class="small">RC2.1 displays generated route intelligence. Live typed route analysis will be hardened after audit.</p>
    </section>
    ${best ? renderBestRoute(best) : `<section class="card empty">Journey intelligence has not generated route assessments yet.</section>`}
    ${journeys.map(renderJourneyComparison).join("")}
  `;

  document.getElementById("journeyBtn")?.addEventListener("click", () => {
    alert("Journey engine is installed. Current RC2.1 displays generated route assessments from configured journey requests.");
  });
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
        <div class="metric"><strong>${route.estimatedTimeMin ?? "--"} min</strong><span>Estimated Time</span></div>
        <div class="metric"><strong>${route.estimatedDelayMin ?? "--"} min</strong><span>Delay</span></div>
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
