# Pilot: the design system on illgorhythm

What was done here, in one branch (`design-system-pilot`), with nothing invented:

1. `design-system/tokens.css` + `components.css` copied in from `2nist/design-system` @ v0.1.0.
2. `design-system/theme-studio.css` — a **second theme over the same contract**. Every value in it is
   one the app already shipped in its own `:root`.
3. `index.html` — `<html data-theme="dark">`, the three stylesheets linked, and the app's palette
   block turned into aliases onto the contract. No other CSS was touched.
4. Three toolbar controls swapped onto design-system components to see how they fare.

## What transferred cleanly

The app keeps its own variable names, so its ~60 `var(--teal)` / `var(--line)` / `var(--panel)` uses
did not change — they now resolve through the contract. Comparing computed styles before and after,
element by element:

| Element | Before | After |
|---|---|---|
| `body` | `#131315` / `#f1ede6` | identical |
| `.panel` | `#1b1b1e` / line `#2e2e35` | identical |
| `.btn-teal` | `rgba(94,200,192,.12)` + teal ink | identical |
| `.btn-danger` | `rgba(248,113,113,.1)` + `#f8a3a3` | identical |
| `.pat-btn`, `.play-btn`, `.toggle`, `.cell`, `header` | — | identical |
| `.btn`, `.chip` | `#212125` | **`#1b1b1e`** — one step lost |

That last row is the only visual change in the whole app: `--panel-2` had nowhere to go, because the
contract's neutral ladder is three steps (canvas / surface / subtle) and this app uses four.

## What the app needed that the contract does not have

**1. A tinted button.** The app's primary action is `rgba(94,200,192,.12)` with teal ink and a 35%
teal edge — not a solid fill. So is its destructive action, and so are pinteq's
(`hover:bg-destructive/90`, `bg-destructive/15 text-destructive`). Our `components.css` only knows
solid fills, so the swap turned three quiet ghost controls into slabs:

| | App's own | Our component |
|---|---|---|
| primary | teal ink on a 12% tint, **6.82:1** | `#0d1214` on solid teal, **9.43:1** |
| danger | `#f8a3a3` on a 10% tint, **7.63:1** | `#000000` on solid `#f87171`, **7.59:1** |

Both pass AA. The difference is hierarchy, not accessibility — and a design system that cannot
express "the same accent, quieter" forces every app to either shout or leave the system.

**2. A fourth neutral.** `bg.canvas` / `bg.surface` / `bg.subtle` covers three levels; this app
carries four plus an independent line. The collapse is small (1.08:1) but it is a lost step, and it
is where the two `.btn` backgrounds moved.

**3. Two border roles, not one.** The app's divider is `#2e2e35`, **1.28:1** against its panel — a
whisper by design, because it draws 18 of them across a dense grid. Our `border.default` in dark is
`#8c8c8c`, **5.11:1** against the same panel, raised that high so a control's edge is visible. Both
are right for their job and the contract has one role for both, so the theme had to override
`border.default` down to the app's whisper and give up component edges. `shadow.hairline` covers part
of this, but a shadow is not a border you can divide a table with.

**4. A second accent.** The app is built on teal *and* tan (teal = play/active, tan = secondary
emphasis). The contract has exactly one accent role, so `--tan` and `--tan-dim` had to stay literal
in the palette block, unthemed. This is the decision log's own "themes as value sets" rule running
out of vocabulary.

## What did not transfer, and should not

~45 literal hexes remain in the app: per-drum-voice cell colours (`#f0c79a`, `#eccca6`, `#f3d9bd`),
effect tints (`#f3b3b3`, `#ffc9c9`), the logo gradient. Those are **content** colours — the sound of
a voice, not chrome — and a semantic contract should not swallow them.

## Verdict

The contract survives contact: it absorbed a foreign, dark-first, teal-and-tan palette as a theme,
with the app's own variable names intact, and lost exactly one 1.08:1 step. What it could not express
is a list of *additions*, not corrections — a tinted variant, a fourth neutral, a divider role, a
second accent.

Recommended order: the **tinted variant** first (it is a `color-mix` of tokens we already have, no
new tokens, and it is how three of the four apps style their primary), then **divider vs edge**,
then the fourth neutral, then the second accent — the last being a real contract decision rather than
an addition.
