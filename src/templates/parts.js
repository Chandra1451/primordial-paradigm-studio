// Small pieces shared by several templates.

import { esc, formatDate } from '../lib/html.js';

// The growing name. Without JavaScript the <h1> shows as normal text; with it, a canvas draws
// the same words cell by cell (assets/js/grow-name.js reads data-lines).
export function growName(words) {
  const lines = words.map((w) => w.toUpperCase()).join('|');
  return `<div class="grow" data-lines="${esc(lines)}">
      <h1 class="grow-title">${words.map(esc).join('<br>')}</h1>
      <canvas class="grow-cells" aria-hidden="true"></canvas>
    </div>
    <p class="grow-hint" hidden>Click anywhere on the name to grow it again from that point.</p>`;
}

export function dateTag(iso) {
  return `<time datetime="${esc(iso)}">${esc(formatDate(iso))}</time>`;
}

// The interactive notebook sketch (assets/js/sketch-flick.js). A still drawing without JavaScript.
export function flickSketch(caption) {
  return `<figure class="sketch">
        <svg class="sketch-defs" width="0" height="0" aria-hidden="true" focusable="false">
          <defs>
            <filter id="rough" x="-10%" y="-10%" width="120%" height="120%">
              <feTurbulence id="roughNoise" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="noise"/>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
          </defs>
        </svg>
        <svg id="flick" viewBox="0 0 560 300" role="img" aria-label="Sketch of a ball on a line. Drag it and let go: it glides, then friction stops it.">
          <g class="sk-ink" filter="url(#rough)" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M24 214 H536"/>
            <path d="M40 214 l-12 14 M80 214 l-12 14 M120 214 l-12 14 M160 214 l-12 14 M200 214 l-12 14 M240 214 l-12 14 M280 214 l-12 14 M320 214 l-12 14 M360 214 l-12 14 M400 214 l-12 14 M440 214 l-12 14 M480 214 l-12 14 M520 214 l-12 14" stroke-width="1.5" opacity="0.45"/>
            <g id="ghosts" class="sk-ghost" stroke-width="2"></g>
            <circle id="ball" cx="150" cy="180" r="32"/>
            <g id="arrow" class="sk-arrow" stroke-width="3">
              <path id="arrowShaft" d="M150 120 H150"/>
              <path id="arrowHead" d="M150 120 l0 0"/>
            </g>
          </g>
          <text id="arrowLabel" x="150" y="104" class="note accent">velocity</text>
          <text x="30" y="262" class="note">friction, always pulling the other way</text>
          <text x="30" y="40" class="note">drag the ball, then let go</text>
        </svg>
        <figcaption>${esc(caption)}</figcaption>
      </figure>`;
}
