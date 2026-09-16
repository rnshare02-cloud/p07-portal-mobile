(() => {
  const FALLBACK = {
    version: '0.6.4', date: '2026-09-16', title: 'v0.6.4 \u66f4\u65b0 \u2014 \u6700\u65b0\u7248\u3078\u306e\u5207\u308a\u66ff\u3048\u3092\u5b89\u5b9a\u5316',
    summary: '\u30d6\u30e9\u30a6\u30b6\u306b\u53e4\u3044\u7248\u304c\u6b8b\u308b\u5834\u5408\u3067\u3082\u3001\u73fe\u5728\u306e\u6b63\u5e38\u7248\u3092\u5b88\u308a\u306a\u304c\u3089\u6700\u65b0\u306ePrompt Builder\u3078\u5b89\u5168\u306b\u5207\u308a\u66ff\u308f\u308b\u66f4\u65b0\u6a5f\u69cb\u3092\u8ffd\u52a0\u3057\u307e\u3057\u305f\u3002'
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
