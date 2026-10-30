(function () {
  'use strict';
  if (window.__muTrackingFixed) return;
  window.__muTrackingFixed = true;
  var script = document.currentScript || document.querySelector('script[data-mu-tracking],script[src*="/utm"],script[src*="b.fixed"]');
  var params = new URLSearchParams(location.search);
  var pairs = {utm_source:'muSource',utm_medium:'muMedium',utm_campaign:'muCampaign',utm_content:'muContent',utm_term:'muTerm',utm_id:'muID',ref:'muRef',utm_placement:'muPlacement',utm_cid:'muCID',audience:'muAudience'};
  function valid(v) { return v != null && v !== '' && v !== 'null' && v !== 'undefined'; }
  function read(store, key) { try { var v = window[store].getItem(key); return valid(v) ? v : null; } catch (_) { return null; } }
  function write(store, key, value) { if (valid(value)) try { window[store].setItem(key, value); } catch (_) {} }
  function cookie(name) {
    var row = document.cookie.split(';').map(function (s) { return s.trim(); }).find(function (s) { return s.indexOf(name + '=') === 0; });
    if (!row) return null;
    try { var v = decodeURIComponent(row.slice(name.length + 1)); return valid(v) ? v : null; } catch (_) { return null; }
  }
  // Explicit sharing avoids guessing public suffixes such as com.my.
  var sharedDomain = script && script.getAttribute('data-cookie-domain');
  if (sharedDomain) sharedDomain = sharedDomain.replace(/^\./, '').toLowerCase();
  if (sharedDomain && location.hostname !== sharedDomain && !location.hostname.endsWith('.' + sharedDomain)) sharedDomain = null;
  function setCookie(key, value) {
    if (!valid(value)) return;
    document.cookie = key + '=' + encodeURIComponent(value) + ';Max-Age=31104000;Path=/;SameSite=Lax' + (location.protocol === 'https:' ? ';Secure' : '') + (sharedDomain ? ';Domain=' + sharedDomain : '');
  }
  var tracking = {};
  Object.keys(pairs).forEach(function (key) {
    var value = params.get(key), sessionKey = key === 'ref' ? 'utm_ref' : key;
    if (valid(value)) { write('sessionStorage',sessionKey,value); write('localStorage',pairs[key],value); setCookie(pairs[key],value); }
    tracking[key] = valid(value) ? value : read('sessionStorage',sessionKey) || cookie(pairs[key]) || read('localStorage',pairs[key]);
  });
  var first = cookie('muFirstCampaign') || read('localStorage','muFirstCampaign');
  if (!first && valid(params.get('utm_campaign'))) first = params.get('utm_campaign');
  if (first) { write('localStorage','muFirstCampaign',first); if (!cookie('muFirstCampaign')) setCookie('muFirstCampaign',first); }
  ['_fbc','_fbp','_ttp'].forEach(function (key) { write('localStorage',key,cookie(key)); });
  // Preserve the existing integration flags.
  try { sessionStorage.setItem('hasRunAxios','0'); } catch (_) {}
  try { localStorage.setItem('hasRunAxios','0'); } catch (_) {}
  function field(id) { return document.getElementById(id) || document.querySelector('[name="' + id + '"]'); }
  function fill(el, value) {
    if (!el || !valid(value) || el.value === value) return;
    el.value = value;
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
  }
  function labelled(id, labels, value) {
    var label = document.querySelector('label[for="' + id + '"]'), input = field(id);
    if (!label || !input) return;
    var text = label.textContent.replace(/[\s*]+/g,' ').trim().toLowerCase();
    if (labels.indexOf(text) < 0) return;
    label.hidden = true; label.style.display = 'none';
    input.hidden = true; input.style.display = 'none';
    fill(input,value);
  }
  function progress() {
    if (!script) return;
    var dynamic = script.hasAttribute('sasaran');
    var target = Number(script.getAttribute(dynamic ? 'sasaran' : 'sasaranlama'));
    var stats = window.PageData && window.PageData.salesStats;
    var current = stats && Number(stats.total_amount_all);
    if (!stats || !Number.isFinite(current) || current < 0 || !Number.isFinite(target) || target <= 0) return;
    if (dynamic && current >= target) {
      var next = Math.max(current * 1.2,target * 1.2);
      var interval = next < 100000 ? 2000 : next < 1000000 ? 20000 : 200000;
      target = Math.ceil(next / interval) * interval;
    }
    var currentEl = field('custom-donation-current-value'), targetEl = field('custom-donation-target-value');
    var container = field('custom-donation-progress-bar');
    if (currentEl) currentEl.textContent = current.toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
    if (targetEl) targetEl.textContent = target.toLocaleString('en-MY',{minimumFractionDigits:2,maximumFractionDigits:2});
    if (!container) return;
    container.dataset.dynamicTarget = String(target);
    var bar = container.querySelector('.progress-bar');
    if (!bar) return;
    var percentage = current / target * 100, capped = Math.min(100,percentage);
    bar.style.width = capped.toFixed(2) + '%'; bar.textContent = percentage.toFixed(2) + '%';
    bar.setAttribute('role','progressbar'); bar.setAttribute('aria-valuemin','0'); bar.setAttribute('aria-valuemax','100'); bar.setAttribute('aria-valuenow',capped.toFixed(2));
  }
  function init() {
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.documentElement.style.scrollBehavior = 'smooth';
    [['client_fullname','nama'],['client_email','emel'],['client_phone_number','telefon']].forEach(function (p) {
      var el = field(p[0]); if (el && !el.value) fill(el,params.get(p[1]));
    });
    labelled('extra_field_2',['source'],tracking.utm_source);
    var combined = tracking.utm_campaign ? [tracking.utm_campaign,tracking.utm_term].filter(valid) : [];
    if (combined.length && ['new_customer','existing_customer'].indexOf(tracking.audience) >= 0) combined.push(tracking.audience);
    labelled('extra_field_3',['campaign','ref','rujukan'],combined.length ? combined.join(' / ') : tracking.ref);
    document.querySelectorAll('a.buttonscroll,a#buttonscroll').forEach(function (a) {
      if (a.hash) { var u = new URL(location.href); u.hash = a.hash; a.href = u.href; }
    });
    var formLink = field('borang');
    if (formLink && formLink.getAttribute('href')) {
      var original = formLink.getAttribute('href'), url = new URL(location.href);
      url.hash = document.getElementById('form') ? 'form' : 'order_form';
      document.querySelectorAll('a[href]').forEach(function (a) { if (a.getAttribute('href') === original) a.href = url.href; });
    }
    var dateEl = field('tarikh');
    if (dateEl) dateEl.textContent = new Intl.DateTimeFormat('ms-MY',{weekday:'long',day:'2-digit',month:'long',year:'numeric',timeZone:'Asia/Kuala_Lumpur'}).format(new Date());
    var divs = Array.from(document.querySelectorAll('.utm_campaign')), fallback = field('UMUM');
    // Campaign content follows the current URL, matching the original behavior.
    var campaign = (params.get('utm_campaign') || '').toUpperCase();
    var match = divs.find(function (d) { return d.id && d.id.toUpperCase() !== 'UMUM' && campaign.includes(d.id.toUpperCase()); });
    divs.forEach(function (d) { d.style.display = d === match || (!match && d === fallback) ? '' : 'none'; });
    if (fallback) fallback.style.display = match ? 'none' : '';
    progress();
    if (window.PageData && valid(window.PageData.uuid) && window.zaraz && typeof window.zaraz.set === 'function') window.zaraz.set('uuid',window.PageData.uuid);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
  // Retry late-rendered OnPay fields/statistics for a bounded period.
  var attempts = 0, timer = setInterval(function () { init(); if (++attempts >= 10) clearInterval(timer); },500);
  var domain = script && script.getAttribute('domain');
  if (domain && window.parent !== window) {
    try {
      var origin = new URL('https://' + domain).origin;
      window.addEventListener('message',function (event) {
        if (event.origin !== origin || event.source !== window.parent || !event.data || typeof event.data.cookies !== 'object' || !event.data.cookies) return;
        Object.values(pairs).concat(['muFirstCampaign','_fbc','_fbp','_ttp']).forEach(function (key) {
          var value = event.data.cookies[key]; if (typeof value === 'string' && valid(value)) write('localStorage',key,value);
        });
      });
      window.parent.postMessage('requestCookies',origin);
    } catch (_) {}
  }
  // This retains the original IP redirect rule; it is not an access-control boundary.
  fetch('https://www.cloudflare.com/cdn-cgi/trace').then(function (r) { return r.ok ? r.text() : ''; }).then(function (text) {
    var found = text.match(/^ip=(.+)$/m);
    if (found && ['183.171.27.151','183.171.16.18','183.171.29.155','183.171.29.217','115.164.204.49','14.192.213.30','180.75.241.55'].indexOf(found[1].trim()) >= 0 && location.pathname !== '/') {
      alert('Sorry, contact admin to enter'); location.assign(location.origin);
    }
  }).catch(function () {});
})();
