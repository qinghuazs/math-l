// s6-summary.js  六、易错辨析与小结（3步）
// 数学验算：
//   判断1：(-3)+(-5)，绝对值相加=8，但结果应为-8（需加负号），直接当答案→错 ✓
//   判断2：(-3)+5，异号绝对值应相减，5-3=2，结果+2；若用相加=8则错 ✓
//   判断3：8+(-8)=0，互为相反数，正确 ✓
//   悬念：(-3)-4：有理数减法下节课
(function (CW) {
  'use strict';
  var S, P;
  var INK  = '#455a64';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var TEAL = '#00796b';
  var GREEN = '#2e7d32';
  var RED = '#c62828';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与小结',
    bbox: [-11, 9, 11, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：三连判断题
      {
        narration: '最后来做三道易错判断题，巩固法则。判断一：两个负数相加，把绝对值相加的结果直接作为答案——比如(-3)+(-5)，绝对值相加得8，直接说答案是8，对不对？判断二：计算(-3)+5，异号，3小于5所以取正，然后把3和5相加得8，结果+8，对不对？判断三：8+(-8)=0，因为互为相反数——对不对？',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.8, '<b>易错辨析——判断三连</b>', { color: WARM, size: 20 });
          // 判断1
          S.actor('s6-j1-t', 0, 6.5, '<b>判断①</b>　两个负数相加，绝对值相加的结果就是答案。', { color: INK, size: 16 });
          S.actor('s6-j1-eg', 0, 5.5, '例：$(-3)+(-5)$，$3+5=8$，答案是 $8$？', { color: INK, size: 16 });
          S.actor('s6-j1-ans', 4, 4.5, '<b>✗ 错误！</b>结果应为 $-8$，<b>忘了加负号！</b>', { color: RED, size: 16 });
          S.addSegment('s6-div1', [-9, 4.0], [9, 4.0], { color: GRAY, width: 1, dash: 2 });
          // 判断2
          S.actor('s6-j2-t', 0, 3.3, '<b>判断②</b>　计算 $(-3)+5$，异号，$3\\lt 5$，取正，$3+5=8$，结果 $+8$。', { color: INK, size: 15 });
          S.actor('s6-j2-ans', 4, 2.3, '<b>✗ 错误！</b>异号应绝对值<b>相减</b>：$5-3=2$，结果 $+2$', { color: RED, size: 15 });
          S.addSegment('s6-div2', [-9, 1.7], [9, 1.7], { color: GRAY, width: 1, dash: 2 });
          // 判断3
          S.actor('s6-j3-t', 0, 1.0, '<b>判断③</b>　$8+(-8)=0$，因为互为相反数。', { color: INK, size: 16 });
          S.actor('s6-j3-ans', 4, 0.0, '<b>✓ 正确！</b>法则三的直接应用。', { color: GREEN, size: 16 });
          P.renderCard(
            '<b>易错辨析</b><br>' +
            '① 同号相加：绝对值相加后<b>必须加符号</b>（结果 $-8$，不是 $8$）<br>' +
            '② 异号相加：绝对值应<b>相减</b>（$5-3=2$，不是 $5+3=8$）<br>' +
            '③ $8+(-8)=0$ ✓（互为相反数之和为 $0$）',
            'warm',
            'headShake'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
      // Step 2：小结填空
      {
        narration: '很好！现在来填小结。有理数加法，先判断两个加数是同号还是异号。同号两数相加：取相同的符号，绝对值相加。异号两数相加：取绝对值较大加数的符号，绝对值相减。互为相反数的两数之和为0；任何数与0相加等于它本身。简便运算：利用加法运算律改变顺序，凑零或凑整。',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-j1-t'); S.remove('s6-j1-eg'); S.remove('s6-j1-ans'); S.remove('s6-div1');
          S.remove('s6-j2-t'); S.remove('s6-j2-ans'); S.remove('s6-div2');
          S.remove('s6-j3-t'); S.remove('s6-j3-ans');
          S.actor('s6-sum-t', 0, 7.8, '<b>课堂小结</b>', { color: TEAL, size: 22 });
          P.renderCard(
            '<b>有理数加法小结</b><br>' +
            '<b>先判断</b>：同号 / 异号？<br>' +
            '同号：取<b>相同符号</b>，绝对值<b>相加</b><br>' +
            '异号：取<b>绝对值较大</b>加数的符号，绝对值<b>相减</b><br>' +
            '特殊：互为相反数之和为 $0$；与 $0$ 之和不变<br>' +
            '"<b>两步走</b>"：先定符号，再算绝对值<br>' +
            '简便：交换律＋结合律，凑零或凑整',
            'teal'
          );
          return anim ? delay(300) : Promise.resolve();
        },
      },
      // Step 3：悬念——减法下节课
      {
        narration: '加法我们掌握了。那减法呢？天气预报说今天零下3摄氏度，比昨天零上4摄氏度低多少度？写成算式是(-3)-4=？减号后面出现负数，怎么办？这能不能用今天学的加法来解决？答案是——能！下节课《有理数的减法》，见分晓！',
        enter: function (anim) {
          S.actor('s6-sus-icon', 0, 5.5, '❄️  →  ☀️', { color: INK, size: 24 });
          S.actor('s6-sus-q', 0, 3.8, '今天 $-3$℃　昨天 $+4$℃', { color: COOL, size: 20 });
          S.actor('s6-sus-qs', 0, 2.4, '低多少度？', { color: INK, size: 20 });
          S.actor('s6-sus-eq', 0, 1.0, '$(-3) - 4 = ?$', { color: WARM, size: 26 });
          S.actor('s6-sus-hint', 0, -0.6, '减法能化为加法来算？', { color: TEAL, size: 18 });
          S.actor('s6-sus-next', 0, -2.2, '下节课《有理数的减法》揭晓！', { color: INK, size: 17 });
          P.renderCard(
            '<b>留个悬念</b><br>' +
            '$(-3) - 4 = ?$<br>' +
            '有理数的减法，能转化为加法解决吗？<br>' +
            '<b>下节课《有理数的减法》见分晓！</b>',
            'cool',
            'headShake'
          );
          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
