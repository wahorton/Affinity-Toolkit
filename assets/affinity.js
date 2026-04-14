<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tax Due Date Diary — Affinity</title>
<link rel="stylesheet" href="../assets/affinity.css">
<style>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  align-items: center;
}
.filter-btn {
  padding: 5px 14px;
  border-radius: 99px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: all 0.15s;
  letter-spacing: 0.04em;
}
.filter-btn:hover { border-color: var(--blue-bright); color: var(--blue-light); }
.filter-btn.active {
  background: var(--blue-bright);
  border-color: var(--blue-bright);
  color: white;
}
.filter-btn.cat-bas.active    { background: #3b82f6; border-color: #3b82f6; }
.filter-btn.cat-super.active  { background: #8b5cf6; border-color: #8b5cf6; }
.filter-btn.cat-tax.active    { background: #10b981; border-color: #10b981; }
.filter-btn.cat-fbt.active    { background: #f59e0b; border-color: #f59e0b; }
.filter-btn.cat-workcover.active { background: #ef4444; border-color: #ef4444; }
.filter-btn.cat-other.active  { background: #6b7280; border-color: #6b7280; }

.search-wrap {
  margin-left: auto;
  position: relative;
}
.search-wrap input {
  width: 220px;
  padding-left: 32px;
  font-size: 0.8rem;
}
.search-wrap::before {
  content: '🔍';
  position: absolute;
  left: 10px; top: 50%;
  transform: translateY(-50%);
  font-size: 0.75rem;
  pointer-events: none;
  z-index: 1;
}

.view-toggle {
  display: flex;
  gap: 2px;
  margin-left: 8px;
}
.view-btn {
  padding: 5px 10px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  font-family: var(--font-sans);
  transition: all 0.15s;
}
.view-btn:first-child { border-radius: 6px 0 0 6px; }
.view-btn:last-child  { border-radius: 0 6px 6px 0; border-left: none; }
.view-btn.active { background: var(--blue-bright); border-color: var(--blue-bright); color: white; }

/* Month view */
.month-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.month-card { background: var(--navy-light); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; }
.month-header {
  padding: 12px 16px;
  background: var(--navy-mid);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.month-name { font-size: 0.85rem; font-weight: 700; color: var(--white); }
.month-count { font-size: 0.7rem; color: var(--text-muted); }
.month-items { padding: 8px; }

/* Deadline item */
.dl-item {
  display: flex;
  gap: 10px;
  padding: 8px 8px;
  border-radius: var(--radius-sm);
  margin-bottom: 4px;
  border-left: 3px solid transparent;
  transition: background 0.12s;
  cursor: default;
}
.dl-item:hover { background: rgba(74,127,193,0.06); }
.dl-item.today { background: rgba(74,127,193,0.12); }
.dl-item.past  { opacity: 0.45; }
.dl-item.upcoming { border-left-color: var(--warning); }

.dl-date {
  min-width: 36px;
  text-align: center;
}
.dl-date-day {
  font-size: 1rem;
  font-weight: 700;
  color: var(--white);
  font-family: var(--font-mono);
  line-height: 1;
}
.dl-date-month {
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.dl-content { flex: 1; }
.dl-title { font-size: 0.8rem; font-weight: 600; color: var(--text-primary); line-height: 1.3; }
.dl-sub   { font-size: 0.71rem; color: var(--text-muted); margin-top: 2px; line-height: 1.3; }
.dl-cat   {
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  border-radius: 99px;
  font-size: 0.62rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 3px;
}

/* Category colours */
.cat-bas      { color: #93c5fd; background: rgba(59,130,246,0.15); }
.cat-super    { color: #c4b5fd; background: rgba(139,92,246,0.15); }
.cat-tax      { color: #6ee7b7; background: rgba(16,185,129,0.15); }
.cat-fbt      { color: #fde68a; background: rgba(245,158,11,0.15); }
.cat-workcover { color: #fca5a5; background: rgba(239,68,68,0.15); }
.cat-other    { color: #d1d5db; background: rgba(107,114,128,0.15); }

/* List view */
.list-view { display: none; }
.list-view.active { display: block; }
.month-view { display: block; }
.month-view.hidden { display: none; }

.today-banner {
  background: linear-gradient(135deg, rgba(74,127,193,0.15), rgba(107,114,184,0.15));
  border: 1px solid rgba(74,127,193,0.3);
  border-radius: var(--radius);
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.today-banner .icon { font-size: 1.2rem; }
.today-banner strong { color: var(--white); font-size: 0.85rem; }
.today-banner span { font-size: 0.8rem; color: var(--text-muted); }

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}
.legend-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.74rem;
  color: var(--text-muted);
}
.legend-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Upcoming panel */
.upcoming-panel {
  background: var(--navy-light);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
  margin-bottom: 20px;
}
.upcoming-title {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.upcoming-items { display: flex; flex-direction: column; gap: 6px; }
.upcoming-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--radius-sm);
  background: rgba(0,0,0,0.2);
}
.upcoming-days {
  min-width: 48px;
  text-align: center;
}
.upcoming-days-num {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: var(--font-mono);
  color: var(--warning);
  line-height: 1;
}
.upcoming-days-label {
  font-size: 0.6rem;
  color: var(--text-muted);
  text-transform: uppercase;
}
.upcoming-item-text { flex: 1; }
.upcoming-item-title { font-size: 0.8rem; font-weight: 600; color: var(--white); }
.upcoming-item-date  { font-size: 0.72rem; color: var(--text-muted); }
</style>
</head>
<body>
<script src="../assets/sidebar.js"></script>
<script>injectSidebar('due-dates.html');</script>

<div class="layout">
  <div class="main">
    <div class="page-header">
      <div class="page-header-icon">📅</div>
      <div class="page-header-text">
        <h1>Tax Due Date Diary</h1>
        <p>BAS, super, income tax, FBT, WorkCover and key compliance dates for 2025–26</p>
      </div>
      <div style="margin-left:auto">
        <button class="btn btn-secondary btn-sm" onclick="window.print()">🖨 Print / PDF</button>
      </div>
    </div>

    <div class="page-body">

      <!-- Today banner -->
      <div class="today-banner">
        <div class="icon">📆</div>
        <div>
          <strong>Today: <span id="todayStr"></span></strong><br>
          <span id="nextUpStr">Loading upcoming deadlines...</span>
        </div>
      </div>

      <!-- Upcoming deadlines (next 30 days) -->
      <div class="upcoming-panel" id="upcomingPanel">
        <div class="upcoming-title">⏰ Upcoming — Next 30 Days</div>
        <div class="upcoming-items" id="upcomingItems"></div>
      </div>

      <!-- Filters -->
      <div class="filters">
        <button class="filter-btn active" data-cat="all">All</button>
        <button class="filter-btn cat-bas" data-cat="bas">BAS / Activity Statements</button>
        <button class="filter-btn cat-super" data-cat="super">Superannuation</button>
        <button class="filter-btn cat-tax" data-cat="tax">Income Tax Returns</button>
        <button class="filter-btn cat-fbt" data-cat="fbt">FBT</button>
        <button class="filter-btn cat-workcover" data-cat="workcover">WorkCover</button>
        <button class="filter-btn cat-other" data-cat="other">Other</button>
        <div class="search-wrap">
          <input type="text" id="searchInput" placeholder="Search dates...">
        </div>
        <div class="view-toggle">
          <button class="view-btn active" id="btnMonthView" onclick="setView('month')">⊞ Month</button>
          <button class="view-btn" id="btnListView" onclick="setView('list')">≡ List</button>
        </div>
      </div>

      <!-- Legend -->
      <div class="legend">
        <div class="legend-item"><div class="legend-dot" style="background:#3b82f6"></div>BAS</div>
        <div class="legend-item"><div class="legend-dot" style="background:#8b5cf6"></div>Super</div>
        <div class="legend-item"><div class="legend-dot" style="background:#10b981"></div>Tax Returns</div>
        <div class="legend-item"><div class="legend-dot" style="background:#f59e0b"></div>FBT</div>
        <div class="legend-item"><div class="legend-dot" style="background:#ef4444"></div>WorkCover</div>
        <div class="legend-item"><div class="legend-dot" style="background:#6b7280"></div>Other</div>
        <div class="legend-item" style="margin-left:auto"><div class="legend-dot" style="background:var(--warning);border-radius:0;width:10px;height:3px;margin-top:2px"></div>Due within 14 days</div>
      </div>

      <!-- Month view -->
      <div class="month-view" id="monthView">
        <div class="month-grid" id="monthGrid"></div>
        <div class="no-results" id="noResults" style="display:none">No dates match your filters.</div>
      </div>

      <!-- List view -->
      <div class="list-view" id="listView">
        <div class="card">
          <table class="data-table" id="listTable">
            <thead>
              <tr>
                <th>Date</th>
                <th>Obligation</th>
                <th>Category</th>
                <th>Notes</th>
                <th>Agent Date</th>
              </tr>
            </thead>
            <tbody id="listBody"></tbody>
          </table>
        </div>
      </div>

      <div class="disclaimer">
        <strong>Disclaimer:</strong> Due dates shown are sourced from the ATO Registered Agent Lodgment Program 2025–26 and WorkSafe Victoria. Tax agent dates apply where a registered agent is engaged and the client has a good lodgement history. If a due date falls on a weekend or public holiday, it moves to the next business day — verify with the ATO. WorkCover dates are for Victoria only. Always confirm dates with source authorities before advising clients.
      </div>

    </div>
  </div>
</div>

<script src="../assets/affinity.js"></script>
<script>
// ── ALL DUE DATES DATA
const DEADLINES = [

  // ══ BAS — MONTHLY
  { date:'2025-07-21', title:'Monthly BAS — June 2025',        cat:'bas', sub:'Lodge and pay June 2025 monthly BAS', agentDate:'', notes:'21st rule — no agent extension for monthly' },
  { date:'2025-08-21', title:'Monthly BAS — July 2025',        cat:'bas', sub:'Lodge and pay July 2025 monthly BAS', agentDate:'', notes:'No agent extension for monthly BAS' },
  { date:'2025-09-22', title:'Monthly BAS — August 2025',      cat:'bas', sub:'Lodge and pay August 2025 monthly BAS', agentDate:'', notes:'' },
  { date:'2025-10-21', title:'Monthly BAS — September 2025',   cat:'bas', sub:'Lodge and pay September 2025 monthly BAS', agentDate:'', notes:'' },
  { date:'2025-11-21', title:'Monthly BAS — October 2025',     cat:'bas', sub:'Lodge and pay October 2025 monthly BAS', agentDate:'', notes:'' },
  { date:'2025-12-22', title:'Monthly BAS — November 2025',    cat:'bas', sub:'Lodge and pay November 2025 monthly BAS', agentDate:'', notes:'' },
  { date:'2026-01-21', title:'Monthly BAS — December 2025',    cat:'bas', sub:'<$10M turnover monthly GST reporters (electronic)', agentDate:'2026-02-21', notes:'Dec BAS: small GST reporters due 21 Feb' },
  { date:'2026-02-21', title:'Monthly BAS — January 2026',     cat:'bas', sub:'Lodge and pay January 2026 monthly BAS', agentDate:'', notes:'' },
  { date:'2026-03-21', title:'Monthly BAS — February 2026',    cat:'bas', sub:'Lodge and pay February 2026 monthly BAS', agentDate:'', notes:'' },
  { date:'2026-04-21', title:'Monthly BAS — March 2026',       cat:'bas', sub:'Lodge and pay March 2026 monthly BAS', agentDate:'', notes:'' },
  { date:'2026-05-21', title:'Monthly BAS — April 2026',       cat:'bas', sub:'Lodge and pay April 2026 monthly BAS', agentDate:'', notes:'' },
  { date:'2026-06-21', title:'Monthly BAS — May 2026',         cat:'bas', sub:'Lodge and pay May 2026 monthly BAS', agentDate:'', notes:'' },

  // ══ BAS — QUARTERLY
  { date:'2025-10-28', title:'Q1 BAS — Jul–Sep 2025',          cat:'bas', sub:'Lodge and pay Quarter 1 activity statement', agentDate:'2025-11-25', notes:'Agent date: 25 Nov 2025 (electronic)' },
  { date:'2026-02-28', title:'Q2 BAS — Oct–Dec 2025',          cat:'bas', sub:'Lodge and pay Quarter 2 activity statement', agentDate:'', notes:'No agent extension for Q2 — already extended to Feb' },
  { date:'2026-04-28', title:'Q3 BAS — Jan–Mar 2026',          cat:'bas', sub:'Lodge and pay Quarter 3 activity statement', agentDate:'2026-05-26', notes:'Agent date: 26 May 2026 (electronic)' },
  { date:'2026-07-28', title:'Q4 BAS — Apr–Jun 2026',          cat:'bas', sub:'Lodge and pay Quarter 4 activity statement', agentDate:'2026-08-25', notes:'Agent date: 25 Aug 2026 (electronic)' },

  // ══ PAYG INSTALMENT NOTICES
  { date:'2025-10-21', title:'PAYG Instalment Notice — Q1',    cat:'bas', sub:'Form N due (consolidated group head companies)', agentDate:'', notes:'Pay only; lodge if varying the instalment' },
  { date:'2026-01-21', title:'PAYG Instalment Notice — Q2',    cat:'bas', sub:'Q2 PAYG instalment activity statement — consolidated groups', agentDate:'', notes:'' },
  { date:'2026-02-28', title:'PAYG Instalment Notice — Q2 (R/S/T)', cat:'bas', sub:'Pay Q2 instalment; lodge only if varying', agentDate:'', notes:'' },

  // ══ SUPER GUARANTEE
  { date:'2025-07-28', title:'Super Guarantee — Q4 2024–25',   cat:'super', sub:'SG contributions must reach fund by this date', agentDate:'', notes:'Miss this → SGC statement + charge due 28 Aug' },
  { date:'2025-10-28', title:'Super Guarantee — Q1 2025–26',   cat:'super', sub:'SG contributions (Jul–Sep 2025) to reach fund by 28 Oct', agentDate:'', notes:'Miss this → SGC statement + charge due 28 Nov. SG rate: 12%' },
  { date:'2026-01-28', title:'Super Guarantee — Q2 2025–26',   cat:'super', sub:'SG contributions (Oct–Dec 2025) to reach fund by 28 Jan', agentDate:'', notes:'Miss this → SGC statement + charge due 28 Feb' },
  { date:'2026-04-28', title:'Super Guarantee — Q3 2025–26',   cat:'super', sub:'SG contributions (Jan–Mar 2026) to reach fund by 28 Apr', agentDate:'', notes:'Miss this → SGC statement + charge due 28 May' },
  { date:'2026-07-28', title:'Super Guarantee — Q4 2025–26',   cat:'super', sub:'SG contributions (Apr–Jun 2026) to reach fund by 28 Jul', agentDate:'', notes:'FINAL quarter before Payday Super. Miss this → SGC due 28 Aug' },

  // ══ SGC STATEMENTS (if late)
  { date:'2025-08-28', title:'SGC Statement — Q4 2024–25',     cat:'super', sub:'Lodge SGC statement if Q4 SG was missed or short', agentDate:'', notes:'SGC is NOT tax deductible' },
  { date:'2025-11-28', title:'SGC Statement — Q1 2025–26',     cat:'super', sub:'Lodge SGC statement if Q1 SG was missed or short', agentDate:'', notes:'' },
  { date:'2026-02-28', title:'SGC Statement — Q2 2025–26',     cat:'super', sub:'Lodge SGC statement if Q2 SG was missed or short', agentDate:'', notes:'' },
  { date:'2026-05-28', title:'SGC Statement — Q3 2025–26',     cat:'super', sub:'Lodge SGC statement if Q3 SG was missed or short', agentDate:'', notes:'' },
  { date:'2026-08-28', title:'SGC Statement — Q4 2025–26',     cat:'super', sub:'Lodge SGC statement if Q4 SG was missed or short', agentDate:'', notes:'' },

  // ══ PAYDAY SUPER NOTE
  { date:'2026-07-01', title:'⚡ Payday Super Commences',       cat:'super', sub:'Super must now be paid with each payroll run', agentDate:'', notes:'From 1 July 2026: SG due within 7 days of each payday. Quarterly system ends.' },

  // ══ INCOME TAX RETURNS
  { date:'2025-10-31', title:'Income Tax Returns — Self-Lodgers', cat:'tax', sub:'Individuals, companies, trusts — self-lodging', agentDate:'', notes:'Also: clients with any outstanding prior year returns' },
  { date:'2025-10-31', title:'SMSF Annual Return — Self-Preparing', cat:'tax', sub:'SMSFs not using a tax agent', agentDate:'2026-02-28', notes:'Tax agent clients: 28 Feb 2026' },
  { date:'2026-01-31', title:'Income Tax — Large/Medium Entities', cat:'tax', sub:'Taxable entities with revenue >$10M', agentDate:'', notes:'Payment for companies/super funds due 1 Dec 2025' },
  { date:'2026-02-28', title:'Income Tax — Companies (Small/Med)', cat:'tax', sub:'Non-taxable large/medium entities; new registrant L/M', agentDate:'', notes:'SMSF annual returns (agent clients) also due' },
  { date:'2026-03-31', title:'Income Tax — Individuals & Trusts (≥$20k)', cat:'tax', sub:'Prior year tax ≥$20,000 (excl. large/medium)', agentDate:'', notes:'Tax agent clients whose latest return had tax ≥$20k' },
  { date:'2026-05-15', title:'Income Tax — All Remaining Entities', cat:'tax', sub:'Individuals, trusts — final due date via tax agent', agentDate:'2026-06-05', notes:'5 June concession available (payment also due by 5 June)' },

  // ══ FBT
  { date:'2026-03-31', title:'FBT Year End',                    cat:'fbt',  sub:'FBT year 1 Apr 2025 – 31 Mar 2026 closes', agentDate:'', notes:'Ensure logbooks and records are complete' },
  { date:'2026-05-21', title:'Add Clients to FBT Agent List',   cat:'fbt',  sub:'Final date to add FBT clients for agent concession', agentDate:'', notes:'Must be done by 21 May to receive extended lodgment date' },
  { date:'2026-05-21', title:'FBT Return — Paper Lodgement',    cat:'fbt',  sub:'Lodge and pay FBT annual return if lodging by paper', agentDate:'2026-06-25', notes:'Electronic via agent: 25 June 2026' },
  { date:'2026-06-25', title:'FBT Return — Agent (Electronic)', cat:'fbt',  sub:'Lodge and pay FBT annual return via tax agent', agentDate:'', notes:'Must be on FBT client list by 21 May' },

  // ══ TPAR & OTHER ATO REPORTS
  { date:'2025-07-31', title:'TFN Report — Closely Held Trusts (Q4)', cat:'other', sub:'If beneficiary quoted TFN to trustee in Q4 2024–25', agentDate:'', notes:'' },
  { date:'2025-07-31', title:'Franking Account Return',          cat:'other', sub:'For 30 June balancers with an amount payable', agentDate:'', notes:'' },
  { date:'2025-07-31', title:'Early Stage Innovation Company Report', cat:'other', sub:'Annual report for ESIC companies', agentDate:'', notes:'' },
  { date:'2025-08-14', title:'PAYG Withholding Annual Report',   cat:'other', sub:'Large withholders (annual withholding >$1M)', agentDate:'', notes:'Also: employers with no tax/BAS agent' },
  { date:'2025-08-28', title:'TPAR — Taxable Payments Annual Report', cat:'other', sub:'Payments to contractors for building, cleaning, IT, etc.', agentDate:'', notes:'Covers payments made during 2024–25 FY' },
  { date:'2026-01-31', title:'TFN Report — Closely Held Trusts (Q2)', cat:'other', sub:'If beneficiary quoted TFN to trustee in Q2 2025–26', agentDate:'', notes:'' },
  { date:'2026-02-28', title:'Annual GST Return',                cat:'other', sub:'For taxpayers without a tax return lodgment obligation', agentDate:'', notes:'If tax return obligation exists, due with that return' },
  { date:'2026-06-30', title:'⚠️ Trust Distribution Resolutions', cat:'other', sub:'Trustees must resolve distributions BEFORE 30 June', agentDate:'', notes:'Failure = default provisions apply. Must be done BEFORE year end.' },

  // ══ WORKSAFE VICTORIA (WorkCover)
  { date:'2025-07-01', title:'WorkCover Policy Renewal — VIC',  cat:'workcover', sub:'2025–26 renewal period commences. Notices issued early July.', agentDate:'', notes:'Check remuneration estimate; update via OES portal' },
  { date:'2025-08-01', title:'WorkCover Excess Buy-Out Option',  cat:'workcover', sub:'Final date to notify WorkSafe of excess buy-out election', agentDate:'', notes:'Premium Order (No.33) deadline' },
  { date:'2025-08-18', title:'WorkCover 5% Discount Deadline',   cat:'workcover', sub:'Pay premium in full by 18 Aug to receive 5% discount', agentDate:'', notes:'VIC employers — pay via OES or agent' },
  { date:'2025-10-01', title:'WorkCover 3% Discount Deadline',   cat:'workcover', sub:'Pay premium in full by 1 Oct to receive 3% discount', agentDate:'', notes:'VIC employers' },
  { date:'2025-10-24', title:'WorkCover Remuneration Certification — Large', cat:'workcover', sub:'Certify 2024–25 actual remuneration (>$200k remuneration)', agentDate:'', notes:'Failure → WorkSafe estimates at 20% more than prior year' },
  { date:'2025-11-01', title:'WorkCover Premium — Small Employers', cat:'workcover', sub:'Full payment due for premiums ≤$1,000', agentDate:'', notes:'One-off payment; no instalment option for small premiums' },
  { date:'2026-01-01', title:'WorkCover Quarterly Instalment — Q3', cat:'workcover', sub:'Third quarterly instalment due for eligible employers', agentDate:'', notes:'Instalments due: 1 Jul, 1 Oct, 1 Jan, 1 Apr' },
  { date:'2026-03-31', title:'WorkCover Remuneration Certification — All', cat:'workcover', sub:'Certify 2024–25 actual remuneration (≤$200k remuneration)', agentDate:'', notes:'All remaining employers by March 2026' },
  { date:'2026-04-01', title:'WorkCover Quarterly Instalment — Q4', cat:'workcover', sub:'Final quarterly instalment for 2025–26', agentDate:'', notes:'' },
  { date:'2026-06-30', title:'WorkCover Remuneration Update Deadline', cat:'workcover', sub:'Update 2025–26 estimated remuneration before renewal', agentDate:'', notes:'Submissions by 30 June reflected in 2026–27 renewal premium' },
];

// ── State
let currentCat = 'all';
let currentView = 'month';
let currentSearch = '';

const today = new Date();
today.setHours(0,0,0,0);

function parseDate(s) {
  const [y,m,d] = s.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  return dt;
}

function daysUntil(s) {
  const dt = parseDate(s);
  return Math.round((dt - today) / 86400000);
}

function formatDate(s) {
  const dt = parseDate(s);
  return dt.toLocaleDateString('en-AU', { day:'numeric', month:'short', year:'numeric' });
}

function catLabel(cat) {
  const map = { bas:'BAS', super:'Super', tax:'Tax Return', fbt:'FBT', workcover:'WorkCover', other:'Other' };
  return map[cat] || cat;
}

function filtered() {
  return DEADLINES.filter(d => {
    if (currentCat !== 'all' && d.cat !== currentCat) return false;
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      if (!d.title.toLowerCase().includes(q) && !d.sub.toLowerCase().includes(q) && !d.notes.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

// ── Render upcoming (next 30 days)
function renderUpcoming() {
  const items = DEADLINES
    .filter(d => { const n = daysUntil(d.date); return n >= 0 && n <= 30; })
    .sort((a,b) => a.date.localeCompare(b.date));

  const panel = document.getElementById('upcomingPanel');
  const container = document.getElementById('upcomingItems');

  if (items.length === 0) {
    panel.style.display = 'none';
    return;
  }

  container.innerHTML = items.map(d => {
    const n = daysUntil(d.date);
    const daysStr = n === 0 ? 'TODAY' : n === 1 ? '1 day' : n + ' days';
    const col = n <= 7 ? 'var(--danger)' : n <= 14 ? 'var(--warning)' : 'var(--blue-light)';
    return `<div class="upcoming-item">
      <div class="upcoming-days">
        <div class="upcoming-days-num" style="color:${col}">${daysStr}</div>
      </div>
      <div class="upcoming-item-text">
        <div class="upcoming-item-title">${d.title}</div>
        <div class="upcoming-item-date">${formatDate(d.date)} &nbsp;·&nbsp; <span class="dl-cat cat-${d.cat}">${catLabel(d.cat)}</span></div>
      </div>
    </div>`;
  }).join('');

  const next = items[0];
  const n = daysUntil(next.date);
  document.getElementById('nextUpStr').textContent = 
    n === 0 ? `${next.title} is DUE TODAY` :
    `Next: ${next.title} in ${n} day${n!==1?'s':''}`;
}

// ── Render month view
function renderMonthView() {
  const data = filtered();
  const grid = document.getElementById('monthGrid');
  const noRes = document.getElementById('noResults');

  // Group by month
  const months = {};
  data.forEach(d => {
    const dt = parseDate(d.date);
    const key = `${dt.getFullYear()}-${String(dt.getMonth()+1).padStart(2,'0')}`;
    const label = dt.toLocaleDateString('en-AU', { month:'long', year:'numeric' });
    if (!months[key]) months[key] = { label, items: [] };
    months[key].items.push(d);
  });

  const keys = Object.keys(months).sort();
  if (keys.length === 0) {
    grid.innerHTML = '';
    noRes.style.display = 'block';
    return;
  }
  noRes.style.display = 'none';

  grid.innerHTML = keys.map(k => {
    const { label, items } = months[k];
    const itemsHtml = items.map(d => {
      const dt = parseDate(d.date);
      const n = daysUntil(d.date);
      const isPast = n < 0;
      const isToday = n === 0;
      const isUpcoming = n >= 0 && n <= 14;
      let cls = 'dl-item';
      if (isPast) cls += ' past';
      if (isToday) cls += ' today';
      if (isUpcoming && !isToday) cls += ' upcoming';

      return `<div class="${cls}">
        <div class="dl-date">
          <div class="dl-date-day">${dt.getDate()}</div>
          <div class="dl-date-month">${dt.toLocaleDateString('en-AU',{month:'short'})}</div>
        </div>
        <div class="dl-content">
          <div class="dl-title">${d.title}</div>
          <div class="dl-sub">${d.sub}</div>
          ${d.agentDate ? `<div class="dl-sub" style="color:var(--periwinkle)">Agent date: ${formatDate(d.agentDate)}</div>` : ''}
          <span class="dl-cat cat-${d.cat}">${catLabel(d.cat)}</span>
        </div>
      </div>`;
    }).join('');

    return `<div class="month-card">
      <div class="month-header">
        <div class="month-name">${label}</div>
        <div class="month-count">${items.length} deadline${items.length!==1?'s':''}</div>
      </div>
      <div class="month-items">${itemsHtml}</div>
    </div>`;
  }).join('');
}

// ── Render list view
function renderListView() {
  const data = filtered().sort((a,b) => a.date.localeCompare(b.date));
  const body = document.getElementById('listBody');

  if (data.length === 0) {
    body.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:32px">No dates match your filters.</td></tr>';
    return;
  }

  body.innerHTML = data.map(d => {
    const n = daysUntil(d.date);
    const isPast = n < 0;
    const rowStyle = isPast ? 'opacity:0.45' : '';
    return `<tr style="${rowStyle}">
      <td class="text">${formatDate(d.date)}${n===0?' <span class="badge badge-warning">TODAY</span>':''}</td>
      <td class="text" style="font-weight:600;color:var(--white)">${d.title}</td>
      <td><span class="dl-cat cat-${d.cat}">${catLabel(d.cat)}</span></td>
      <td class="text" style="font-size:0.75rem;color:var(--text-muted)">${d.notes || d.sub}</td>
      <td class="text" style="font-size:0.75rem;color:var(--periwinkle)">${d.agentDate ? formatDate(d.agentDate) : '—'}</td>
    </tr>`;
  }).join('');
}

function render() {
  renderMonthView();
  renderListView();
}

function setView(v) {
  currentView = v;
  document.getElementById('monthView').classList.toggle('hidden', v !== 'month');
  document.getElementById('listView').classList.toggle('active', v === 'list');
  document.getElementById('btnMonthView').classList.toggle('active', v === 'month');
  document.getElementById('btnListView').classList.toggle('active', v === 'list');
}

// ── Init
document.addEventListener('DOMContentLoaded', function() {
  // Today string
  document.getElementById('todayStr').textContent = today.toLocaleDateString('en-AU', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

  renderUpcoming();
  render();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCat = btn.dataset.cat;
      render();
    });
  });

  // Search
  document.getElementById('searchInput').addEventListener('input', function() {
    currentSearch = this.value;
    render();
  });
});
</script>
</body>
</html>
