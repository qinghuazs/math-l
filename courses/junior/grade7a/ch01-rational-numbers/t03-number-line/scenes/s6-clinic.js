// s6-clinic.js  六、病轴门诊与小结（4步）
// 数学说明：
//   步1：病轴1——无箭头（两端截断）→ 诊断+药方
//   步2：病轴2——无原点（不标0/O）→ 诊断+药方
//   步3：病轴3——刻度不均匀（手动指定不均匀x坐标）→ 诊断+药方
//   步4：第四问（数轴只能标整数？）+ 小结填空卡 + 悬念句
//   每步 enter 开头 S.remove 清上一步所有病轴元素
//   UNIT=1.5，AXIS_Y=0，bbox [-9, 7, 9, -5]，axis:false，keepAspect:false
(function (CW) {
  'use strict';
  var S, P;
  var INK   = '#455a64';
  var WARM  = '#e64a19';
  var COOL  = '#1565c0';
  var TEAL  = '#00796b';
  var RED   = '#c62828';
  var GREEN = '#2e7d32';
  var GRAY  = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var UNIT   = 1.5;
  var AXIS_Y = 0;
  function tx(n) { return n * UNIT; }

  // ─── 病轴A：无箭头 ──────────────────────────────────────
  var IDS_A = [];
  function drawSickA() {
    IDS_A = [];
    var id;
    id = 's6-sA-main';
    S.addSegment(id, [-6, AXIS_Y], [6, AXIS_Y], { color: INK, width: 3, dash: 0 });
    IDS_A.push(id);
    // 两端截断（无箭头）
    id = 's6-sA-cap-r';
    S.addSegment(id, [6, AXIS_Y - 0.25], [6, AXIS_Y + 0.25], { color: INK, width: 2.5, dash: 0 });
    IDS_A.push(id);
    id = 's6-sA-cap-l';
    S.addSegment(id, [-6, AXIS_Y - 0.25], [-6, AXIS_Y + 0.25], { color: INK, width: 2.5, dash: 0 });
    IDS_A.push(id);
    // 刻度 -3~3
    var n;
    for (n = -3; n <= 3; n++) {
      id = 's6-sA-tick-' + (n + 3);
      S.addSegment(id, [tx(n), AXIS_Y - 0.2], [tx(n), AXIS_Y + 0.2], { color: INK, width: 2, dash: 0 });
      IDS_A.push(id);
      id = 's6-sA-lab-' + (n + 3);
      S.addText(id, tx(n) - 0.12, AXIS_Y - 0.52, '' + n, { color: INK, size: 14 });
      IDS_A.push(id);
    }
    id = 's6-sA-O';
    S.addText(id, tx(0) + 0.06, AXIS_Y + 0.38, 'O', { color: INK, size: 14 });
    IDS_A.push(id);
    // 病因标注
    id = 's6-sA-diag';
    S.addText(id, -2, AXIS_Y + 2.5, '病因：两端无箭头，不知正方向！', { color: RED, size: 15 });
    IDS_A.push(id);
    id = 's6-sA-rx';
    S.addText(id, -2, AXIS_Y + 1.5, '药方：在正数方向（右端）画箭头 →', { color: GREEN, size: 14 });
    IDS_A.push(id);
  }
  function removeSickA() {
    var i;
    for (i = 0; i < IDS_A.length; i++) { S.remove(IDS_A[i]); }
    IDS_A = [];
  }

  // ─── 病轴B：无原点 ──────────────────────────────────────
  var IDS_B = [];
  function drawSickB() {
    IDS_B = [];
    var id;
    id = 's6-sB-main';
    S.addSegment(id, [-6.5, AXIS_Y], [6.5, AXIS_Y], { color: INK, width: 3, dash: 0 });
    IDS_B.push(id);
    id = 's6-sB-arr1';
    S.addSegment(id, [6.3, AXIS_Y + 0.18], [6.6, AXIS_Y], { color: INK, width: 2.5, dash: 0 });
    IDS_B.push(id);
    id = 's6-sB-arr2';
    S.addSegment(id, [6.3, AXIS_Y - 0.18], [6.6, AXIS_Y], { color: INK, width: 2.5, dash: 0 });
    IDS_B.push(id);
    // 刻度 -3~3，故意不标0也不标O（其他标正常数字，但0那格留空）
    var n;
    for (n = -3; n <= 3; n++) {
      id = 's6-sB-tick-' + (n + 3);
      S.addSegment(id, [tx(n), AXIS_Y - 0.2], [tx(n), AXIS_Y + 0.2], { color: INK, width: 2, dash: 0 });
      IDS_B.push(id);
      if (n !== 0) {
        id = 's6-sB-lab-' + (n + 3);
        S.addText(id, tx(n) - 0.12, AXIS_Y - 0.52, '' + n, { color: INK, size: 14 });
        IDS_B.push(id);
      }
      // n=0：故意留空（不标0也不标O）
    }
    id = 's6-sB-diag';
    S.addText(id, -2.5, AXIS_Y + 2.5, '病因：缺原点，不知"0"在哪里！', { color: RED, size: 15 });
    IDS_B.push(id);
    id = 's6-sB-rx';
    S.addText(id, -2.5, AXIS_Y + 1.5, '药方：找对应 0 的刻度，标上 O 和"0"', { color: GREEN, size: 14 });
    IDS_B.push(id);
  }
  function removeSickB() {
    var i;
    for (i = 0; i < IDS_B.length; i++) { S.remove(IDS_B[i]); }
    IDS_B = [];
  }

  // ─── 病轴C：刻度不均 ────────────────────────────────────
  var IDS_C = [];
  function drawSickC() {
    IDS_C = [];
    var id;
    id = 's6-sC-main';
    S.addSegment(id, [-6.5, AXIS_Y], [6.5, AXIS_Y], { color: INK, width: 3, dash: 0 });
    IDS_C.push(id);
    id = 's6-sC-arr1';
    S.addSegment(id, [6.3, AXIS_Y + 0.18], [6.6, AXIS_Y], { color: INK, width: 2.5, dash: 0 });
    IDS_C.push(id);
    id = 's6-sC-arr2';
    S.addSegment(id, [6.3, AXIS_Y - 0.18], [6.6, AXIS_Y], { color: INK, width: 2.5, dash: 0 });
    IDS_C.push(id);
    // 原点
    id = 's6-sC-tick0';
    S.addSegment(id, [0, AXIS_Y - 0.2], [0, AXIS_Y + 0.2], { color: INK, width: 2, dash: 0 });
    IDS_C.push(id);
    id = 's6-sC-lab0';
    S.addText(id, -0.1, AXIS_Y - 0.52, '0', { color: INK, size: 14 });
    IDS_C.push(id);
    id = 's6-sC-O';
    S.addText(id, 0.06, AXIS_Y + 0.38, 'O', { color: INK, size: 14 });
    IDS_C.push(id);
    // 不均匀刻度（x坐标手动设定）
    // 0到1：1.0画面单位；1到2：3.0画面单位；2到3：0.8画面单位
    // 0到-1：1.5画面单位；-1到-2：2.0画面单位；-2到-3：0.7画面单位
    var pts = [
      { x: 1.0, lab: '1' },
      { x: 4.0, lab: '2' },
      { x: 4.8, lab: '3' },
      { x: -1.5, lab: '-1' },
      { x: -3.5, lab: '-2' },
      { x: -4.2, lab: '-3' }
    ];
    var i;
    for (i = 0; i < pts.length; i++) {
      id = 's6-sC-tick-' + i;
      S.addSegment(id, [pts[i].x, AXIS_Y - 0.2], [pts[i].x, AXIS_Y + 0.2],
        { color: INK, width: 2, dash: 0 });
      IDS_C.push(id);
      id = 's6-sC-lab-' + i;
      S.addText(id, pts[i].x - 0.12, AXIS_Y - 0.52, pts[i].lab, { color: INK, size: 14 });
      IDS_C.push(id);
    }
    id = 's6-sC-diag';
    S.addText(id, -2, AXIS_Y + 2.5, '病因：刻度不均匀，单位长度不统一！', { color: RED, size: 15 });
    IDS_C.push(id);
    id = 's6-sC-rx';
    S.addText(id, -2, AXIS_Y + 1.5, '药方：用直尺重新等分刻度，全轴统一间距', { color: GREEN, size: 14 });
    IDS_C.push(id);
  }
  function removeSickC() {
    var i;
    for (i = 0; i < IDS_C.length; i++) { S.remove(IDS_C[i]); }
    IDS_C = [];
  }

  var scene = {
    id: 's6',
    title: '六、病轴门诊与小结',
    bbox: [-9, 7, 9, -5],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      IDS_A = [];
      IDS_B = [];
      IDS_C = [];
    },
    steps: [
      // Step 1：病轴1——无箭头
      {
        narration: '同学们来当小医生！第一位"病人"——这条数轴两端都截断了，没有箭头。病因是什么？——对，没有正方向，不知道哪边是正、哪边是负！药方：在正数方向（右端）画上箭头。',
        enter: function (anim) {
          drawSickA();
          P.renderCard(
            '<b>病轴门诊 1——无箭头</b><br>' +
            '<b style="color:#c62828">病因：</b>没有正方向箭头，无法分辨正负方向！<br>' +
            '<b style="color:#2e7d32">药方：</b>在正数方向（右端）画上箭头 →',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 2：病轴2——无原点
      {
        narration: '换下一位病人！这条数轴有箭头、有刻度，但 0 的位置根本没有标出来。病因：缺原点，无法确定各数的绝对位置。药方：找到对应 0 的那条刻度，标上原点 O 和"0"。',
        enter: function (anim) {
          removeSickA();
          drawSickB();
          P.renderCard(
            '<b>病轴门诊 2——缺原点</b><br>' +
            '<b style="color:#c62828">病因：</b>没有标出原点（0 在哪里？），正负无从参照！<br>' +
            '<b style="color:#2e7d32">药方：</b>找到对应 0 的刻度，标上原点 O 和"0"。',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 3：病轴3——刻度不均
      {
        narration: '第三位！这条数轴有原点、有箭头，但你看——左边每格很宽，右边某两格挤在一起，刻度完全不均匀！病因：单位长度不一致，点的位置就乱了。药方：用直尺重新等分，全轴统一间距。',
        enter: function (anim) {
          removeSickB();
          drawSickC();
          P.renderCard(
            '<b>病轴门诊 3——刻度不均</b><br>' +
            '<b style="color:#c62828">病因：</b>单位长度不统一，各格间距大小不一！<br>' +
            '<b style="color:#2e7d32">药方：</b>用直尺重新等分刻度，全轴保持一致间距。',
            'warm'
          );
          return anim ? delay(300) : null;
        }
      },

      // Step 4：第四问 + 小结填空 + 悬念
      {
        narration: '最后一问：有同学说"数轴上只能标整数，小数和分数没有对应的点"，这对吗？——当然不对！我们刚才已经把 1.5、-1.5、-3/2 都描上去了，它们都是数轴上的点。每一个有理数都能在数轴上找到唯一一个对应的点！最后留一个悬念——1.5 和 -1.5 这两个点，隔着原点遥遥相望，它们之间究竟有什么秘密？下节课揭晓！',
        enter: function (anim) {
          removeSickC();

          S.actor('s6-sum-title', 0, 5.8, '课堂小结', { color: COOL, size: 20, bold: true });
          S.actor('s6-sum1', -1, 4.4,
            '① 数轴三要素：<b>原点</b>、<b>正方向</b>、<b>单位长度</b>',
            { color: INK, size: 15 });
          S.actor('s6-sum2', -1, 3.1,
            '② 正数在原点<b>右</b>边，负数在原点<b>左</b>边，0 在<b>原点</b>',
            { color: INK, size: 15 });
          S.actor('s6-sum3', -1, 1.8,
            '③ 每个有理数对应数轴上<b>唯一一个</b>点',
            { color: INK, size: 15 });
          S.actor('s6-hint', 0, 0.4,
            '数轴上也能标小数、分数——不只是整数！',
            { color: TEAL, size: 14 });
          S.actor('s6-secret', 0, -1.2,
            '1.5 与 -1.5 关于原点对称……下节课揭秘！',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>小结</b><br>' +
            '① 三要素：<b>原点 · 正方向 · 单位长度</b>（缺一不可）<br>' +
            '② 正数 → 原点右边 | 负数 → 原点左边 | 0 → 原点<br>' +
            '③ 每一个有理数对应数轴上<b>唯一</b>一个点<br>' +
            '④ 数轴上也能标小数、分数，不只是整数！<br>' +
            '<b>悬念：</b>1.5 与 -1.5 之间的秘密——下节课揭晓 ⟩⟩',
            'cool'
          );

          return anim ? delay(300) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
