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

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 画对错对比卡（画板上方）
  function drawErrRow(id, y, wrong, right, colorW, colorR) {
    S.addText(id + '-x', -9.5, y, '✗ 错：' + wrong, { size: 13, color: RED });
    S.addText(id + '-c', 0.5, y, '✓ 正：' + right, { size: 13, color: GREEN });
    S.addSegment(id + '-line', [-9.5, y - 0.55], [9.5, y - 0.55], { color: '#eceff1', width: 1, dash: 0 });
  }

  var scene = {
    id: 's4',
    title: '四、易错梳理',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 3,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：易错点1~3（对错对比）
        narration: '本章易错点梳理，我们用"对错对比"的方式来辨析。易错点一：$\\sqrt{9}=\\pm3$——这是错的！$\\sqrt{9}$ 是算术平方根，只等于 $3$；$9$ 的平方根才是 $\\pm3$。易错点二：认为 $\\sqrt{-4}$ 存在——负数没有平方根，$\\sqrt{-4}$ 在实数范围内无意义。易错点三：$\\sqrt{a^2}=a$——这是错的！正确写法是 $\\sqrt{a^2}=|a|$，因为 $a$ 可能是负数。',
        enter: function (anim) {
          S.addText('e-hd', -1, 7.1, '本章易错点辨析（1~3）', { size: 16, color: INK, anchorX: 'middle' });
          S.addSegment('e-hd-line', [-9.5, 6.7], [9.5, 6.7], { color: '#90a4ae', width: 1.5, dash: 0 });
          S.addText('e-col-w', -9.5, 6.4, '✗ 错误写法', { size: 13, color: RED });
          S.addText('e-col-r', 0.5, 6.4, '✓ 正确写法', { size: 13, color: GREEN });
          S.addSegment('e-mid', [0, 6.7], [0, -7.5], { color: '#cfd8dc', width: 1, dash: 0 });

          drawErrRow('e1', 5.8,
            '$\\sqrt{9}=\\pm3$',
            '$\\sqrt{9}=3$（$9$的平方根才是$\\pm3$）');
          drawErrRow('e2', 4.5,
            '$\\sqrt{-4}=$ 某实数',
            '$\\sqrt{-4}$ 在实数中无意义');
          drawErrRow('e3', 3.2,
            '$\\sqrt{a^2}=a$',
            '$\\sqrt{a^2}=|a|$（$a$可为负数）');

          S.addText('e-note1', -9.5, 2.2, '说明：易错点1——混淆算术平方根与平方根', { size: 12, color: ORANGE });
          S.addText('e-note2', -9.5, 1.4, '说明：易错点2——平方根的被开方数必须 ≥ 0', { size: 12, color: ORANGE });
          S.addText('e-note3', -9.5, 0.6, '说明：易错点3——根号下平方必须加绝对值', { size: 12, color: ORANGE });

          P.renderCard(
            '<b>易错点1：$\\sqrt{9}$ 与9的平方根</b><br>' +
            '算术平方根 $\\sqrt{9}=3$（唯一、非负）<br>' +
            '$9$ 的平方根 $=\\pm3$（两个！）<br><br>' +
            '<b>易错点2：$\\sqrt{-4}$ 无意义</b><br>' +
            '负数在实数范围内没有平方根<br><br>' +
            '<b>易错点3：$\\sqrt{a^2}=|a|$</b><br>' +
            '若 $a=-5$，$\\sqrt{(-5)^2}=\\sqrt{25}=5=|-5|$'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：易错点4~6（含无理数认定陷阱）
        narration: '继续易错点四到六。易错点四：带根号的数就是无理数——错！$\\sqrt{16}=4$ 是整数，是有理数，带根号只是写法，结果能化成整数的就是有理数。易错点五：无限小数都是无理数——错！$0.333\\cdots=\\dfrac{1}{3}$ 是无限循环小数，是有理数；无理数只是无限"不循环"小数。易错点六：比较大小时把 $\\sqrt{7}$ 与 $2.7$ 方向写错——$2.7^2=7.29>7$，所以 $\\sqrt{7}<2.7$！',
        enter: function (anim) {
          S.addText('e2-hd', -1, 7.1, '本章易错点辨析（4~6）', { size: 16, color: INK, anchorX: 'middle' });
          S.addSegment('e2-hd-line', [-9.5, 6.7], [9.5, 6.7], { color: '#90a4ae', width: 1.5, dash: 0 });
          S.addText('e2-col-w', -9.5, 6.4, '✗ 错误认知', { size: 13, color: RED });
          S.addText('e2-col-r', 0.5, 6.4, '✓ 正确理解', { size: 13, color: GREEN });
          S.addSegment('e2-mid', [0, 6.7], [0, -7.5], { color: '#cfd8dc', width: 1, dash: 0 });

          drawErrRow('e4', 5.8,
            '带$\\sqrt{\\ }$的数都是无理数',
            '$\\sqrt{16}=4$，是整数（有理数）⚠');
          drawErrRow('e5', 4.5,
            '无限小数都是无理数',
            '$0.333\\cdots=\\dfrac{1}{3}$，循环→有理数');
          drawErrRow('e6', 3.2,
            '$\\sqrt{7}>2.7$（方向搞反）',
            '$2.7^2=7.29>7$，故$\\sqrt{7}<2.7$');

          S.addText('e2-n4', -9.5, 2.2, '关键：判断能否开出有理数结果，而非看有没有根号', { size: 12, color: ORANGE });
          S.addText('e2-n5', -9.5, 1.4, '关键：无理数 = 无限<b>不</b>循环小数，循环的是有理数', { size: 12, color: ORANGE });
          S.addText('e2-n6', -9.5, 0.6, '关键：比较大小先平方，再看哪个大', { size: 12, color: ORANGE });

          P.renderCard(
            '<b>易错点4：带根号≠无理数</b><br>' +
            '$\\sqrt{16}=4$（整数）；$\\sqrt{9}=3$（整数）<br>' +
            '只有开不尽的根才是无理数<br><br>' +
            '<b>易错点5：无限循环小数是有理数</b><br>' +
            '$0.121212\\cdots = \\dfrac{4}{33}$，是有理数<br><br>' +
            '<b>易错点6：$\\sqrt{7}$ 与 $2.7$ 的大小</b><br>' +
            '$2.7^2=7.29>7$ ∴ $\\sqrt{7}<2.7$'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：总结易错卡 + 记忆口诀
        narration: '最后来一张汇总记忆卡。本章六大易错点，有两个"不一定"：带根号的数不一定是无理数；无限小数不一定是无理数。有两个"必须"：$\\sqrt{-a}$ 必须保证 $a\\leq 0$ 才有意义（即被开方数非负）；$\\sqrt{a^2}$ 必须写成 $|a|$。有两个"方向"：平方根有两个（正负），算术平方根只有一个（非负）。把这六条记牢，本章的陷阱就无处遁形！',
        enter: function (anim) {
          P.renderCard(
            '<b>本章易错速记</b><br>' +
            '<table style="width:100%;font-size:13px;line-height:2;border-collapse:collapse">' +
            '<tr><td style="color:#c62828;width:30%">两个"不一定"</td>' +
            '<td>带$\\sqrt{}$不一定是无理数 · 无限小数不一定是无理数</td></tr>' +
            '<tr><td style="color:#e65100">两个"必须"</td>' +
            '<td>$\\sqrt{a}$被开方数必须$\\geq0$ · $\\sqrt{a^2}$必须写$|a|$</td></tr>' +
            '<tr><td style="color:#2e7d32">两个"方向"</td>' +
            '<td>平方根两个（$\\pm$）· 算术平方根一个（非负）</td></tr>' +
            '</table>',
            'warm'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
