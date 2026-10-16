/**
 * Generates and downloads a 100% self-contained single-file HTML5 REDA package
 * that can run completely offline on any browser, Smart Board, tablet or USB stick.
 */
export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <title>Carrera Matemática A vs B - REDA Hamilton Cabrera</title>
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      -webkit-tap-highlight-color: transparent;
    }
    html, body {
      width: 100%;
      height: 100%;
      height: 100dvh;
      overflow: hidden;
      background: #f4f7fb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #1e293b;
      touch-action: none;
    }
    #app {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }
    /* Modes */
    .mode-f2f {
      flex-direction: column !important;
    }
    .mode-f2f .player-p1 {
      transform: rotate(180deg);
    }
    .mode-f2f .player-p2 {
      transform: rotate(0deg);
    }
    .mode-f2f .game-arena {
      flex-direction: column;
    }
    .mode-sbs .game-arena {
      flex-direction: row;
    }
    .mode-sbs .player-p1, .mode-sbs .player-p2 {
      transform: rotate(0deg) !important;
    }
    .mode-solo .player-zone {
      max-width: 650px;
      margin: 0 auto;
      border: 1px solid #bae6fd;
      border-radius: 20px;
    }
    .mode-solo #zone-p2 {
      display: none !important;
    }
    .mode-solo #lane-p2 {
      display: none !important;
    }
    .game-arena {
      flex: 1;
      display: flex;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    .player-zone {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;
      position: relative;
      touch-action: none;
      transition: background 0.3s ease;
      min-height: 0;
    }
    .zone-p1 {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-bottom: 2px solid #bae6fd;
      color: #0369a1;
    }
    .zone-p2 {
      background: linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%);
      border-top: 2px solid #fecdd3;
      color: #be123c;
    }
    .mode-sbs .zone-p1 {
      border-bottom: none;
      border-right: 2px solid #bae6fd;
    }
    .mode-sbs .zone-p2 {
      border-top: none;
      border-left: 2px solid #fecdd3;
    }
    /* Central Track */
    .track-bar {
      height: 60px;
      background: #ffffff;
      border-top: 1px solid #e2e8f0;
      border-bottom: 1px solid #e2e8f0;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
      color: #1e293b;
      display: flex;
      align-items: center;
      padding: 0 10px;
      gap: 8px;
      z-index: 20;
      flex-shrink: 0;
    }
    .track-lanes {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 4px 8px;
      position: relative;
    }
    .lane {
      position: relative;
      height: 20px;
      display: flex;
      align-items: center;
      background: #f1f5f9;
      border-radius: 6px;
      padding-right: 26px;
    }
    .lane-finish {
      position: absolute;
      right: 2px;
      font-size: 13px;
    }
    .lane-avatar {
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      height: 20px;
      display: flex;
      align-items: center;
      font-size: 17px;
      transition: left 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      animation: racerBob 0.7s infinite ease-in-out;
    }
    @keyframes racerBob {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-2px) rotate(4deg); }
      75% { transform: translateY(1px) rotate(-4deg); }
    }
    /* Player Card Game Headers with High Contrast #2563eb & #dc2626 */
    .player-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding: 6px 12px;
      border-radius: 16px;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .zone-p1 .player-header {
      background: #2563eb;
      color: #ffffff;
      border: 2px solid #60a5fa;
    }
    .zone-p2 .player-header {
      background: #dc2626;
      color: #ffffff;
      border: 2px solid #f87171;
    }
    .team-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 900;
      font-size: clamp(14px, 2.5vw, 20px);
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .team-score {
      font-size: clamp(16px, 3.2vw, 24px);
      font-weight: 900;
      padding: 2px 12px;
      border-radius: 12px;
      background: #ffffff;
      border: 2px solid #ffffff;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
      font-variant-numeric: tabular-nums;
    }
    .zone-p1 .team-score {
      color: #2563eb;
    }
    .zone-p2 .team-score {
      color: #dc2626;
    }
    .equation-card {
      background: #ffffff;
      border-radius: 18px;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      margin-bottom: 8px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      color: #0f172a;
      flex-shrink: 0;
    }
    .equation-text {
      font-size: clamp(26px, 5.5vw, 48px);
      font-weight: 900;
      letter-spacing: 1px;
    }
    /* Brilliant Glowing Answer Box */
    .answer-display {
      min-width: 80px;
      height: clamp(44px, 7vw, 62px);
      background: #ffffff;
      border: 3px dashed #f59e0b;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: clamp(26px, 6vw, 44px);
      font-weight: 900;
      color: #f59e0b;
      padding: 0 12px;
      box-shadow: 0 0 20px rgba(255,255,255,1), 0 4px 12px rgba(245, 158, 11, 0.25);
      animation: pulseAns 1.8s infinite ease-in-out;
    }
    @keyframes pulseAns {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.03); }
    }
    .answer-display.has-val {
      border-style: solid;
      background: #ffffff;
      color: #0f172a;
    }
    .zone-p1 .answer-display.has-val {
      border-color: #2563eb;
      color: #1e3a8a;
      box-shadow: 0 0 25px rgba(37,99,235,0.4);
    }
    .zone-p2 .answer-display.has-val {
      border-color: #dc2626;
      color: #881337;
      box-shadow: 0 0 25px rgba(220,38,38,0.4);
    }
    /* Keypad in tactile soft pastel */
    .keypad-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      flex: 1;
      max-height: 290px;
      touch-action: none;
    }
    .key-btn {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-bottom: 4px solid #cbd5e1;
      border-radius: 12px;
      color: #0f172a;
      font-size: clamp(20px, 4vw, 32px);
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      touch-action: none;
      transition: transform 0.08s, background 0.08s;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }
    .key-btn:active {
      transform: translateY(2px);
      border-bottom-width: 2px;
      background: #f1f5f9;
    }
    .key-clear {
      background: #fef3c7;
      border-color: #fde68a;
      border-bottom-color: #fcd34d;
      color: #78350f;
      font-size: clamp(16px, 3.2vw, 22px);
    }
    .key-ok {
      background: #10b981;
      border-color: #059669;
      border-bottom-color: #047857;
      color: #ffffff;
      font-size: clamp(16px, 3.2vw, 24px);
      font-weight: 900;
    }
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 16px;
    }
    .modal-box {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      max-width: 520px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      padding: 22px;
      box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
      color: #0f172a;
    }
    .stat-row {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 10px 14px;
      margin-bottom: 8px;
    }
    .btn-action {
      background: #10b981;
      color: #fff;
      border: none;
      padding: 12px 20px;
      border-radius: 12px;
      font-weight: 800;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .flash-win { animation: flashG 0.4s ease-out; }
    .flash-err { animation: flashR 0.4s ease-out; }
    @keyframes flashG { 0% { background: rgba(52, 211, 153, 0.4); } 100% { background: transparent; } }
    @keyframes flashR { 0% { background: rgba(251, 113, 133, 0.4); } 100% { background: transparent; } }
    .countdown-layer {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 120;
      font-size: clamp(60px, 15vw, 140px);
      font-weight: 900;
      color: #f59e0b;
      text-shadow: 0 4px 20px rgba(245, 158, 11, 0.4);
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="app" class="mode-f2f">
    <div id="countdown" class="countdown-layer" style="display:none;">3</div>

    <!-- ARENA -->
    <div class="game-arena">
      <!-- Player 1 (Blue) -->
      <div id="zone-p1" class="player-zone zone-p1 player-p1">
        <div class="player-header">
          <div class="team-badge"><span id="p1-av">🚀</span> <span id="p1-title">Equipo Azul</span></div>
          <div class="team-score" id="p1-sc">0 / 10</div>
        </div>
        <div class="equation-card">
          <div class="equation-text" id="p1-eq">7 + 5</div>
          <div class="equation-text" id="p1-sym">=</div>
          <div class="answer-display" id="p1-ans">?</div>
        </div>
        <div class="keypad-grid" id="p1-keypad"></div>
      </div>

      <!-- Player 2 (Red) -->
      <div id="zone-p2" class="player-zone zone-p2 player-p2">
        <div class="player-header">
          <div class="team-badge"><span id="p2-av">🏎️</span> <span id="p2-title">Equipo Rojo</span></div>
          <div class="team-score" id="p2-sc">0 / 10</div>
        </div>
        <div class="equation-card">
          <div class="equation-text" id="p2-eq">8 + 4</div>
          <div class="equation-text" id="p2-sym">=</div>
          <div class="answer-display" id="p2-ans">?</div>
        </div>
        <div class="keypad-grid" id="p2-keypad"></div>
      </div>
    </div>

    <!-- TRACK BAR -->
    <div class="track-bar">
      <button class="key-btn" style="width:42px;height:38px;font-size:13px;" id="btn-mode" title="Cambiar Orientación">🔄 180°</button>
      <button class="key-btn" style="width:72px;height:38px;font-size:12px;font-weight:900;" id="btn-type" title="Cambiar entre Duelo y Entrenamiento">⚔️ Duelo</button>
      <button class="key-btn" style="width:38px;height:38px;font-size:15px;" id="btn-help" title="¿Cómo Jugar?">📖</button>
      <div class="track-lanes">
        <div class="lane" id="lane-p1">
          <div class="lane-avatar" id="track-av1" style="left: 0%;">🚀</div>
          <div class="lane-finish">🏁</div>
        </div>
        <div class="lane" id="lane-p2">
          <div class="lane-avatar" id="track-av2" style="left: 0%;">🏎️</div>
          <div class="lane-finish">🏁</div>
        </div>
      </div>
      <div id="stopwatch-display" style="display:none;font-family:monospace;font-size:13px;font-weight:900;color:#fde047;padding:2px 8px;background:rgba(0,0,0,0.5);border-radius:8px;">00:00.0</div>
      <button class="key-btn" style="width:38px;height:38px;font-size:15px;" id="btn-full" title="Pantalla Completa">⛶</button>
      <button class="key-btn" style="width:38px;height:38px;font-size:15px;" id="btn-snd" title="Audio">🔊</button>
      <button class="key-btn" style="width:38px;height:38px;font-size:15px;" id="btn-info" title="Créditos REDA">ℹ️</button>
    </div>

    <!-- HOW TO PLAY MODAL -->
    <div id="modal-help" class="modal-backdrop" style="display:none;">
      <div class="modal-box">
        <h2 style="font-size:20px;margin-bottom:8px;color:#fde047;font-weight:900;">📖 ¿Cómo Jugar a Carrera Matemática?</h2>
        <div style="font-size:13px;line-height:1.6;color:#cbd5e1;space-y:8px;">
          <p><strong>1. Modalidades:</strong> Elige <em>⚔️ Duelo (2 Jugadores)</em> para competir cara a cara o <em>⏱️ Entrenamiento (1 Jugador)</em> contra cronómetro.</p>
          <p style="margin-top:6px;"><strong>2. Modos de Pantalla:</strong> Usa <em>Mesa (180°)</em> para jugar frente a frente en tableta, o <em>Pizarra (0°)</em> para smartboards lado a lado.</p>
          <p style="margin-top:6px;"><strong>3. Operaciones:</strong> Sumas, restas, multiplicaciones, divisiones, potencias (x²), raíces (√) y ecuaciones de 1er grado (x).</p>
          <p style="margin-top:6px;"><strong>4. Multitouch:</strong> Ambos contrincantes pueden teclear a la vez sin trabar el cristal.</p>
        </div>
        <button class="btn-action" style="width:100%;margin-top:16px;background:#38bdf8;color:#0f172a;" onclick="document.getElementById('modal-help').style.display='none'">¡Entendido!</button>
      </div>
    </div>

    <!-- DETAILED STATS MODAL -->
    <div id="modal-victory" class="modal-backdrop" style="display:none;">
      <div class="modal-box">
        <div style="text-align:center;margin-bottom:12px;">
          <div style="font-size:42px;" id="vic-av">🏆</div>
          <div style="font-size:12px;font-weight:900;color:#fde047;text-transform:uppercase;margin-top:4px;" id="vic-sub">Carrera Finalizada</div>
          <h2 style="font-size:22px;font-weight:900;color:#fff;" id="vic-winner">¡Ganador!</h2>
        </div>

        <div class="stat-row">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#cbd5e1;margin-bottom:6px;">
            <span>⚡ Tiempo Promedio de Respuesta</span>
            <span style="color:#fde047;" id="vic-faster">Más rápido: Azul</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;text-align:center;" id="stats-time-row">
            <div>
              <div style="font-size:20px;font-weight:900;color:#38bdf8;font-family:monospace;" id="st-p1-time">2.1s</div>
              <div style="font-size:10px;color:#94a3b8;" id="lbl-p1-time">Azul / respuesta</div>
            </div>
            <div id="col-p2-time">
              <div style="font-size:20px;font-weight:900;color:#f87171;font-family:monospace;" id="st-p2-time">2.8s</div>
              <div style="font-size:10px;color:#94a3b8;">Rojo / respuesta</div>
            </div>
          </div>
        </div>

        <div class="stat-row">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#cbd5e1;margin-bottom:6px;">
            <span>🎯 Precisión (Aciertos vs Fallos)</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;text-align:center;" id="stats-acc-row">
            <div>
              <div style="font-size:20px;font-weight:900;color:#38bdf8;font-family:monospace;" id="st-p1-acc">90%</div>
              <div style="font-size:11px;color:#cbd5e1;" id="st-p1-counts">10 ✓ · 1 ✕</div>
            </div>
            <div id="col-p2-acc">
              <div style="font-size:20px;font-weight:900;color:#f87171;font-family:monospace;" id="st-p2-acc">75%</div>
              <div style="font-size:11px;color:#cbd5e1;" id="st-p2-counts">9 ✓ · 3 ✕</div>
            </div>
          </div>
        </div>

        <div class="stat-row">
          <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#cbd5e1;margin-bottom:6px;">
            <span>🔥 Historial de Racha Máxima</span>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;text-align:center;" id="stats-streak-row">
            <div>
              <div style="font-size:20px;font-weight:900;color:#38bdf8;font-family:monospace;" id="st-p1-streak">🔥 6</div>
              <div style="font-size:10px;color:#94a3b8;">aciertos seguidos</div>
            </div>
            <div id="col-p2-streak">
              <div style="font-size:20px;font-weight:900;color:#f87171;font-family:monospace;" id="st-p2-streak">🔥 4</div>
              <div style="font-size:10px;color:#94a3b8;">aciertos seguidos</div>
            </div>
          </div>
        </div>

        <button class="btn-action" style="width:100%;background:#10b981;margin-top:12px;" onclick="restartMatch()">¡JUGAR REVANCHA / VOLVER A ENTRENAR!</button>
      </div>
    </div>

    <!-- CREDITS MODAL -->
    <div id="modal-info" class="modal-backdrop" style="display:none;">
      <div class="modal-box">
        <h2 style="font-size:20px;margin-bottom:10px;color:#38bdf8;font-weight:900;">Matemáticas A vs B (Carrera Dual)</h2>
        <p style="font-size:13px;color:#cbd5e1;line-height:1.6;margin-bottom:14px;">
          Recurso Educativo Digital Abierto (REDA) diseñado para estimular la agilidad mental, el cálculo reflexivo y la interacción colaborativa en pizarras y tabletas.
        </p>
        <div style="background:#1e293b;padding:12px;border-radius:10px;font-size:13px;line-height:1.8;margin-bottom:16px;">
          <div><strong>Autor:</strong> Hamilton Cabrera</div>
          <div><strong>Correo:</strong> soymitos@gmail.com</div>
          <div><strong>Institución / Proyecto:</strong> RecursosHMCB</div>
          <div><strong>Licencia:</strong> REDA - Distribución Libre y Gratuita</div>
        </div>
        <button class="btn-action" style="width:100%;" onclick="document.getElementById('modal-info').style.display='none'">Cerrar Información</button>
      </div>
    </div>
  </div>

  <script>
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    let actx = null;
    let soundOn = true;
    function playTone(freq, dur, type='sine') {
      if(!soundOn) return;
      try {
        if(!actx) actx = new AudioCtx();
        if(actx.state === 'suspended') actx.resume();
        const osc = actx.createOscillator();
        const g = actx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, actx.currentTime);
        g.gain.setValueAtTime(0.15, actx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + dur);
        osc.connect(g);
        g.connect(actx.destination);
        osc.start();
        osc.stop(actx.currentTime + dur);
      } catch(e) {}
    }

    const state = {
      gameType: 'duel', // 'duel' or 'solo'
      target: 10,
      mode: 'face-to-face',
      p1: { score: 0, buf: '', prob: null, av: '🚀', name: 'Equipo Azul', correct: 0, wrong: 0, streak: 0, maxStreak: 0, times: [], probStart: Date.now() },
      p2: { score: 0, buf: '', prob: null, av: '🏎️', name: 'Equipo Rojo', correct: 0, wrong: 0, streak: 0, maxStreak: 0, times: [], probStart: Date.now() },
      running: true,
      startTime: Date.now()
    };

    setInterval(() => {
      if(state.gameType === 'solo' && state.running) {
        const sec = ((Date.now() - state.startTime)/1000).toFixed(1);
        document.getElementById('stopwatch-display').innerText = '⏱️ ' + sec + 's';
      }
    }, 100);

    function nextProb() {
      const types = ['add', 'sub', 'mul', 'power', 'root', 'equation'];
      const t = types[Math.floor(Math.random() * types.length)];
      if (t === 'add') {
        const a = Math.floor(Math.random()*9)+1;
        const b = Math.floor(Math.random()*9)+1;
        return { exp: a + ' + ' + b, ans: a + b, sym: '=' };
      } else if (t === 'sub') {
        const a = Math.floor(Math.random()*10)+5;
        const b = Math.floor(Math.random()*a);
        return { exp: a + ' − ' + b, ans: a - b, sym: '=' };
      } else if (t === 'mul') {
        const a = Math.floor(Math.random()*6)+2;
        const b = Math.floor(Math.random()*6)+2;
        return { exp: a + ' × ' + b, ans: a * b, sym: '=' };
      } else if (t === 'power') {
        const bases = [2, 3, 4, 5, 10];
        const b = bases[Math.floor(Math.random() * bases.length)];
        return { exp: b + '²', ans: b * b, sym: '=' };
      } else if (t === 'root') {
        const roots = [2, 3, 4, 5, 6, 7, 8, 9, 10];
        const r = roots[Math.floor(Math.random() * roots.length)];
        return { exp: '√' + (r * r), ans: r, sym: '=' };
      } else {
        const x = Math.floor(Math.random()*8)+2;
        const b = Math.floor(Math.random()*6)+1;
        return { exp: 'x + ' + b + ' = ' + (x + b), ans: x, sym: 'x =' };
      }
    }

    function updateUI() {
      document.getElementById('p1-sc').innerText = state.p1.score + ' / ' + state.target;
      document.getElementById('p2-sc').innerText = state.p2.score + ' / ' + state.target;
      document.getElementById('p1-eq').innerText = state.p1.prob.exp;
      document.getElementById('p2-eq').innerText = state.p2.prob.exp;
      document.getElementById('p1-sym').innerText = state.p1.prob.sym;
      document.getElementById('p2-sym').innerText = state.p2.prob.sym;
      const el1 = document.getElementById('p1-ans');
      const el2 = document.getElementById('p2-ans');
      el1.innerText = state.p1.buf || '?';
      el2.innerText = state.p2.buf || '?';
      el1.className = 'answer-display ' + (state.p1.buf ? 'has-val' : '');
      el2.className = 'answer-display ' + (state.p2.buf ? 'has-val' : '');
      document.getElementById('track-av1').style.left = ((state.p1.score / state.target) * 90) + '%';
      document.getElementById('track-av2').style.left = ((state.p2.score / state.target) * 90) + '%';
    }

    function setupKeypad(id, onInput) {
      const el = document.getElementById(id);
      el.innerHTML = '';
      const keys = ['1','2','3','4','5','6','7','8','9','✕','0','✓'];
      keys.forEach(k => {
        const btn = document.createElement('button');
        btn.innerText = k;
        btn.className = 'key-btn ' + (k === '✕' ? 'key-clear' : k === '✓' ? 'key-ok' : '');
        btn.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          onInput(k);
        });
        el.appendChild(btn);
      });
    }

    function showVictory(winnerKey) {
      state.running = false;
      const w = state[winnerKey];
      const p1Avg = state.p1.times.length ? (state.p1.times.reduce((a,b)=>a+b,0)/state.p1.times.length).toFixed(1) : '0.0';
      const p2Avg = state.p2.times.length ? (state.p2.times.reduce((a,b)=>a+b,0)/state.p2.times.length).toFixed(1) : '0.0';
      const p1Tot = state.p1.correct + state.p1.wrong;
      const p2Tot = state.p2.correct + state.p2.wrong;
      const p1Acc = p1Tot ? Math.round((state.p1.correct/p1Tot)*100) : 100;
      const p2Acc = p2Tot ? Math.round((state.p2.correct/p2Tot)*100) : 100;

      document.getElementById('vic-av').innerText = w.av;
      document.getElementById('vic-sub').innerText = state.gameType === 'solo' ? 'Entrenamiento Completado' : 'Carrera Finalizada';
      document.getElementById('vic-winner').innerText = state.gameType === 'solo' ? '¡Excelente Entrenamiento!' : '¡' + w.name + ' ha ganado!';

      if (state.gameType === 'solo') {
        document.getElementById('vic-faster').innerText = '⏱️ Tiempo: ' + ((Date.now() - state.startTime)/1000).toFixed(1) + 's';
        document.getElementById('col-p2-time').style.display = 'none';
        document.getElementById('col-p2-acc').style.display = 'none';
        document.getElementById('col-p2-streak').style.display = 'none';
        document.getElementById('lbl-p1-time').innerText = 'Promedio por operación';
      } else {
        document.getElementById('vic-faster').innerText = parseFloat(p1Avg) <= parseFloat(p2Avg) ? 'Más veloz: Azul ⚡' : 'Más veloz: Rojo ⚡';
        document.getElementById('col-p2-time').style.display = 'block';
        document.getElementById('col-p2-acc').style.display = 'block';
        document.getElementById('col-p2-streak').style.display = 'block';
        document.getElementById('lbl-p1-time').innerText = 'Azul / respuesta';
      }

      document.getElementById('st-p1-time').innerText = p1Avg + 's';
      document.getElementById('st-p2-time').innerText = p2Avg + 's';
      document.getElementById('st-p1-acc').innerText = p1Acc + '%';
      document.getElementById('st-p2-acc').innerText = p2Acc + '%';
      document.getElementById('st-p1-counts').innerText = state.p1.correct + ' ✓ · ' + state.p1.wrong + ' ✕';
      document.getElementById('st-p2-counts').innerText = state.p2.correct + ' ✓ · ' + state.p2.wrong + ' ✕';
      document.getElementById('st-p1-streak').innerText = '🔥 ' + state.p1.maxStreak;
      document.getElementById('st-p2-streak').innerText = '🔥 ' + state.p2.maxStreak;

      document.getElementById('modal-victory').style.display = 'flex';
    }

    function restartMatch() {
      state.p1.score = 0; state.p1.buf = ''; state.p1.correct = 0; state.p1.wrong = 0; state.p1.streak = 0; state.p1.maxStreak = 0; state.p1.times = [];
      state.p2.score = 0; state.p2.buf = ''; state.p2.correct = 0; state.p2.wrong = 0; state.p2.streak = 0; state.p2.maxStreak = 0; state.p2.times = [];
      state.p1.prob = nextProb(); state.p1.probStart = Date.now();
      state.p2.prob = nextProb(); state.p2.probStart = Date.now();
      state.startTime = Date.now();
      state.running = true;
      document.getElementById('modal-victory').style.display = 'none';
      updateUI();
    }

    function handleInput(playerKey, k) {
      if(!state.running) return;
      playTone(550, 0.05);
      const p = state[playerKey];
      const zoneEl = document.getElementById('zone-' + playerKey);
      if (k === '✕') {
        p.buf = '';
      } else if (k === '✓') {
        if (!p.buf) return;
        const elapsed = (Date.now() - p.probStart) / 1000;
        p.times.push(elapsed);
        const entered = parseInt(p.buf, 10);
        if (entered === p.prob.ans) {
          playTone(880, 0.2, 'triangle');
          zoneEl.classList.remove('flash-win');
          void zoneEl.offsetWidth;
          zoneEl.classList.add('flash-win');
          p.score++;
          p.correct++;
          p.streak++;
          p.maxStreak = Math.max(p.maxStreak, p.streak);
          p.buf = '';
          p.prob = nextProb();
          p.probStart = Date.now();
          if (p.score >= state.target) {
            showVictory(playerKey);
          }
        } else {
          playTone(180, 0.25, 'sawtooth');
          zoneEl.classList.remove('flash-err');
          void zoneEl.offsetWidth;
          zoneEl.classList.add('flash-err');
          p.wrong++;
          p.streak = 0;
          p.buf = '';
          p.probStart = Date.now();
        }
      } else {
        if (p.buf.length < 5) p.buf += k;
      }
      updateUI();
    }

    document.getElementById('btn-type').addEventListener('click', () => {
      const app = document.getElementById('app');
      const btnMode = document.getElementById('btn-mode');
      const sw = document.getElementById('stopwatch-display');
      if (state.gameType === 'duel') {
        state.gameType = 'solo';
        document.getElementById('btn-type').innerText = '⏱️ Solo';
        app.className = 'mode-solo';
        btnMode.style.display = 'none';
        sw.style.display = 'block';
      } else {
        state.gameType = 'duel';
        document.getElementById('btn-type').innerText = '⚔️ Duelo';
        app.className = state.mode === 'face-to-face' ? 'mode-f2f' : 'mode-sbs';
        btnMode.style.display = 'block';
        sw.style.display = 'none';
      }
      restartMatch();
    });

    document.getElementById('btn-mode').addEventListener('click', () => {
      const app = document.getElementById('app');
      if (state.mode === 'face-to-face') {
        state.mode = 'side-by-side';
        app.className = 'mode-sbs';
        document.getElementById('btn-mode').innerText = '🖥️ 0°';
      } else {
        state.mode = 'face-to-face';
        app.className = 'mode-f2f';
        document.getElementById('btn-mode').innerText = '🔄 180°';
      }
    });

    document.getElementById('btn-help').addEventListener('click', () => {
      document.getElementById('modal-help').style.display = 'flex';
    });

    document.getElementById('btn-full').addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });

    document.getElementById('btn-snd').addEventListener('click', () => {
      soundOn = !soundOn;
      document.getElementById('btn-snd').innerText = soundOn ? '🔊' : '🔇';
    });

    document.getElementById('btn-info').addEventListener('click', () => {
      document.getElementById('modal-info').style.display = 'flex';
    });

    state.p1.prob = nextProb();
    state.p2.prob = nextProb();
    setupKeypad('p1-keypad', (k) => handleInput('p1', k));
    setupKeypad('p2-keypad', (k) => handleInput('p2', k));
    updateUI();
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtml() {
  const htmlContent = generateStandaloneHtml();
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Carrera_Matematica_AvsB_REDA.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
