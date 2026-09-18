(() => {
  const FALLBACK = {
    version: '1.0.0', date: '2026-09-18', title: "P-07 Portal v1.0.0 — Version体系を正式統一",
    summary: "PC / Mobile Portalの製品Versionを P-07 Portal v1.0.0 へ統一しました。公開URL、Prompter導線、GA4、Privacy / Analytics、Canon、Master、Guard、Prompt仕様、公開章境界は変更していません。"
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
    .catch(()=>{
      try {
        const cached = JSON.parse(localStorage.getItem('p07-latest-update'));
        render(cached && (cached.serviceVersion||cached.version) === FALLBACK.version ? cached : FALLBACK);
      } catch { render(FALLBACK); }
    });
})();
