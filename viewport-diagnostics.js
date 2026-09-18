(() => {
  const params = new URLSearchParams(location.search);
  if (params.get('diag') !== '1') return;

  const style = document.createElement('style');
  style.textContent = `
    #p07-viewport-diagnostics {
      position: fixed;
      z-index: 2147483647;
      top: 8px;
      left: 8px;
      right: 8px;
      max-width: 520px;
      margin: 0 auto;
      padding: 10px 12px;
      border-radius: 12px;
      background: rgba(10, 12, 16, .92);
      color: #fff;
      font: 12px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      box-shadow: 0 6px 24px rgba(0,0,0,.35);
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      box-sizing: border-box;
    }
    #p07-viewport-diagnostics .diag-head {
      display:flex; gap:8px; align-items:center; justify-content:space-between; margin-bottom:6px;
    }
    #p07-viewport-diagnostics .diag-title { font-weight:700; }
    #p07-viewport-diagnostics button {
      min-height: 32px; padding: 5px 9px; border:0; border-radius:8px;
      font: inherit; font-weight:700; background:#fff; color:#111;
    }
    #p07-viewport-diagnostics pre {
      margin:0; white-space:pre-wrap; word-break:break-word;
    }
    #p07-safe-probe {
      position:fixed; visibility:hidden; pointer-events:none;
      padding-top:env(safe-area-inset-top, 0px);
      padding-right:env(safe-area-inset-right, 0px);
      padding-bottom:env(safe-area-inset-bottom, 0px);
      padding-left:env(safe-area-inset-left, 0px);
    }
  `;
  document.head.appendChild(style);

  const probe = document.createElement('div');
  probe.id = 'p07-safe-probe';
  document.body.appendChild(probe);

  const panel = document.createElement('div');
  panel.id = 'p07-viewport-diagnostics';
  panel.innerHTML = `
    <div class="diag-head">
      <span class="diag-title">P-07 viewport diagnostics</span>
      <button type="button" id="p07-diag-copy">Copy</button>
    </div>
    <pre id="p07-diag-out"></pre>
  `;
  document.body.appendChild(panel);

  const out = panel.querySelector('#p07-diag-out');
  const copy = panel.querySelector('#p07-diag-copy');

  function px(v) {
    const n = parseFloat(v || '0');
    return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }

  function rectOf(sel) {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      width: Math.round(r.width * 100) / 100,
      height: Math.round(r.height * 100) / 100,
      top: Math.round(r.top * 100) / 100,
      bottom: Math.round(r.bottom * 100) / 100
    };
  }

  function collect() {
    const vv = window.visualViewport;
    const csSafe = getComputedStyle(probe);
    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const card = rectOf('.mobile-container');
    const details = document.querySelector('.update-panel');

    const vh = vv ? vv.height : innerHeight;
    const cardPct = card && vh ? Math.round((card.height / vh) * 1000) / 10 : null;

    return {
      timestamp: new Date().toISOString(),
      url: location.href,
      ua: navigator.userAgent,
      standalone: matchMedia('(display-mode: standalone)').matches || !!navigator.standalone,
      orientation: screen.orientation?.type || (innerWidth > innerHeight ? 'landscape' : 'portrait'),
      dpr: devicePixelRatio,
      screen_css: `${screen.width} x ${screen.height}`,
      inner: `${innerWidth} x ${innerHeight}`,
      document_client: `${document.documentElement.clientWidth} x ${document.documentElement.clientHeight}`,
      visual_viewport: vv
        ? `${Math.round(vv.width*100)/100} x ${Math.round(vv.height*100)/100}`
        : 'unsupported',
      visual_offset: vv
        ? `${Math.round(vv.offsetLeft*100)/100}, ${Math.round(vv.offsetTop*100)/100}`
        : 'unsupported',
      visual_scale: vv ? vv.scale : 'unsupported',
      safe_area_px: {
        top: px(csSafe.paddingTop),
        right: px(csSafe.paddingRight),
        bottom: px(csSafe.paddingBottom),
        left: px(csSafe.paddingLeft)
      },
      root_font_px: px(rootStyle.fontSize),
      body_font_px: px(bodyStyle.fontSize),
      update_open: !!details?.open,
      portal_panel: card,
      panel_percent_visual_viewport: cardPct
    };
  }

  function render() {
    const d = collect();
    out.textContent =
`screen(css): ${d.screen_css}
inner:       ${d.inner}
doc client:  ${d.document_client}
visual VP:   ${d.visual_viewport}
vv offset:   ${d.visual_offset}
vv scale:    ${d.visual_scale}
DPR:         ${d.dpr}
safe T/R/B/L:${d.safe_area_px.top}/${d.safe_area_px.right}/${d.safe_area_px.bottom}/${d.safe_area_px.left}
root/body px:${d.root_font_px}/${d.body_font_px}
panel h:     ${d.portal_panel?.height ?? 'n/a'} px
panel/vv:    ${d.panel_percent_visual_viewport ?? 'n/a'} %
update open: ${d.update_open}
standalone:  ${d.standalone}
orientation: ${d.orientation}`;
    panel.dataset.json = JSON.stringify(d, null, 2);
  }

  copy.addEventListener('click', async () => {
    const text = panel.dataset.json || '';
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = 'Copied';
      setTimeout(() => copy.textContent = 'Copy', 1200);
    } catch {
      copy.textContent = 'Copy failed';
      setTimeout(() => copy.textContent = 'Copy', 1200);
    }
  });

  addEventListener('resize', render, {passive:true});
  addEventListener('orientationchange', () => setTimeout(render, 250), {passive:true});
  window.visualViewport?.addEventListener('resize', render, {passive:true});
  window.visualViewport?.addEventListener('scroll', render, {passive:true});
  document.querySelector('.update-panel')?.addEventListener('toggle', render);

  render();
})();
