/* A visible window onto the design system, inside the app it was tested against.
   Fixed to the corner so it never disturbs the app's own layout. */
(function () {
  const panel = document.createElement('section');
  panel.id = 'ds-pilot';
  panel.innerHTML = `
    <style>
      #ds-pilot {
        position: fixed; left: 12px; bottom: 12px; z-index: 9999; width: 300px; max-height: 88vh; overflow: auto;
        font-family: var(--font-family-ui, system-ui); font-size: 12px;
        color: var(--color-text-primary); background: var(--color-bg-surface);
        border-radius: var(--radius-lg, 12px); padding: 12px 14px;
        box-shadow: var(--shadow-overlay, 0 20px 60px rgba(0,0,0,.5));
        display: grid; gap: 8px;
      }
      #ds-pilot h2 { margin: 0; font-size: 12px; letter-spacing: .08em; text-transform: uppercase;
                     color: var(--color-text-secondary); font-weight: 600; }
      #ds-pilot .row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
      #ds-pilot .ds-input { width: 100%; }
      #ds-pilot .note { margin: 0; color: var(--color-text-secondary); line-height: 1.4; }
      #ds-pilot .seg { display: flex; gap: 0; border-radius: var(--radius-sm, 4px); overflow: hidden; }
      #ds-pilot .seg button { flex: 1; border: 0; padding: 6px 8px; cursor: pointer;
        background: var(--color-bg-subtle); color: var(--color-text-secondary);
        font: inherit; border-radius: 0; }
      #ds-pilot .seg button[aria-pressed="true"] { background: var(--color-accent-default);
        color: var(--color-accent-on); }
      #ds-pilot .toggle { position: absolute; top: 8px; right: 10px; border: 0; cursor: pointer;
        background: none; color: var(--color-text-secondary); font: inherit; }
      #ds-pilot.closed .body { display: none; }
    </style>
    <button class="toggle" type="button" aria-expanded="true">–</button>
    <h2>design system v0.2.0</h2>
    <div class="body" style="display:grid;gap:10px">
      <div class="row">
        <button class="ds-button-primary" type="button">Solid</button>
        <button class="ds-button-primary ds-tinted" type="button">Tinted</button>
        <button class="ds-button-secondary" type="button">Secondary</button>
        <button class="ds-button-danger ds-tinted" type="button">Danger</button>
      </div>
      <div class="row">
        <button class="ds-button-primary" type="button" disabled>Disabled</button>
        <span class="ds-badge ok">ok</span>
        <span class="ds-badge warn">warn</span>
      </div>
      <input class="ds-input" type="text" placeholder="ds-input" aria-label="design-system input">
      <div class="ds-toast" style="max-width:none">
        <i style="width:3px;flex:none;background:var(--color-status-ok)"></i>
        <div style="padding:10px 12px;display:grid;gap:2px">
          <b style="font-size:12px">Components, not colours</b>
          <span style="font-size:11px;color:var(--color-text-secondary)">every value above is a token</span>
        </div>
      </div>
      <div class="seg" role="group" aria-label="theme">
        <button type="button" data-theme-set="dark" aria-pressed="true">Studio theme</button>
        <button type="button" data-theme-set="light" aria-pressed="false">Paper theme</button>
      </div>
      <p class="note">No visible change in the studio theme is the result: it was rebuilt from the
      app's own palette. Switch to paper and the app restyles — its chrome reads the contract now.</p>
    </div>`;
  document.body.appendChild(panel);

  panel.querySelector('.toggle').addEventListener('click', (e) => {
    panel.classList.toggle('closed');
    e.currentTarget.textContent = panel.classList.contains('closed') ? '+' : '–';
    e.currentTarget.setAttribute('aria-expanded', String(!panel.classList.contains('closed')));
  });
  panel.querySelectorAll('[data-theme-set]').forEach((b) => {
    b.addEventListener('click', () => {
      const theme = b.dataset.themeSet;
      document.documentElement.dataset.theme = theme;
      panel.querySelectorAll('[data-theme-set]').forEach((o) =>
        o.setAttribute('aria-pressed', String(o === b)));
    });
  });
})();
