import { loadJson } from "../services/api.js";

export const state = {
  selected: {
    region: localStorage.getItem("cea.region") || "pune_district",
    taluka: localStorage.getItem("cea.taluka") || "pune_city",
    locality: localStorage.getItem("cea.locality") || ""
  },
  intelligence: {},
  alerts: [],
  incidents: [],
  environmental: {},
  journey: { journeys: [] },
  build: {},
  regions: {},
  talukas: {}
};

const FILES = {
  intelligence: "data/intelligence.json",
  alerts: "data/alerts.json",
  incidents: "data/incidents.json",
  environmental: "data/environmental-context.json",
  journey: "data/journey-intelligence.json",
  build: "data/build-status.json",
  regions: "config/regions.config.json",
  talukas: "config/talukas.config.json"
};

export async function loadAllData() {
  const [intelligence, alertsData, incidentsData, environmental, journey, build, regions, talukas] = await Promise.all([
    loadJson(FILES.intelligence, {}),
    loadJson(FILES.alerts, { items: [] }),
    loadJson(FILES.incidents, { items: [] }),
    loadJson(FILES.environmental, {}),
    loadJson(FILES.journey, { journeys: [] }),
    loadJson(FILES.build, {}),
    loadJson(FILES.regions, {}),
    loadJson(FILES.talukas, {})
  ]);

  state.intelligence = intelligence;
  state.alerts = alertsData.items || intelligence.alerts || [];
  state.incidents = incidentsData.items || intelligence.incidents || [];
  state.environmental = environmental;
  state.journey = journey;
  state.build = build;
  state.regions = regions;
  state.talukas = talukas;
}

export function filteredEvents(items) {
  const { taluka, locality } = state.selected;
  return (items || []).filter(item => {
    const talukaMatch = !taluka || (item.talukas || []).includes(taluka) || !(item.talukas || []).length;
    const localityMatch = !locality || (item.localities || []).includes(locality) || !(item.localities || []).length;
    return talukaMatch && localityMatch;
  });
}
