// s7-summary.js  易错提醒与课时小结（3步）
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var RED    = '#c62828';
  var GREEN  = '#2e7d32';
  var GRAY   = '#90a4ae';
  var ORANGE = '#e65100';
  var PURPLE = '#7b1fa2';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 布局：用于展示易错图例
  var ptAx = -3, ptAy = 2;   // 上交点
  var ptBx = -1, ptBy = -2;  // 下交点

  var cdx = ptBx - ptAx; var cdy = ptBy - ptAy;
  var cLen = Math.sqrt(cdx * cdx + cdy * cdy);
  var cux = cdx / cLen; var cuy = cdy / cLen;

  var c1 = [ptAx - cux * 8, ptAy - cuy * 8];
  var c2 = [ptBx + cux * 8, ptBy + cuy * 8];

  var a1 = [-8, ptAy]; var a2 = [5, ptAy];
  var b1 = [-8, ptBy]; var b2 = [5, ptBy];

  function angleP(x, y, dx, dy, r) { return [x + dx * r, y + dy * r]; }

  var scene = {
    id: 's7',
    title: '七、易错提醒与课时小结',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：易错卡1——看到角相等就说平行（错！）
        narration: '学了三个判定方法，来说几个常见错误。最大的易错点：看到两个角相等，就直接说两直线平行——这是不对的！必须先确认这两个角是哪种类型的角，才能用对应的判定方法。比如两个角相等，但如果它们是对顶角、互余关系等，就根本不能用来判断平行。',
        enter: function (anim) {
          // 画图：三线八角底图
          S.addSegment('line-a', a1, a2, { color: BLUE, width: 2.5, dash: 0 });
          S.addText('lbl-a', 5.2, ptAy + 0.2, 'a', { size: 17, color: BLUE });
          S.addSegment('line-b', b1, b2, { color: GREEN, width: 2.5, dash: 0 });
          S.addText('lbl-b', 5.2, ptBy + 0.2, 'b', { size: 17, color: GREEN });
          S.addSegment('line-c', c1, c2, { color: INK, width: 2, dash: 0 });
          S.dropPoint('pt-A', ptAx, ptAy, { color: INK, name: 'A', size: 2.5, animate: false, labelOffset: [-18, 8] });
          S.dropPoint('pt-B', ptBx, ptBy, { color: INK, name: 'B', size: 2.5, animate: false, labelOffset: [-18, -16] });

          // 高亮一对对顶角（非同位、非内错），比如∠1（A处左上）和∠3（A处右下）—— 相等但都在A处
          var r = 0.75; var rBig = 1.1;
          S.addAngle('err-ang1',
            [ptAx - 2, ptAy], [ptAx, ptAy],
            [ptAx - cux * 2, ptAy - cuy * 2],
            { radius: r, color: RED, label: '∠1', opacity: 0.35, labelSize: 13 });
          S.addAngle('err-ang3',
            [ptAx + 2, ptAy], [ptAx, ptAy],
            [ptAx + cux * 2, ptAy + cuy * 2],
            { radius: rBig, color: RED, label: '∠3', opacity: 0.35, labelSize: 13 });

          // 错误符号
          S.addText('err-mark', ptAx - 5, ptAy + 2, '✗', { size: 28, color: RED });
          S.addText('err-note', ptAx - 4.5, ptAy + 1, '∠1 = ∠3（对顶角）', { size: 13, color: RED });
          S.addText('err-note2', ptAx - 4.5, ptAy + 0.1, '≠ 同位角/内错角', { size: 13, color: RED });
          S.addText('err-note3', ptAx - 4.5, ptAy - 0.8, '不能判断 a∥b！', { size: 13, color: RED });

          P.renderCard(
            '<b style="color:' + RED + '">易错点1：看到角相等就判断平行</b><br><br>' +
            '错误做法：∠1 = ∠3（两角都在 A 处，是对顶角），<br>' +
            '直接说 $a \\parallel b$。<br><br>' +
            '<b>纠正</b>：必须先确认这两个角是<b>同位角</b>或<b>内错角</b>，<br>' +
            '才能用相应判定方法。对顶角相等与平行无关！'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：易错卡2——结论与依据的方向问题
        narration: '第二个易错点：结论和依据要匹配。判定方法的结论是"两直线平行"，依据是"角的关系"；而平行线的性质（后面会学）正好反过来——已知平行推出角的关系。这两者方向相反，一定要区分清楚。',
        enter: function (anim) {
          // 清空图上的易错标注，换成对比卡
          S.remove('err-ang1'); S.remove('err-ang3');
          S.remove('err-mark'); S.remove('err-note'); S.remove('err-note2'); S.remove('err-note3');

          // 补充：判定 vs 性质对比图
          S.addText('vs-title', -9, 5.5, '判定 vs 性质——方向相反', { size: 15, color: INK });
          // 判定方向：角关系 → 线平行
          S.addText('judge-lbl', -9, 4, '【判定】角的关系 ⟹ 两直线平行', { size: 14, color: BLUE });
          S.addText('judge-ex',  -9, 3, '∠1=∠5（同位角）⟹ a∥b', { size: 13, color: BLUE });
          // 性质方向：线平行 → 角关系
          S.addText('prop-lbl', -9, 1.5, '【性质】两直线平行 ⟹ 角的关系', { size: 14, color: GREEN });
          S.addText('prop-ex',  -9, 0.5, 'a∥b ⟹ ∠1=∠5（同位角）', { size: 13, color: GREEN });
          // 警示
          S.addText('dir-warn', -9, -1, '两者方向相反，不能混用！', { size: 14, color: RED });

          P.renderCard(
            '<b style="color:' + RED + '">易错点2：结论与依据方向混淆</b><br><br>' +
            '判定：角的关系 ⟹ 线平行（本节学）<br>' +
            '性质：线平行 ⟹ 角的关系（后面学）<br><br>' +
            '写推理时：<br>' +
            '· 结论是"<b>直线平行</b>"，用判定方法<br>' +
            '· 结论是"<b>角的关系</b>"，用性质<br>' +
            '方向不能反！'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：三判定小结表
        narration: '最后，我们用一张表格把三个判定方法汇总起来。记住：同位角、内错角、同旁内角三种位置关系，对应三种判定；前两个用"相等"，第三个用"互补"——不要混淆！这三个判定是本章最重要的结论，下节课还会用到。',
        enter: function (anim) {
          P.renderCard(
            '<b>平行线判定方法小结</b><br>' +
            '<table style="width:100%;border-collapse:collapse;font-size:15px">' +
            '<tr style="background:#e3f2fd">' +
            '<th style="padding:7px;border:1px solid #ccc">判定方法</th>' +
            '<th style="padding:7px;border:1px solid #ccc">角的类型</th>' +
            '<th style="padding:7px;border:1px solid #ccc">数量关系</th>' +
            '<th style="padding:7px;border:1px solid #ccc">结论</th>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding:7px;border:1px solid #ccc;color:#7b1fa2"><b>判定1</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">同位角（F形）</td>' +
            '<td style="padding:7px;border:1px solid #ccc"><b>相等</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">两直线平行</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding:7px;border:1px solid #ccc;color:#e65100"><b>判定2</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">内错角（Z形）</td>' +
            '<td style="padding:7px;border:1px solid #ccc"><b>相等</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">两直线平行</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="padding:7px;border:1px solid #ccc;color:#2e7d32"><b>判定3</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">同旁内角（U形）</td>' +
            '<td style="padding:7px;border:1px solid #ccc"><b>互补（和=180°）</b></td>' +
            '<td style="padding:7px;border:1px solid #ccc">两直线平行</td>' +
            '</tr>' +
            '</table><br>' +
            '<i>口诀：同位相等、内错相等、同旁互补 ⟹ 平行</i>',
            'cool'
          );
          if (anim) { return delay(200); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
