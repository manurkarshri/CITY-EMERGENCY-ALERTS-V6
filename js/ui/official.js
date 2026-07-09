export function renderOfficial() {
  const groups = [
    ["Weather", [["IMD", "https://mausam.imd.gov.in/"], ["India Meteorological Department", "https://imd.gov.in/"]]],
    ["Civic", [["PMC", "https://www.pmc.gov.in/"], ["PCMC", "https://www.pcmcindia.gov.in/"]]],
    ["Public Safety", [["Pune Police", "https://punepolice.gov.in/"], ["Maharashtra Government", "https://maharashtra.gov.in/"]]],
    ["Transport", [["Pune Metro", "https://www.punemetrorail.org/"], ["NHAI", "https://nhai.gov.in/"]]],
    ["Trusted News", [["Sakal", "https://www.esakal.com/"], ["Lokmat", "https://www.lokmat.com/"], ["Loksatta", "https://www.loksatta.com/"], ["Maharashtra Times", "https://maharashtratimes.com/"], ["Indian Express Pune", "https://indianexpress.com/section/cities/pune/"], ["ABP Majha", "https://marathi.abplive.com/"], ["TV9 Marathi", "https://www.tv9marathi.com/"], ["Zee 24 Taas", "https://zeenews.india.com/marathi"]]]
  ];

  document.getElementById("tab-official").innerHTML = `
    <section class="card feature">
      <div class="section-kicker">Verification</div>
      <h2>Official</h2>
      <p>Use this tab to verify information from official and trusted sources.</p>
    </section>
  ` + groups.map(([title, links]) => `
    <section class="card">
      <details open>
        <summary>${title}</summary>
        ${links.map(([name, url]) => `<p><a href="${url}" target="_blank" rel="noopener">${name}</a></p>`).join("")}
      </details>
    </section>
  `).join("");
}
