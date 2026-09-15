(() => {
  const FALLBACK = {
    version: '0.6.3', date: '2026-09-15', title: 'Narrative Experience Update',
    summary: '\u7269\u8a9e\u751f\u6210\u306b Volume / Genre / Tempo / Dialogue / Focus \u306e5\u9805\u76ee\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f\u3002'
  };
  const render = d => {
    document.querySelectorAll('[data-update-version]').forEach(e=>e.textContent='v'+(d.serviceVersion||d.version));
    document.querySelectorAll('[data-update-date]').forEach(e=>e.textContent=d.date||'');
    document.querySelectorAll('[data-update-title]').forEach(e=>e.textContent=d.title||'\u66f4\u65b0\u60c5\u5831');
    document.querySelectorAll('[data-update-summary]').forEach(e=>e.textContent=d.summary||'');
  };
  fetch('news.json',{cache:'no-store'})
    .then(r=>{ if(!r.ok) throw new Error('http'); return r.json(); })
    .then(d=>{ localStorage.setItem('p07-latest-update',JSON.stringify(d)); render(d); })
    .catch(()=>{ try { render(JSON.parse(localStorage.getItem('p07-latest-update'))||FALLBACK); } catch { render(FALLBACK); } });
})();
