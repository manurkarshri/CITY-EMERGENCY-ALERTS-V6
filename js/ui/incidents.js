import { state, filteredEvents } from "../core/state.js";
import { renderEventList } from "./events.js";

export function renderIncidents() {
  document.getElementById("tab-incidents").innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Disruptions</div>
      <h2>Incidents</h2>
      <p>Ongoing disruptions that may affect citizens, services or travel.</p>
    </section>
  ` + renderEventList(filteredEvents(state.incidents), "No active incidents for the selected area.");
}
