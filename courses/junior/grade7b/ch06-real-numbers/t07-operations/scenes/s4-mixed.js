(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', BLUE = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', RED = '#c62828', AMBER = '#f57f17';
  var IDS = [];

  function clearAll() {
    IDS.forEach(function (id) { S.remove(id); });
    IDS = [];
  }
  function keep(id) { IDS.push(id); return id; }
  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's4',
    title: '四、混合运算与近似计算',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
      IDS = [];
    },
    steps: [
      {
        narration: '运算顺序和有理数一样！口诀：先乘方开方，再乘除，最后加减，有括号先算括号内。现在我们来计算例题 $\\sqrt{9}+\\sqrt[3]{-8}-|-2|$，按顺序分三步走。',
        enter: function () {
          clearAll();
          P.renderTable({
            head: ['运算顺序', '规则', '例子'],
            rows: [
              ['第 1 优先', '乘方、开方', '$\\sqrt{9}=3$，$\\sqrt[3]{-8}=-2$'],
              ['第 2 优先', '乘法、除法', '$3\\times(-2)$'],
              ['第 3 优先', '加法、减法', '$3+(-2)-2$'],
              ['最高优先', '括号内部', '先算括号里的'],
            ],
          });
          S.actor(keep('s4-title'), 0, 5.8, '运算顺序：乘方/开方 → 乘除 → 加减', { size: 20, bold: true, color: BLUE });
        },
      },
      {
        narration: '分步演算 $\\sqrt{9}+\\sqrt[3]{-8}-|-2|$。第一步：把每个开方/绝对值分别算出来；第二步：把结果代入，变成整数加减法；第三步：最终得到结果。',
        enter: function (anim) {
          clearAll();
          S.actor(keep('s4-ex-title'), 0, 6.5, '例题：$\\sqrt{9}+\\sqrt[3]{-8}-|-2|$', { size: 22, bold: true, color: PURPLE });

          var rows = [
            ['s4-s1', '第一步：分别开方和求绝对值', AMBER, 18],
            ['s4-s2', '$\\sqrt{9}=3$，  $\\sqrt[3]{-8}=-2$，  $|-2|=2$', BLUE, 20],
            ['s4-s3', '第二步：代入原式', AMBER, 18],
            ['s4-s4', '$= 3+(-2)-2$', INK, 22],
            ['s4-s5', '第三步：依次加减', AMBER, 18],
            ['s4-s6', '$= 3-2-2 = -1$', GREEN, 28],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 4.8 - i * 1.7, r[1], { size: r[2], color: r[3], bold: i === 5 });
              return anim ? delay(550) : null;
            });
          });
          return p.then(function () {
            P.renderCard('$\\sqrt{9}+\\sqrt[3]{-8}-|-2|=3+(-2)-2=-1$', 'cool');
          });
        },
      },
      {
        narration: '近似计算：有时候无理数的精确值无法写出，需要按题目要求取近似值。精确到百分位（0.01）就是保留小数点后两位，看第三位四舍五入。',
        enter: function () {
          clearAll();
          P.renderCard(
            '<b>近似计算要求</b><br>' +
            '精确到个位 → 结果保留到整数<br>' +
            '精确到十分位 → 结果保留一位小数<br>' +
            '精确到百分位（0.01）→ 结果保留两位小数<br>' +
            '保留 n 位有效数字 → 从第一个非零数字起数 n 位',
            'warm'
          );
          S.actor(keep('s4-aprx-title'), 0, 5.8, '近似计算：按题目要求保留位数', { size: 20, bold: true, color: BLUE });
        },
      },
      {
        narration: '例题：计算 $\\sqrt{2}+\\pi$，结果精确到百分位（0.01）。取 $\\sqrt{2}\\approx 1.414$，$\\pi\\approx 3.142$，相加得约 4.556，精确到百分位四舍五入为 $4.56$。',
        enter: function (anim) {
          clearAll();
          S.actor(keep('s4-ap-title'), 0, 6.5, '近似计算：$\\sqrt{2}+\\pi$（精确到 0.01）', { size: 20, bold: true, color: PURPLE });

          var rows = [
            ['s4-ap1', '取近似值：$\\sqrt{2}\\approx 1.414$，$\\pi\\approx 3.142$', BLUE, 20],
            ['s4-ap2', '$\\sqrt{2}+\\pi$', INK, 26],
            ['s4-ap3', '$\\approx 1.414+3.142$', INK, 24],
            ['s4-ap4', '$= 4.556$', AMBER, 24],
            ['s4-ap5', '$\\approx 4.56$（精确到百分位）', GREEN, 26],
          ];
          var p = Promise.resolve();
          rows.forEach(function (r, i) {
            p = p.then(function () {
              S.actor(keep(r[0]), 0, 4.5 - i * 2.0, r[1], { size: r[2], color: r[3], bold: i === 4 });
              return anim ? delay(600) : null;
            });
          });
          return p.then(function () {
            P.renderCard(
              '$\\sqrt{2}+\\pi\\approx 1.414+3.142=4.556\\approx 4.56$<br><br>' +
              '注意：近似符号 ≈ 必须保留，结果带单位（如有）。',
              'cool'
            );
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
