// s3-parallel.js  平行线复习（4步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 截线图基础元素（两平行线 + 截线）
  // a: y=3, b: y=-2, 截线斜过
  var aY = 3, bY = -2;
  var cAx = -3, cAy = aY;   // 截线交 a 于 A(-3,3)
  var cBx = 0, cBy = bY;    // 截线交 b 于 B(0,-2)
  var cdx = cBx - cAx, cdy = cBy - cAy;
  var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
  var cux = cdx / cLen, cuy = cdy / cLen;

  function buildBase() {
    // 直线 a
    S.addSegment('p-a', [-9, aY], [8, aY], { color: BLUE, width: 2.5, dash: 0 });
    S.addText('p-la', 8.3, aY + 0.3, 'a', { size: 17, color: BLUE });
    // 直线 b
    S.addSegment('p-b', [-9, bY], [8, bY], { color: BLUE, width: 2.5, dash: 0 });
    S.addText('p-lb', 8.3, bY + 0.3, 'b', { size: 17, color: BLUE });
    // 截线 c
    S.addSegment('p-c',
      [cAx - cux * 4, cAy - cuy * 4],
      [cBx + cux * 4, cBy + cuy * 4],
      { color: INK, width: 2, dash: 0 });
    S.addText('p-lc', cBx + cux * 4.3, cBy + cuy * 4.3 - 0.3, 'c', { size: 17, color: INK });
    // 交点
    S.dropPoint('p-A', cAx, cAy, { color: INK, name: 'A', size: 2.5, animate: false, labelOffset: [-20, 6] });
    S.dropPoint('p-B', cBx, cBy, { color: INK, name: 'B', size: 2.5, animate: false, labelOffset: [6, -18] });
    // 平行标记
    S.addSegment('p-pm1a', [2.0, aY], [2.5, aY + 0.5], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('p-pm2a', [2.3, aY], [2.8, aY + 0.5], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('p-pm1b', [2.0, bY], [2.5, bY + 0.5], { color: BLUE, width: 2, dash: 0 });
    S.addSegment('p-pm2b', [2.3, bY], [2.8, bY + 0.5], { color: BLUE, width: 2, dash: 0 });
  }

  // 同位角（∠1在A右上，∠5在B右上）
  function highlightCorresponding() {
    // ∠1：A处，a右 → c上方
    S.addAngle('p-ang1',
      [cAx + 2, cAy],
      [cAx, cAy],
      [cAx + cux * 2, cAy + cuy * 2],
      { radius: 0.6, color: PURPLE, label: '∠1', opacity: 0.12 });
    // ∠5：B处，b右 → c上方
    S.addAngle('p-ang5',
      [cBx + 2, cBy],
      [cBx, cBy],
      [cBx + cux * 2, cBy + cuy * 2],
      { radius: 0.6, color: PURPLE, label: '∠5', opacity: 0.12 });
  }

  // 内错角（∠3在A右下，∠5在B左上）
  function highlightAlternate() {
    // ∠3：A处，c下方 → a右方
    S.addAngle('p-ang3',
      [cAx - cux * 2, cAy - cuy * 2],
      [cAx, cAy],
      [cAx + 2, cAy],
      { radius: 0.6, color: ORANGE, label: '∠3', opacity: 0.12 });
    // ∠5：B处，b左 → c上方
    S.addAngle('p-ang5b',
      [cBx - 2, cBy],
      [cBx, cBy],
      [cBx + cux * 2, cBy + cuy * 2],
      { radius: 0.8, color: ORANGE, label: '∠5', opacity: 0.12 });
  }

  // 同旁内角（∠4在A左下，∠5在B左上）72°和108°
  function highlightCoInterior() {
    // ∠4：A处，a左 → c下方
    S.addAngle('p-ang4',
      [cAx - 2, cAy],
      [cAx, cAy],
      [cAx - cux * 2, cAy - cuy * 2],
      { radius: 1.0, color: GREEN, label: '∠4=72°', opacity: 0.12 });
    // ∠5：B处，c上方 → b左
    S.addAngle('p-ang5c',
      [cBx + cux * 2, cBy + cuy * 2],
      [cBx, cBy],
      [cBx - 2, cBy],
      { radius: 0.8, color: GREEN, label: '∠5=108°', opacity: 0.12 });
  }

  var scene = {
    id: 's3',
    title: '三、平行线复习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：三判定三性质对照大表
        narration: '平行线这一块是重中之重，也是考试最爱考的内容。我们来对比"判定"和"性质"——这两者方向相反：判定是用角的关系来推出线平行，性质是已知线平行来推出角的关系。请看这张对照表，三组角各对应一条判定和一条性质，左右对称，请大家仔细体会它们的方向差异。',
        enter: function (anim) {
          P.renderTable({
            head: ['角的类型', '判定（角→线）', '性质（线→角）'],
            rows: [
              ['同位角', '∠1=∠5 ⟹ a∥b', 'a∥b ⟹ ∠1=∠5'],
              ['内错角', '∠3=∠5 ⟹ a∥b', 'a∥b ⟹ ∠3=∠5'],
              ['同旁内角', '∠4+∠5=180° ⟹ a∥b', 'a∥b ⟹ ∠4+∠5=180°'],
            ],
          });
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤2：例题3——同旁内角72°+108°判平行
        narration: '来看例题3：已知同旁内角分别为 $72^\\circ$ 和 $108^\\circ$，判断两直线是否平行。解题步骤：先认角的类型——∠4 和 ∠5 在截线同侧，位于两直线内部，是同旁内角；再看数量关系——$72^\\circ + 108^\\circ = 180^\\circ$，同旁内角互补；最后写结论——所以 $a \\parallel b$。注意：一定先认清角的位置，再下判断！',
        enter: function (anim) {
          buildBase();
          if (!anim) {
            highlightCoInterior();
            S.addText('p-e3c1', 4.5, 6.0, '∠4 = 72°，∠5 = 108°', { size: 15, color: INK });
            S.addText('p-e3c2', 4.5, 4.8, '∠4 + ∠5 = 72° + 108°', { size: 14, color: GREEN });
            S.addText('p-e3c3', 4.5, 3.7, '= 180°', { size: 14, color: GREEN });
            S.addText('p-e3c4', 4.5, 2.5, '同旁内角互补', { size: 14, color: GREEN });
            S.addText('p-e3c5', 4.5, 1.3, '∴ a ∥ b', { size: 16, color: BLUE });
            P.renderCard(
              '<b>例题3解答</b><br>' +
              '∠4 与 ∠5 是同旁内角<br>' +
              '$72^\\circ + 108^\\circ = 180^\\circ$<br>' +
              '（同旁内角互补）<br>' +
              '∴ $a \\parallel b$'
            );
            return;
          }
          return delay(300).then(function () {
            highlightCoInterior();
            S.addText('p-e3c1', 4.5, 6.0, '∠4 = 72°，∠5 = 108°', { size: 15, color: INK });
            return delay(500);
          }).then(function () {
            S.addText('p-e3c2', 4.5, 4.8, '∠4 + ∠5 = 72° + 108°', { size: 14, color: GREEN });
            S.addText('p-e3c3', 4.5, 3.7, '= 180°', { size: 14, color: GREEN });
            return delay(500);
          }).then(function () {
            S.addText('p-e3c4', 4.5, 2.5, '同旁内角互补', { size: 14, color: GREEN });
            S.addText('p-e3c5', 4.5, 1.3, '∴ a ∥ b', { size: 16, color: BLUE });
            P.renderCard(
              '<b>例题3解答</b><br>' +
              '∠4 与 ∠5 是同旁内角<br>' +
              '$72^\\circ + 108^\\circ = 180^\\circ$<br>' +
              '（同旁内角互补）<br>' +
              '∴ $a \\parallel b$'
            );
          });
        },
      },
      {
        // 步骤3：例题4——利用平行线性质求角（内错角56°）
        narration: '例题4：已知 $a \\parallel b$，一个内错角为 $56^\\circ$，求另一个内错角。注意方向！这里是已知线平行，要用<b>性质</b>推出角的关系。∠3 与 ∠5 是内错角，由平行线性质：$a \\parallel b \\Rightarrow \\angle 3 = \\angle 5$，所以另一个内错角也是 $56^\\circ$。请看图中绿色高亮的两个内错角，它们度数相同，形成 Z 字形——这是内错角的经典特征！',
        enter: function (anim) {
          // 移除同旁内角高亮，换内错角
          S.remove('p-ang4'); S.remove('p-ang5c');
          if (!anim) {
            highlightAlternate();
            S.addText('p-e4c1', 4.5, 5.5, '已知：a ∥ b，∠3 = 56°', { size: 15, color: INK });
            S.addText('p-e4c2', 4.5, 4.3, '∠3 与 ∠5 是内错角', { size: 14, color: ORANGE });
            S.addText('p-e4c3', 4.5, 3.1, '由 a ∥ b（平行线性质）', { size: 14, color: ORANGE });
            S.addText('p-e4c4', 4.5, 1.9, '∠5 = ∠3 = 56°', { size: 16, color: ORANGE });
            P.renderCard(
              '<b>例题4解答</b><br>' +
              '已知 $a \\parallel b$，∠3 = 56°<br>' +
              '∠3 与 ∠5 是内错角<br>' +
              '由平行线<b>性质</b>：$a \\parallel b \\Rightarrow \\angle 3 = \\angle 5$<br>' +
              '∴ ∠5 = <b>56°</b>'
            );
            return;
          }
          return delay(300).then(function () {
            highlightAlternate();
            S.addText('p-e4c1', 4.5, 5.5, '已知：a ∥ b，∠3 = 56°', { size: 15, color: INK });
            return delay(500);
          }).then(function () {
            S.addText('p-e4c2', 4.5, 4.3, '∠3 与 ∠5 是内错角', { size: 14, color: ORANGE });
            S.addText('p-e4c3', 4.5, 3.1, '由 a ∥ b（平行线性质）', { size: 14, color: ORANGE });
            return delay(500);
          }).then(function () {
            S.addText('p-e4c4', 4.5, 1.9, '∠5 = ∠3 = 56°', { size: 16, color: ORANGE });
            P.renderCard(
              '<b>例题4解答</b><br>' +
              '已知 $a \\parallel b$，∠3 = 56°<br>' +
              '∠3 与 ∠5 是内错角<br>' +
              '由平行线<b>性质</b>：$a \\parallel b \\Rightarrow \\angle 3 = \\angle 5$<br>' +
              '∴ ∠5 = <b>56°</b>'
            );
          });
        },
      },
      {
        // 步骤4：易错点3/4——角位置认清/判定与性质方向
        narration: '这一步来强调两个易错点。易错点3：看到两个角相等就直接判断平行——这是错的！必须先确认这两个角是同位角或内错角，才能用判定。易错点4：混淆判定和性质的方向——记住口诀："角推线用判定，线推角用性质"。方向一定不能搞反！',
        enter: function (anim) {
          P.renderCard(
            '<b>易错点3：角相等不等于平行</b><br>' +
            '必须确认角的<b>位置关系</b>（同位？内错？），<br>' +
            '再判断数量关系，才能下结论。<br>' +
            '<br>' +
            '<b>易错点4：判定 vs 性质方向不能混</b><br>' +
            '<b style="color:#c62828">角 → 线（判定）</b>：∠1 = ∠5 ⟹ a ∥ b<br>' +
            '<b style="color:#2e7d32">线 → 角（性质）</b>：a ∥ b ⟹ ∠1 = ∠5<br>' +
            '<br>' +
            '口诀：<b>角推线用判定，线推角用性质</b>',
            'warm'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
