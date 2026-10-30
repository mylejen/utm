(function () {
  'use strict';
  var rootId = 'mu-sales-tools';
  var instanceKey = '__muSalesReportV3';
  if (window[instanceKey]) { window[instanceKey].ensure(); return; }
  var cleanup = null, mountedUrl = '', mountedForm = null;
  var scheduled = false;
  var initializedStats = new WeakSet();
  function ensure() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; init(); }, 100);
  }
  window[instanceKey] = {ensure:ensure};
  function query(id, fallback) { return document.getElementById(id) || document.querySelector(fallback); }
  function changed(el) { el.dispatchEvent(new Event('input', {bubbles:true})); el.dispatchEvent(new Event('change', {bubbles:true})); }
  function set(el, value) {
    if (!el) return;
    if (el.tagName === 'SELECT' && !Array.from(el.options).some(function (o) { return o.value === value; })) return;
    if (el._flatpickr) el._flatpickr.setDate(value, true, 'Y-m-d');
    else el.value = value;
    changed(el);
  }
  function today() {
    var parts = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Kuala_Lumpur',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date());
    var values = {}; parts.forEach(function (p) { values[p.type] = p.value; });
    return values.year + '-' + values.month + '-' + values.day;
  }
  function init() {
    stats();
    if (!/\/admin\/reports\/sales\/?$/.test(location.pathname)) {
      if (cleanup) { cleanup(); cleanup = null; }
      return;
    }
    var status = document.getElementById('status');
    var form = status && status.closest('form');
    var show = document.getElementById('show') || (form && form.querySelector('button[type="submit"]'));
    if (!form || !show) return;
    var existing = document.getElementById(rootId);
    if (existing && mountedForm === form && mountedUrl === location.href) return;
    if (cleanup) { cleanup(); cleanup = null; }
    if (existing) existing.remove();
    var staleSummary = document.getElementById('mu-sales-summary');
    if (staleSummary) staleSummary.remove();
    mountedForm = form; mountedUrl = location.href;
    var column = query('filter_column','#fc'), value = query('filter_value','#fv');
    var limit = query('per_page','#record_limit');
    var start = document.querySelector('[name="start_date"]'), end = document.querySelector('[name="end_date"]');
    var tools = document.createElement('div'); tools.id = rootId;
    tools.className = 'form-group row mt-2';
    tools.style.cssText = 'gap:6px;margin-left:0;margin-right:0';
    // Keep the native generate/export row intact. Mount a separate sibling row.
    var actionRow = show.closest('.form-group') || show.parentElement;
    actionRow.after(tools);
    function defaults() {
      ['form_code','invoice_number','extra_field_2','extra_field_3'].forEach(function (key) {
        var checkbox = form.querySelector('input[name="checked_columns[]"][value="' + key + '"]') || form.querySelector('input[name="c[' + key + ']"]');
        // Click invokes OnPay's checkbox handler as well as Alpine's model binding.
        if (checkbox && !checkbox.checked) checkbox.click();
      });
      set(status,'confirmed'); set(limit,'all'); set(column,'form'); set(value,'');
      var date = today();
      // Older OnPay date inputs used DD-MM-YYYY.
      if (document.getElementById('record_limit')) date = date.split('-').reverse().join('-');
      set(start,date); set(end,date);
    }
    function submit() {
      // Alpine commits input changes before generateReport reads its model.
      Promise.resolve().then(function () {
        requestAnimationFrame(function () { if (show.isConnected) show.click(); });
      });
    }
    [['Set Semula',null,'btn-outline-secondary'],['WhatsApp','WhatsApp','btn-success'],['Facebook','facebook','btn-primary'],['All','f','btn-primary']].forEach(function (item) {
      var button = document.createElement('button'); button.type = 'button'; button.className = 'btn ' + item[2]; button.textContent = item[0];
      button.addEventListener('click',function () {
        defaults();
        if (item[1] !== null) { set(column,'extra_field_2'); set(value,item[1]); submit(); }
      });
      tools.appendChild(button);
    });
    var summary = document.createElement('div'); summary.id = 'mu-sales-summary';
    summary.style.cssText = 'width:100%;font-weight:bold;color:blue;font-size:18px;margin-top:12px'; tools.after(summary);
    var lastSignature = '', controller, requestNumber = 0;
    function filters() { return JSON.stringify([status.value,limit.value,column.value,value.value,start.value,end.value]); }
    var appliedFilters = filters();
    function findTotal() {
      return Array.from(document.querySelectorAll('body *')).find(function (el) {
        return !el.closest('#mu-sales-summary') && /^JUMLAH NILAI KESELURUHAN\s*=/i.test(el.textContent.trim()) && el.textContent.trim().length < 160 && !Array.from(el.children).some(function (c) { return /JUMLAH NILAI KESELURUHAN/i.test(c.textContent); });
      });
    }
    // Keep the webhook's original DD-MM-YYYY payload contract.
    function apiDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value) ? value.split('-').reverse().join('-') : value; }
    function snapshot(text) {
      var match = text.match(/RM\s*([\d,]+(?:\.\d+)?)/i);
      if (!match) return null;
      return {hostname:location.hostname,keyword:column && ['invoice_number','extra_field_3'].includes(column.value) ? value.value : '',startdate:apiDate(start.value),enddate:apiDate(end.value),totalamount:match[1].replace(/,/g,'')};
    }
    function line(text, colour) { var p=document.createElement('p'); p.textContent=text; p.style.color=colour || 'blue'; summary.appendChild(p); }
    async function refresh(force) {
      if (filters() !== appliedFilters) return;
      var total = findTotal(); if (!total) return;
      var data = snapshot(total.textContent); if (!data) return;
      var wa = column.value === 'extra_field_2' && value.value.toLowerCase() === 'whatsapp';
      if (wa) data.keyword = value.value;
      var signature = JSON.stringify([data,wa]);
      if (!force && signature === lastSignature) return;
      lastSignature = signature;
      var number = ++requestNumber; if (controller) controller.abort(); controller = new AbortController();
      summary.replaceChildren(); line(total.textContent.trim());
      // The total can cover just the current page. Never treat it as all filtered sales.
      if (limit.value !== 'all') { line('Pilih Semua dan jana laporan untuk kiraan kos/ROAS.'); return; }
      try {
        var response = await fetch('https://webhook.site/check-cost-' + (wa ? 'wa' : 'meta'), {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:controller.signal});
        if (!response.ok) throw new Error('HTTP ' + response.status);
        var result = await response.json(); if (number !== requestNumber) return;
        var cost = result.cost_with_tax ?? result.spend_with_tax;
        if (result.status !== 'success' || [cost,result.roas_spend_with_tax,result.percentage].some(function (v) { return v == null; })) throw new Error('Respons API tidak lengkap');
        var colour = ['red','green'].includes(result.colour) ? result.colour : 'blue';
        line('JUMLAH KOS ' + (wa?'WA':'META') + ' (+16.7%) = ' + cost);
        line('ROAS = ' + result.roas_spend_with_tax,colour);
        line('PERCENTAGE ADS SPEND = ' + result.percentage,colour);
      } catch (error) { if (number === requestNumber && error.name !== 'AbortError') line('Kos/ROAS tidak tersedia: ' + error.message,'red'); }
    }
    // Report rendering may be asynchronous. Observe replacement totals without duplicating the toolbar.
    var timer;
    var summaryObserver = new MutationObserver(function (records) {
      if (records.every(function (r) { return summary.contains(r.target) || r.target === summary; })) return;
      clearTimeout(timer); timer = setTimeout(function () { refresh(false); },300);
    });
    summaryObserver.observe(document.body,{childList:true,subtree:true,characterData:true});
    cleanup = function () {
      summaryObserver.disconnect(); clearTimeout(timer);
      ++requestNumber; if (controller) controller.abort();
      tools.remove(); summary.remove();
    };
    refresh(false);
  }
  // A persistent lifecycle handles late extension injection and DOM replacement.
  // Nothing is auto-submitted on page load; shortcut clicks apply today's defaults.
  var lifecycle = new MutationObserver(ensure);
  function start() {
    lifecycle.observe(document.documentElement,{childList:true,subtree:true});
    ensure();
  }
  if (document.documentElement) start();
  else document.addEventListener('DOMContentLoaded',start,{once:true});
  window.addEventListener('pageshow',ensure);
  window.addEventListener('popstate',ensure);
  document.addEventListener('alpine:initialized',function () {
    initializedStats = new WeakSet();
    ensure();
  });
  // Also detect URL changes made by a client-side router without replacing the form.
  setInterval(function () {
    if (mountedUrl !== location.href || !document.getElementById(rootId)) ensure();
  },1000);
  // Graph/statistics defaults remain independent of the report toolbar.
  function stats() {
    if (document.readyState === 'loading') return;
    var controls = [document.getElementById('sales_graph_status')];
    // Current OnPay uses a custom-select and no longer renders stats-type-links.
    if (/^\/admin\/statistics\/sales\/?$/.test(location.pathname)) controls.push(document.querySelector('select#status[name="status"]'));
    if (document.getElementById('stats-type-links')) controls.push(document.querySelector('#status.form-control'));
    controls.forEach(function (el) {
      if (!el || initializedStats.has(el) || !Array.from(el.options).some(function (option) { return option.value === 'confirmed'; })) return;
      initializedStats.add(el);
      set(el,'confirmed');
      try { sessionStorage.removeItem('buttonClicked'); } catch (_) {}
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',stats,{once:true}); else stats();
})();
