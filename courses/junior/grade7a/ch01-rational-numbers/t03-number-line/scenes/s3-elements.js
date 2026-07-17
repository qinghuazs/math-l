// s3-elements.js  三、三要素与规范画法（4步）
// 数学说明：
//   步1：完整数轴亮相（-4~4，有原点O、右箭头、均匀刻度）
//   步2：三张病图依次呈现（S.remove 换图）
//         病图A：无原点（不标0/O）
//         病图B：无箭头
//         病图C：刻度不均（0到1=1.0单位，1到2=2.0单位，2到3=0.6单位）
//   步3：三要素定义逐个点亮（pulse 强调原点/箭头/单位长度标注）
//   步4：四步画法 renderTable
//   bbox [-9, 8, 9, -4]，axis:false，keepAspect:false
//   UNIT=1.5画面单位，数轴在 y=1.5
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
  var AXIS_Y = 1.5;
  function tx(n) { return n * UNIT; }

  // 绘制标准完整数轴 prefix，范围 lo~hi
  function drawFullAxis(prefix, lo, hi, showOrigin, showArrow) {
    // 主线
    S.addSegment(prefix + '-main',
      [tx(lo) - 0.5, AXIS_Y], [tx(hi) + 0.7, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    // 右箭头
    if (showArrow) {
      S.addSegment(prefix + '-arr1',
        [tx(hi) + 0.5, AXIS_Y + 0.18], [tx(hi) + 0.8, AXIS_Y],
        { color: INK, width: 2.5, dash: 0 });
      S.addSegment(prefix + '-arr2',
        [tx(hi) + 0.5, AXIS_Y - 0.18], [tx(hi) + 0.8, AXIS_Y],
        { color: INK, width: 2.5, dash: 0 });
    }
    var n;
    for (n = lo; n <= hi; n++) {
      S.addSegment(prefix + '-tick-' + (n - lo),
        [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
        { color: INK, width: 2, dash: 0 });
      // 原点特殊标注
      if (n === 0) {
        if (showOrigin) {
          S.addText(prefix + '-tlab-O', tx(0) - 0.1, AXIS_Y - 0.55, '0',
            { color: INK, size: 15 });
          S.addText(prefix + '-tlab-Olabel', tx(0) + 0.05, AXIS_Y + 0.42, 'O',
            { color: INK, size: 14 });
        }
      } else {
        S.addText(prefix + '-tlab-' + (n - lo), tx(n) - 0.12, AXIS_Y - 0.55,
          '' + n, { color: INK, size: 14 });
      }
    }
  }

  // 清除一组带前缀的元素（lo~hi 刻度个数为 hi-lo+1 = len）
  function removeAxis(prefix, lo, hi) {
    S.remove(prefix + '-main');
    S.remove(prefix + '-arr1');
    S.remove(prefix + '-arr2');
    S.remove(prefix + '-tlab-O');
    S.remove(prefix + '-tlab-Olabel');
    var n;
    for (n = lo; n <= hi; n++) {
      S.remove(prefix + '-tick-' + (n - lo));
      S.remove(prefix + '-tlab-' + (n - lo));
    }
  }

  // 病图：无均匀刻度（刻度x手动指定不均匀）
  function drawUnevenAxis(prefix) {
    S.addSegment(prefix + '-main', [-5.5, AXIS_Y], [6.5, AXIS_Y],
      { color: INK, width: 3, dash: 0 });
    // 箭头
    S.addSegment(prefix + '-arr1', [6.3, AXIS_Y + 0.18], [6.6, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    S.addSegment(prefix + '-arr2', [6.3, AXIS_Y - 0.18], [6.6, AXIS_Y],
      { color: INK, width: 2.5, dash: 0 });
    // 原点
    S.addSegment(prefix + '-tick0', [0, AXIS_Y - 0.22], [0, AXIS_Y + 0.22],
      { color: INK, width: 2, dash: 0 });
    S.addText(prefix + '-lab0-0', -0.1, AXIS_Y - 0.55, '0', { color: INK, size: 14 });
    S.addText(prefix + '-lab0-O', 0.05, AXIS_Y + 0.42, 'O', { color: INK, size: 14 });
    // 不均匀刻度：1在x=1.0，2在x=3.0，3在x=3.6
    var pts = [
      { x: 1.0, lab: '1' },
      { x: 3.0, lab: '2' },
      { x: 3.6, lab: '3' },
      { x: -1.5, lab: '-1' },
      { x: -3.5, lab: '-2' },
      { x: -4.0, lab: '-3' }
    ];
    var i;
    for (i = 0; i < pts.length; i++) {
      S.addSegment(prefix + '-tick-' + i,
        [pts[i].x, AXIS_Y - 0.22], [pts[i].x, AXIS_Y + 0.22],
        { color: INK, width: 2, dash: 0 });
      S.addText(prefix + '-tlab-' + i, pts[i].x - 0.12, AXIS_Y - 0.55,
        pts[i].lab, { color: INK, size: 14 });
    }
    // 红色警示标注
    S.addText(prefix + '-warn', -1, 4.5,
      '刻度不均匀！', { color: RED, size: 16 });
  }

  function removeUnevenAxis(prefix) {
    S.remove(prefix + '-main');
    S.remove(prefix + '-arr1'); S.remove(prefix + '-arr2');
    S.remove(prefix + '-tick0');
    S.remove(prefix + '-lab0-0'); S.remove(prefix + '-lab0-O');
    S.remove(prefix + '-warn');
    var i;
    for (i = 0; i < 6; i++) {
      S.remove(prefix + '-tick-' + i);
      S.remove(prefix + '-tlab-' + i);
    }
  }

  var scene = {
    id: 's3',
    title: '三、三要素与规范画法',
    bbox: [-9, 8, 9, -4],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：完整数轴亮相
      {
        narration: '现在，我们来看一条完整、规范的数轴。它有原点 O（对应 0 的点）、有右端箭头（正方向）、有均匀的刻度。这就是标准数轴！',
        enter: function (anim) {
          drawFullAxis('s3-full', -4, 4, true, true);

          // 高亮说明
          S.addText('s3-label-arrow', tx(4) + 0.6, AXIS_Y + 0.8,
            '正方向箭头', { color: WARM, size: 13 });
          S.addText('s3-label-origin', tx(0), AXIS_Y - 1.3,
            '原点 O', { color: COOL, size: 13 });
          // 单位长度双箭头标注
          S.addSegment('s3-unit-arr', [tx(0), AXIS_Y + 0.6], [tx(1), AXIS_Y + 0.6],
            { color: TEAL, width: 2, dash: 0 });
          S.addText('s3-unit-lab', tx(0.5) - 0.5, AXIS_Y + 1.0,
            '单位长度', { color: TEAL, size: 13 });

          P.renderCard(
            '<b>标准数轴</b><br>' +
            '包含三要素：<br>' +
            '&nbsp;&nbsp;• <b style="color:#1565c0">原点 O</b>——对应数 0 的点<br>' +
            '&nbsp;&nbsp;• <b style="color:#e64a19">正方向箭头</b>——向右为正<br>' +
            '&nbsp;&nbsp;• <b style="color:#00796b">单位长度</b>——相邻整数等距'
          );

          return anim ? delay(400) : null;
        }
      },

      // Step 2：三张病图依次展示（S.remove 换图）
      {
        narration: '现在我们来"找病"！三张病轴，你能看出每张缺了什么？先看第一张——没有标出原点 0，这条线上你根本不知道哪里是"0"，正负从哪算起？——然后换第二张……没有箭头，不知道哪边是正方向！——最后，刻度不均匀，这更是大问题！',
        enter: function (anim) {
          // 清除步1装饰
          S.remove('s3-label-arrow'); S.remove('s3-label-origin');
          S.remove('s3-unit-arr'); S.remove('s3-unit-lab');
          removeAxis('s3-full', -4, 4);

          // --- 病图A：无原点 ---
          S.addSegment('s3-sickA-main', [-5.5, AXIS_Y], [6.5, AXIS_Y],
            { color: INK, width: 3, dash: 0 });
          // 箭头（有）
          S.addSegment('s3-sickA-arr1', [6.3, AXIS_Y + 0.18], [6.6, AXIS_Y],
            { color: INK, width: 2.5, dash: 0 });
          S.addSegment('s3-sickA-arr2', [6.3, AXIS_Y - 0.18], [6.6, AXIS_Y],
            { color: INK, width: 2.5, dash: 0 });
          // 刻度（有）但不标0
          var n;
          for (n = -4; n <= 4; n++) {
            S.addSegment('s3-sickA-tick-' + (n + 4),
              [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
              { color: INK, width: 2, dash: 0 });
            if (n !== 0) {
              S.addText('s3-sickA-tlab-' + (n + 4),
                tx(n) - 0.12, AXIS_Y - 0.55,
                '' + n, { color: INK, size: 14 });
            }
            // n=0：故意不标数字也不标O
          }
          // 红色警告
          S.addText('s3-sickA-warn', -1, AXIS_Y + 2.0,
            '病因：缺原点！', { color: RED, size: 16 });
          S.addText('s3-sickA-diag', -3, AXIS_Y - 2.0,
            '没有 O（0），不知道正负从哪算起', { color: RED, size: 13 });

          P.renderCard(
            '<b>病轴 A——缺原点</b><br>' +
            '有刻度、有箭头，但没有标出 0（原点）。<br>' +
            '<b style="color:#c62828">病因：</b>无法确定各数的绝对位置！<br>' +
            '<b>药方：</b>找到对应 0 的刻度，标上 O 和"0"。',
            'warm'
          );

          return anim ? delay(800).then(function () {
            // 移除病图A，显示病图B
            S.remove('s3-sickA-main');
            S.remove('s3-sickA-arr1'); S.remove('s3-sickA-arr2');
            S.remove('s3-sickA-warn'); S.remove('s3-sickA-diag');
            for (n = -4; n <= 4; n++) {
              S.remove('s3-sickA-tick-' + (n + 4));
              S.remove('s3-sickA-tlab-' + (n + 4));
            }

            // --- 病图B：无箭头 ---
            S.addSegment('s3-sickB-main', [-5.5, AXIS_Y], [6.0, AXIS_Y],
              { color: INK, width: 3, dash: 0 });
            // 无箭头！
            for (n = -4; n <= 4; n++) {
              S.addSegment('s3-sickB-tick-' + (n + 4),
                [tx(n), AXIS_Y - 0.22], [tx(n), AXIS_Y + 0.22],
                { color: INK, width: 2, dash: 0 });
              S.addText('s3-sickB-tlab-' + (n + 4),
                tx(n) - 0.12, AXIS_Y - 0.55,
                '' + n, { color: INK, size: 14 });
            }
            S.addText('s3-sickB-olab', tx(0) + 0.05, AXIS_Y + 0.42, 'O',
              { color: INK, size: 14 });
            S.addText('s3-sickB-warn', -1, AXIS_Y + 2.0,
              '病因：缺箭头（无正方向）！', { color: RED, size: 16 });
            S.addText('s3-sickB-diag', -4, AXIS_Y - 2.0,
              '没有箭头，不知道哪边是正方向', { color: RED, size: 13 });

            P.renderCard(
              '<b>病轴 B——缺箭头（正方向）</b><br>' +
              '有刻度、有原点，但两端都没有箭头。<br>' +
              '<b style="color:#c62828">病因：</b>不知道哪边是正、哪边是负！<br>' +
              '<b>药方：</b>在正数方向一端画箭头。',
              'warm'
            );

            return delay(800);
          }).then(function () {
            // 移除病图B，显示病图C
            S.remove('s3-sickB-main');
            S.remove('s3-sickB-warn'); S.remove('s3-sickB-diag');
            S.remove('s3-sickB-olab');
            for (n = -4; n <= 4; n++) {
              S.remove('s3-sickB-tick-' + (n + 4));
              S.remove('s3-sickB-tlab-' + (n + 4));
            }

            // --- 病图C：刻度不均 ---
            drawUnevenAxis('s3-sickC');

            P.renderCard(
              '<b>病轴 C——刻度不均匀</b><br>' +
              '有原点、有箭头，但各格间距大小不一。<br>' +
              '<b style="color:#c62828">病因：</b>单位长度不统一，点的位置乱了！<br>' +
              '<b>药方：</b>用直尺重新等分刻度，全轴统一间距。',
              'warm'
            );

            return delay(300);
          }) : null;
        }
      },

      // Step 3：三要素定义逐个点亮
      {
        narration: '通过病轴，我们发现了三要素各自的作用。现在来正式定义：原点——数轴上表示 0 的那个点，是所有正负数的基准；正方向——通常规定向右为正，用箭头标出；单位长度——相邻整数之间的距离，全轴必须统一。三者缺一不可！',
        enter: function (anim) {
          // 清除病图C
          removeUnevenAxis('s3-sickC');

          // 重画完整数轴
          drawFullAxis('s3-def', -4, 4, true, true);

          // 三要素逐个高亮文字
          S.actor('s3-elem-title', 0, 6.5, '数轴三要素', { color: COOL, size: 20, bold: true });
          S.actor('s3-elem1', -5, 5.0,
            '① <b>原点</b>：数轴上表示 0 的点，是正负数的基准',
            { color: COOL, size: 15 });
          S.actor('s3-elem2', -5, 3.5,
            '② <b>正方向</b>：通常向右为正，用箭头表示',
            { color: WARM, size: 15 });
          S.actor('s3-elem3', -5, 2.2,
            '③ <b>单位长度</b>：相邻整数间距离，全轴统一',
            { color: TEAL, size: 15 });

          // 原点落点强调（pulse 只适用于点元素，文本/线段不可 pulse）
          S.dropPoint('s3-def-origin-pt', tx(0), AXIS_Y, { color: COOL, size: 4 });
          if (anim) {
            return S.pulse('s3-def-origin-pt', 2).then(function () {
              P.renderCard(
                '<b>三要素定义</b><br>' +
                '① <b style="color:#1565c0">原点</b>：表示 0 的点，正负数的基准<br>' +
                '② <b style="color:#e64a19">正方向</b>：箭头所指方向（通常向右）<br>' +
                '③ <b style="color:#00796b">单位长度</b>：相邻整数间距，全轴一致<br>' +
                '<b>三者缺一不可！</b>',
                'cool'
              );
              return delay(200);
            });
          }

          P.renderCard(
            '<b>三要素定义</b><br>' +
            '① <b style="color:#1565c0">原点</b>：表示 0 的点，正负数的基准<br>' +
            '② <b style="color:#e64a19">正方向</b>：箭头所指方向（通常向右）<br>' +
            '③ <b style="color:#00796b">单位长度</b>：相邻整数间距，全轴一致<br>' +
            '<b>三者缺一不可！</b>',
            'cool'
          );
          return null;
        }
      },

      // Step 4：四步画法 renderTable
      {
        narration: '最后记住四步规范画法：第一步，用直尺画一条水平直线；第二步，在直线上取一点标为原点 O 并写"0"；第三步，在右端画箭头规定正方向；第四步，以原点为中心向两侧按相等间距标刻度写整数。——四步缺一不可！',
        enter: function (anim) {
          P.renderTable({
            head: ['步骤', '操作'],
            rows: [
              ['第一步', '用直尺画一条水平直线'],
              ['第二步', '在直线上取一点，标原点 O，旁边写"0"'],
              ['第三步', '规定向右为正方向，在直线右端画箭头 →'],
              ['第四步', '以原点为中心，向两侧按相等间距标刻度，写上整数']
            ]
          });

          P.renderCard(
            '<b>口诀</b>：直线打底，原点定位，箭头定向，刻度均匀。',
            'teal'
          );

          return anim ? delay(300) : null;
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
