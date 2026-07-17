// s3-concept.js  对应教学设计"环节三：概念形成——正数与负数"
// 数据已验算：+3℃/-3℃, +8848.86m/-155m, +500元/-200元, +6.2%/-1.5%
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、正数与负数',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：正数定义（+号可省）
      {
        narration: '现在来给正数下个正式定义。像 1、2.5、四分之三、8848.86 这样大于零的数，就叫正数。正数前面可以加"+"号，也可以省略不写——加了叫正三，不加叫三，意思完全一样。',
        enter: function (anim) {
          S.actor('s3-title', 0, 7, '正数的定义', { color: WARM, size: 22, bold: true });
          S.actor('s3-def-pos', 0, 5.5,
            '大于 $0$ 的数，叫作<b>正数</b>',
            { color: WARM, size: 18, bold: true });
          S.actor('s3-ex-pos', 0, 4,
            '如：$1,\\ 2.5,\\ \\dfrac{3}{4},\\ 8848.86$',
            { color: INK, size: 17 });
          S.actor('s3-plus-rule', 0, 2.5,
            '$+$ 号可以省略：$+3 = 3$（同一个数）',
            { color: TEAL, size: 16 });
          S.actor('s3-plus-demo1', -3, 1,
            '$+3$', { color: WARM, size: 22, bold: true });
          S.actor('s3-plus-eq', 0, 1, '=', { color: INK, size: 22 });
          S.actor('s3-plus-demo2', 3, 1,
            '$3$', { color: WARM, size: 22, bold: true });
          S.actor('s3-plus-hint', 0, -0.5,
            '读作"正三"或直接叫"三"，都可以',
            { color: INK, size: 15 });

          P.renderCard(
            '<b>正数</b>：大于 $0$ 的数<br>' +
            '例：$1,\\ 2.5,\\ \\dfrac{3}{4},\\ 8848.86$<br>' +
            '$+$ 号可省：$+3$ 和 $3$ 是同一个数'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 2：负数定义（-号绝不可省，演示去掉-号意思全变）
      {
        narration: '再来看负数。在正数前面加上"−"号，就得到负数，比如 -1、-2.5、-155。注意重点：负数前面的"−"号绝对不能省略！你看，-3 去掉减号就变成了 3，从零下三度变成零上三度，意思完全不同！',
        enter: function (anim) {
          // 清掉上一步 actor
          S.remove('s3-title');
          S.remove('s3-def-pos');
          S.remove('s3-ex-pos');
          S.remove('s3-plus-rule');
          S.remove('s3-plus-demo1');
          S.remove('s3-plus-eq');
          S.remove('s3-plus-demo2');
          S.remove('s3-plus-hint');

          S.actor('s3-title2', 0, 7, '负数的定义', { color: COOL, size: 22, bold: true });
          S.actor('s3-def-neg', 0, 5.5,
            '在正数前加"$-$"号，就得到<b>负数</b>',
            { color: COOL, size: 18, bold: true });
          S.actor('s3-ex-neg', 0, 4,
            '如：$-1,\\ -2.5,\\ -\\dfrac{3}{4},\\ -155$',
            { color: INK, size: 17 });

          // 演示去掉-号意思全变
          S.actor('s3-warn-title', 0, 2.5, '⚠ 警告：$-$ 号绝不可省！', { color: RED, size: 17, bold: true });
          S.actor('s3-neg-show', -5, 1, '$-3$℃', { color: COOL, size: 24, bold: true });
          S.actor('s3-neg-meaning', -5, -0.3, '零下三度（冷！）', { color: COOL, size: 14 });
          S.actor('s3-vs', 0, 1, '≠', { color: RED, size: 26 });
          S.actor('s3-pos-show', 5, 1, '$3$℃', { color: WARM, size: 24, bold: true });
          S.actor('s3-pos-meaning', 5, -0.3, '零上三度（暖！）', { color: WARM, size: 14 });
          S.actor('s3-warn2', 0, -2,
            '省掉 $-$ 号，意思<b>完全相反</b>！',
            { color: RED, size: 16, bold: true });

          P.renderCard(
            '<b>负数</b>：正数前加 $-$ 号得到负数<br>' +
            '<b>$-$ 号绝不可省！</b><br>' +
            '$-3$℃（零下）$\\neq$ $3$℃（零上）——省掉就意思全变'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 3：读法示范
      {
        narration: '读法很简单。正数前面有"+"号，就读"正几"；负数前面有"−"号，读"负几"。+3 读正三；-3 读负三；-155 读负一百五十五。没有"+"号的正数，直接读数字就行。',
        enter: function (anim) {
          S.remove('s3-title2');
          S.remove('s3-def-neg');
          S.remove('s3-ex-neg');
          S.remove('s3-warn-title');
          S.remove('s3-neg-show');
          S.remove('s3-neg-meaning');
          S.remove('s3-vs');
          S.remove('s3-pos-show');
          S.remove('s3-pos-meaning');
          S.remove('s3-warn2');

          S.actor('s3-read-title', 0, 7, '读法示范', { color: TEAL, size: 22, bold: true });

          S.actor('s3-r1-num',  -5, 5.5, '$+3$',   { color: WARM, size: 22, bold: true });
          S.actor('s3-r1-read',  3, 5.5, '读作：正三',  { color: INK, size: 17 });
          S.actor('s3-r2-num',  -5, 4,   '$-3$',   { color: COOL, size: 22, bold: true });
          S.actor('s3-r2-read',  3, 4,   '读作：负三',  { color: INK, size: 17 });
          S.actor('s3-r3-num',  -5, 2.5, '$-155$', { color: COOL, size: 22, bold: true });
          S.actor('s3-r3-read',  3, 2.5, '读作：负一百五十五', { color: INK, size: 17 });
          S.actor('s3-r4-num',  -5, 1,   '$8848.86$', { color: WARM, size: 20 });
          S.actor('s3-r4-read',  3, 1,   '读作：正八千八百四十八点八六', { color: INK, size: 14 });
          S.actor('s3-r4-hint',  0, -0.3, '（省了 $+$ 号，直接读）', { color: TEAL, size: 14 });

          P.renderCard(
            '<b>读法规则</b><br>' +
            '有 $+$ 号：读"正××"<br>' +
            '有 $-$ 号：读"负××"<br>' +
            '无符号：直接读数字（默认正数）'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      },

      // Step 4：四组情境写数（温度/海拔/收支/增降百分比）
      {
        narration: '现在回到情境，练习用正负数表示。零上3℃记 +3℃，零下3℃记 -3℃；珠穆朗玛峰高出海面8848.86米记 +8848.86米，吐鲁番盆地低于海面155米记 -155米；收入500元记 +500元，支出200元记 -200元；增长6.2%记 +6.2%，下降1.5%记 -1.5%。',
        enter: function (anim) {
          S.remove('s3-read-title');
          S.remove('s3-r1-num');
          S.remove('s3-r1-read');
          S.remove('s3-r2-num');
          S.remove('s3-r2-read');
          S.remove('s3-r3-num');
          S.remove('s3-r3-read');
          S.remove('s3-r4-num');
          S.remove('s3-r4-read');
          S.remove('s3-r4-hint');

          P.renderTable({
            head: ['情境描述', '记作'],
            rows: [
              ['零上 $3$℃',      '$+3$℃（或 $3$℃）'],
              ['零下 $3$℃',      '$-3$℃'],
              ['海拔高于海面 $8848.86$ 米', '$+8848.86$ 米'],
              ['海拔低于海面 $155$ 米',    '$-155$ 米'],
              ['收入 $500$ 元',            '$+500$ 元（或 $500$ 元）'],
              ['支出 $200$ 元',            '$-200$ 元'],
              ['增长 $6.2\\%$',            '$+6.2\\%$（或 $6.2\\%$）'],
              ['下降 $1.5\\%$',            '$-1.5\\%$']
            ]
          });

          P.renderCard(
            '<b>情境→记号</b>：四组对应<br>' +
            '正方向用 $+$（可省），负方向用 $-$（不可省）',
            'cool'
          );

          return anim ? delay(300) : Promise.resolve();
        }
      }
    ]
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
