(() => {
  const FALLBACK = {
    version: '0.6.0', date: '2026-09-15', title: 'Narrative Experience Update',
    summary: '物語生成に Volume / Genre / Tempo / Dialogue / Focus の5項目を追加しました。'
  };
  const render = d => {
    document.querySelectorAll('[data-update-version]').forEach(e=>e.textContent='v'+(d.serviceVersion||d.version));
    document.querySelectorAll('[data-update-date]').forEach(e=>e.textContent=d.date||'');
    document.querySelectorAll('[data-update-title]').forEach(e=>e.textContent=d.title||'更新情報');
    document.querySelectorAll('[data-update-summary]').forEach(e=>e.textContent=d.summary||'');
  };
  fetch('news.json',{cache:'no-store'})
    .then(r=>{ if(!r.ok) throw new Error('http'); return r.json(); })
    .then(d=>{ localStorage.setItem('p07-latest-update',JSON.stringify(d)); render(d); })
    .catch(()=>{ try { render(JSON.parse(localStorage.getItem('p07-latest-update'))||FALLBACK); } catch { render(FALLBACK); } });
})();
