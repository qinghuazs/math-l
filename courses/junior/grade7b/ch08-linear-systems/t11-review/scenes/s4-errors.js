// s4-errors.js  易错梳理（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  var scene = {
    id: 's4',
    title: '四、易错梳理',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '考试丢分最多的不是不会，而是易错点没防住。第一组易错：**漏乘**——方程两边同乘时，常数项也要乘！2x+y=3 两边乘 3，应得 6x+3y=9，右边的 3 常被漏乘；**减式忘变号**——两式相减时，减数的每一项都要变号：(3x+2y)−(3x−2y)=4y，不是 0！',
        enter: function () {
          S.actor('s4-title', 0, 7.0, '易错点一：漏乘与忘变号', { color: RED, size: 21, bold: true });
          S.actor('s4-e1-w', -4.8, 4.6, '✗ $2x+y=3$ 乘3 得 $6x+3y=3$', { color: RED, size: 15, css: 'background:#ffebee;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e1-r', 4.8, 4.6, '✓ 得 $6x+3y=9$（常数也乘）', { color: GREEN, size: 15, css: 'background:#e8f5e9;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e2-w', -4.8, 2.4, '✗ 相减得 $3x+2y-3x-2y=0$', { color: RED, size: 15, css: 'background:#ffebee;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e2-r', 4.8, 2.4, '✓ 减式每项变号：$4y$', { color: GREEN, size: 15, css: 'background:#e8f5e9;border-radius:8px;padding:6px 12px;' });
          P.renderCard('<b>漏乘</b>：两边同乘时常数项别漏。<br><b>忘变号</b>：减去整个式子，每一项都变号。');
        },
      },
      {
        narration: '第二组易错：**解的书写**——方程组的解是一对值，必须用大括号联立写出 x=2、y=1，只写一个数不完整；**检验只代一个方程**——方程组的解要同时满足两个方程，检验也必须两个都代！',
        enter: function () {
          S.actor('s4-title2', 0, 7.0, '易错点二：书写与检验', { color: RED, size: 21, bold: true });
          S.actor('s4-e3-w', -4.8, 4.6, '✗ 只写 "$x=2$"', { color: RED, size: 15, css: 'background:#ffebee;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e3-r', 4.8, 4.6, '✓ 大括号联立 $x=2$ 且 $y=1$', { color: GREEN, size: 15, css: 'background:#e8f5e9;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e4-w', -4.8, 2.4, '✗ 只代回方程①检验', { color: RED, size: 15, css: 'background:#ffebee;border-radius:8px;padding:6px 12px;' });
          S.actor('s4-e4-r', 4.8, 2.4, '✓ 两个方程都要代', { color: GREEN, size: 15, css: 'background:#e8f5e9;border-radius:8px;padding:6px 12px;' });
          P.renderCard('解 = <b>一对</b>值（大括号联立）；检验 = <b>两个方程都代</b>。');
        },
      },
      {
        narration: '第三组易错：**应用题不检验合理性**——解出负的人数、超过总量的时间，说明列错了方程却照样作答，这是最可惜的丢分。把这五个易错点记牢，本章就稳了。',
        enter: function () {
          S.actor('s4-title3', 0, 6.8, '易错点三：应用题忘查合理性', { color: RED, size: 21, bold: true });
          P.renderTable({
            head: ['易错点', '防错口诀'],
            rows: [
              ['两边同乘漏常数', '乘遍每一项'],
              ['减式忘变号', '减号进括号，全员变号'],
              ['解写不完整', '一对值，大括号'],
              ['检验只代一式', '两个方程都要代'],
              ['忘查合理性', '人数路程要非负'],
            ],
          });
          P.renderCard('五大易错 = 五句口诀，考前默背一遍。', 'warm');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
