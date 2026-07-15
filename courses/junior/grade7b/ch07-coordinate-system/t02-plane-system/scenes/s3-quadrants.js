(function (CW) {
  'use strict';

  var S, P;

  // 象限颜色（淡色）
  var C_Q1 = '#ffccbc';   // 第一象限：暖橙
  var C_Q2 = '#c8e6c9';   // 第二象限：绿
  var C_Q3 = '#b3e5fc';   // 第三象限：蓝
  var C_Q4 = '#f3e5f5';   // 第四象限：紫

  // 象限罗马数字颜色
  var C_Q1T = '#bf360c';
  var C_Q2T = '#2e7d32';
  var C_Q3T = '#01579b';
  var C_Q4T = '#6a1b9a';

  var C_NOTE = '#455a64';

  var BBOX = [-6, 6, 6, -6];
  var SHADE_OP = 0.35;

  function shadeQ1() {
    S.shadeRect('s3-q1', 0, 0, 5.8, 5.8, { color: C_Q1, opacity: SHADE_OP });
    S.addText('s3-q1t', 2.5, 3, 'Ⅰ', { color: C_Q1T, size: 28 });
  }

  function shadeQ2() {
    S.shadeRect('s3-q2', -5.8, 0, 0, 5.8, { color: C_Q2, opacity: SHADE_OP });
    S.addText('s3-q2t', -3.5, 3, 'Ⅱ', { color: C_Q2T, size: 28 });
  }

  function shadeQ3() {
    S.shadeRect('s3-q3', -5.8, -5.8, 0, 0, { color: C_Q3, opacity: SHADE_OP });
    S.addText('s3-q3t', -3.5, -2.5, 'Ⅲ', { color: C_Q3T, size: 28 });
  }

  function shadeQ4() {
    S.shadeRect('s3-q4', 0, -5.8, 5.8, 0, { color: C_Q4, opacity: SHADE_OP });
    S.addText('s3-q4t', 2.5, -2.5, 'Ⅳ', { color: C_Q4T, size: 28 });
  }

  var scene = {
    id: 's3',
    title: '三、四个象限',
    board: {},
    bbox: BBOX,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      {
        narration: '$x$ 轴和 $y$ 轴把平面分成了<b>四个区域</b>。' +
          '右上方的区域是<b>第一象限</b>（Ⅰ）——$x>0$ 且 $y>0$。',
        enter: function (anim) {
          P.clearExtras();
          if (anim) {
            return new Promise(function (res) {
              setTimeout(function () {
                shadeQ1();
                P.renderCard(
                  '<b>第一象限 Ⅰ</b><br>$x>0$，$y>0$（右上方）',
                  'warm', 'fadeIn'
                );
                res();
              }, 200);
            });
          }
          shadeQ1();
          P.renderCard('<b>第一象限 Ⅰ</b><br>$x>0$，$y>0$（右上方）', 'warm');
        },
      },
      {
        narration: '按<b>逆时针</b>方向，左上方是<b>第二象限</b>（Ⅱ）——$x<0$ 且 $y>0$。',
        enter: function (anim) {
          P.clearExtras();
          shadeQ1();
          if (anim) {
            return new Promise(function (res) {
              setTimeout(function () {
                shadeQ2();
                P.renderCard(
                  '<b>第二象限 Ⅱ</b><br>$x<0$，$y>0$（左上方）',
                  'cool', 'fadeIn'
                );
                res();
              }, 200);
            });
          }
          shadeQ2();
          P.renderCard('<b>第二象限 Ⅱ</b><br>$x<0$，$y>0$（左上方）', 'cool');
        },
      },
      {
        narration: '继续逆时针，左下方是<b>第三象限</b>（Ⅲ）——$x<0$ 且 $y<0$。',
        enter: function (anim) {
          P.clearExtras();
          shadeQ1();
          shadeQ2();
          if (anim) {
            return new Promise(function (res) {
              setTimeout(function () {
                shadeQ3();
                P.renderCard(
                  '<b>第三象限 Ⅲ</b><br>$x<0$，$y<0$（左下方）',
                  'cool', 'fadeIn'
                );
                res();
              }, 200);
            });
          }
          shadeQ3();
          P.renderCard('<b>第三象限 Ⅲ</b><br>$x<0$，$y<0$（左下方）', 'cool');
        },
      },
      {
        narration: '最后，右下方是<b>第四象限</b>（Ⅳ）——$x>0$ 且 $y<0$。' +
          '四个象限按<b>逆时针顺序</b>编号：Ⅰ→Ⅱ→Ⅲ→Ⅳ。',
        enter: function (anim) {
          P.clearExtras();
          shadeQ1();
          shadeQ2();
          shadeQ3();
          if (anim) {
            return new Promise(function (res) {
              setTimeout(function () {
                shadeQ4();
                P.renderCard(
                  '<b>第四象限 Ⅳ</b><br>$x>0$，$y<0$（右下方）',
                  '', 'fadeIn'
                );
                res();
              }, 200);
            });
          }
          shadeQ4();
          P.renderCard('<b>第四象限 Ⅳ</b><br>$x>0$，$y<0$（右下方）', '');
        },
      },
      {
        narration: '<b>特别注意</b>：坐标轴上的点（包括原点 $O$）<b>不属于任何象限</b>！' +
          '象限只指两轴之间的开放区域，轴上的点是"边界"，不算在任何象限内。',
        enter: function () {
          P.clearExtras();
          shadeQ1();
          shadeQ2();
          shadeQ3();
          shadeQ4();
          // 在轴上标注警告
          S.addText('s3-warn1', -5.5, 0.3, '← 轴上的点不属于任何象限', { color: C_NOTE, size: 13 });
          S.addText('s3-warn2', 0.2, -5.2, '↑ 同上', { color: C_NOTE, size: 13 });
          P.renderCard(
            '<b>⚠ 重要提醒</b><br>' +
            '坐标轴（$x$ 轴、$y$ 轴）上的点，<br>' +
            '包括原点 $O$，<b>不属于任何象限</b>',
            'warm', 'tada'
          );
        },
      },
    ],
  };

  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
