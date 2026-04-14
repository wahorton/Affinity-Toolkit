/* ============================================
   AFFINITY ACCOUNTING TOOLKIT — SHARED JS
   ============================================ */

// ── Mobile sidebar toggle
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    var toggle = document.querySelector('.mob-toggle');
    var sidebar = document.querySelector('.sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', function() {
        sidebar.classList.toggle('open');
      });
      document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== toggle) {
          sidebar.classList.remove('open');
        }
      });
    }
  });
})();

// ── Tabs
function initTabs(containerSelector) {
  var container = document.querySelector(containerSelector || '.tabs');
  if (!container) return;
  var btns = container.querySelectorAll('.tab-btn');
  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.dataset.tab;
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });
}

// ── Format currency
function fmt(n, decimals) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  decimals = decimals !== undefined ? decimals : 2;
  return '$' + Number(n).toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// ── Format number
function fmtN(n, decimals) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  decimals = decimals !== undefined ? decimals : 2;
  return Number(n).toLocaleString('en-AU', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// ── Format percent
function fmtP(n, decimals) {
  if (n === null || n === undefined || isNaN(n)) return '—';
  decimals = decimals !== undefined ? decimals : 2;
  return Number(n).toFixed(decimals) + '%';
}

// ── Parse float safely
function pf(v) { return parseFloat(String(v).replace(/,/g,'')) || 0; }
function pi(v) { return parseInt(String(v).replace(/,/g,'')) || 0; }

// ── Print page
function printPage() { window.print(); }

// ── Export table to CSV
function exportCSV(tableId, filename) {
  var table = document.getElementById(tableId);
  if (!table) return;
  var rows = table.querySelectorAll('tr');
  var csv = [];
  rows.forEach(function(row) {
    var cols = row.querySelectorAll('th, td');
    var line = Array.from(cols).map(function(c) {
      var text = c.innerText.replace(/"/g, '""').replace(/\n/g, ' ');
      return '"' + text + '"';
    });
    csv.push(line.join(','));
  });
  var blob = new Blob([csv.join('\n')], { type: 'text/csv' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (filename || 'affinity-export') + '.csv';
  a.click();
}

// ── Copy to clipboard
function copyText(elementId) {
  var el = document.getElementById(elementId);
  if (!el) return;
  var text = el.innerText || el.value || '';
  navigator.clipboard.writeText(text).then(function() {
    var btn = document.querySelector('[onclick*="' + elementId + '"]');
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = '✓ Copied!';
      setTimeout(function() { btn.textContent = orig; }, 2000);
    }
  });
}

// ── Date helpers
function today() {
  var d = new Date();
  return d.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function todayISO() {
  return new Date().toISOString().split('T')[0];
}

// ── Set today's date in date inputs with data-today attr
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-today]').forEach(function(el) {
    if (!el.value) el.value = todayISO();
  });
  // Set today display
  document.querySelectorAll('.today-display').forEach(function(el) {
    el.textContent = today();
  });
});
