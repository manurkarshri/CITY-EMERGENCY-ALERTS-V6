import { state, filteredEvents } from "../core/state.js";
import { renderEventList } from "./events.js";

export function renderAlerts() {
  document.getElementById("tab-alerts").innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Warnings</div>
      <h2>Alerts</h2>
      <p>Official or high-priority warnings requiring awareness or action.</p>
    </section>
  ` + renderEventList(filteredEvents(state.alerts), "No active alerts for the selected area.");
}
