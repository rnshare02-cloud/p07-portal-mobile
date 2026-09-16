(() => {
  const FALLBACK = {
    version: '0.6.3', date: '2026-09-15', title: 'CH01 Minimum Prompt Pilot',
    summary: '\u0043\u0048\u0030\u0031\u3067Provider\u3078\u6e21\u3059\u60c5\u5831\u3092\u7ae0\u306b\u5fc5\u8981\u306a\u6700\u5c0f\u9650\u3078\u7d5e\u308a\u3001\u8a9e\u308a\u624b\u3092\u300c\u4ffa\u300d\u306b\u56fa\u5b9a\u3059\u308bContext Minimization\u3092\u5c0e\u5165\u3057\u307e\u3057\u305f\u3002'
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
