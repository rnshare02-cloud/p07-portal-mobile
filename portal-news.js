(() => {
  const FALLBACK = {
    version: '0.6.5', date: '2026-09-17', title: "重要：Prompter v1.0.0 公開URL変更のお知らせ",
    summary: "Prompterは v1.0.0 として https://p07-prompter.pages.dev/ へ移行しました。旧PWA（p07-mobile-prompt-builder-preview.r-n-share01.workers.dev）をご利用中の方は、新しい「プロンプターを起動する」から開き、ホーム画面へ再追加してください。旧URLは移行確認期間中のみ保持します。Prompt内容・Guard・Master境界に変更はありません。"
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
