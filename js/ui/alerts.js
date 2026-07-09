import { state, filteredEvents } from "../core/state.js";
import { renderEventList } from "./events.js";

export function renderAlerts() {
  const filtered = filteredEvents(state.alerts);
  const items = filtered.length ? filtered : (state.alerts || []);
  const note = filtered.length ? "" : `<p class="small">Showing broader district alerts because no locality-specific alert matched your filter.</p>`;

  document.getElementById("tab-alerts").innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Warnings</div>
      <h2>Alerts</h2>
      <p>Official or high-priority warnings requiring awareness or action.</p>
      ${note}
    </section>
  ` + renderEventList(items, "No active alerts available.");
}
