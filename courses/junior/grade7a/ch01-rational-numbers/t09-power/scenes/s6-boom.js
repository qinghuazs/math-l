// s6-boom.js  六、折纸回归——指数爆炸（4步）
// 数学验算：
//   2^20 = 1048576 层，厚度 = 0.1×1048576 = 104857.6mm ≈ 104.9m
//   2^26 = 67108864 层，厚度 = 0.1×67108864 = 6710886.4mm ≈ 6710.9m（不足珠峰8848.86m）
//   2^27 = 134217728 层，厚度 = 0.1×134217728 = 13421772.8mm ≈ 13421.8m（首超珠峰）
//   珠峰高 8848.86m = 8848860mm
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var WARM   = '#e64a19';
  var COOL   = '#1565c0';
  var TEAL   = '#00796b';
  var GREEN  = '#2e7d32';
  var RED    = '#c62828';
  var ORANGE = '#e65100';
  var GRAY   = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、折纸回归——指数爆炸',
    bbox: [-1, 11, 14, -2],
    board: { axis: false, keepAspect: false },
    expectSteps: 4,
    setup: function (stage, panel) {
      S = stage;
      P = panel;
    },
    steps: [
      // Step 1：揭晓 2^20 厚度 + 三柱对比（一张纸/20层楼/对折20次）
      {
        narration: '还记得开场的折纸悬念吗？现在我们有了乘方工具，来揭晓答案。对折 20 次等于 2 的 20 次方等于 1048576 层！厚度是 0.1 乘以 1048576 毫米，大约 104.9 米。直观对比：一张纸只有 0.1 毫米，20 层楼大约 60 米，而对折 20 次居然超过 100 米！',
        enter: function (anim) {
          S.actor('s6-title', 6.5, 10.2, '<b>揭晓！对折 $2^{20}$ 次的厚度</b>', { color: WARM, size: 19 });

          // X 轴
          S.addSegment('s6-xaxis', [0, 0], [13, 0], { color: INK, width: 2 });

          // 比例尺：105m 对应 8 单位高度
          // 一张纸 0.1mm ≈ 0（不可见，画极细柱 0.005 单位）
          // 20层楼 ~60m → 60/105*8≈4.57
          // 对折20次 104.9m → 104.9/105*8≈7.99

          var SCALE = 8.0 / 105.0; // 每米对应的画面单位

          var bars = [
            { id: 's6-b-paper', cx: 2, h: 0.05, label: '一张纸', sub: '0.0001m', color: GRAY },
            { id: 's6-b-20f',   cx: 5.5, h: 60 * SCALE, label: '20层楼', sub: '≈60m', color: TEAL },
            { id: 's6-b-fold20',cx: 9, h: 104.9 * SCALE, label: '对折20次', sub: '≈104.9m', color: WARM }
          ];

          if (!anim) {
            for (var i = 0; i < bars.length; i++) {
              var b = bars[i];
              S.addBar(b.id, b.cx, 1.2, b.h, { color: b.color, opacity: 0.85 });
              S.actor(b.id + '-xl', b.cx, -0.65, b.label, { color: INK, size: 13 });
              S.actor(b.id + '-sub', b.cx, -1.3, b.sub, { color: b.color, size: 12 });
              if (b.h > 0.3) {
                S.actor(b.id + '-hl', b.cx, b.h + 0.35, b.sub, { color: b.color, size: 13 });
              }
            }
            P.renderCard(
              '<b>揭晓：$2^{20} = 1048576$ 层</b><br>' +
              '厚度 $= 0.1 \\times 2^{20} \\approx 104.9$ 米<br>' +
              '相当于超过 35 层楼高（每层约 3 米）！<br>' +
              '你猜对了吗？'
            );
            return Promise.resolve();
          }

          // 动画：逐柱生长
          var idx2 = 0;
          function nextBar2() {
            if (idx2 >= bars.length) {
              P.renderCard(
                '<b>揭晓：$2^{20} = 1048576$ 层</b><br>' +
                '厚度 $= 0.1 \\times 2^{20} \\approx 104.9$ 米<br>' +
                '相当于超过 35 层楼高（每层约 3 米）！<br>' +
                '你猜对了吗？',
                'warm'
              );
              return Promise.resolve();
            }
            var b2 = bars[idx2];
            var finalH2 = b2.h;
            S.addBar(b2.id, b2.cx, 1.2, 0, { color: b2.color, opacity: 0.85 });
            S.actor(b2.id + '-xl', b2.cx, -0.65, b2.label, { color: INK, size: 13 });
            var res2 = S.animate({
              from: 0, to: finalH2, duration: 500,
              onUpdate: function (v) {
                S.addBar(b2.id, b2.cx, 1.2, v, { color: b2.color, opacity: 0.85 });
              }
            });
            idx2++;
            return res2.then(function () {
              S.actor(b2.id + '-sub', b2.cx, -1.3, bars[idx2 - 1].sub, { color: bars[idx2 - 1].color, size: 12 });
              if (finalH2 > 0.3) {
                S.actor(b2.id + '-hl', b2.cx, finalH2 + 0.35, bars[idx2 - 1].sub, { color: bars[idx2 - 1].color, size: 13 });
              }
              return delay(200);
            }).then(nextBar2);
          }
          return nextBar2();
        },
      },

      // Step 2：追问——多少次超珠峰？
      {
        narration: '太震撼了！那能不能折得更高——超过珠穆朗玛峰呢？珠峰高 8848.86 米，换算成毫米是 8848860 毫米。我们来用 2 的 n 次方来追问：要让 0.1 乘以 2 的 n 次方大于 8848860 毫米，n 需要多大？先试试 26 次。',
        enter: function (anim) {
          // 清掉上一步的柱和标签
          S.remove('s6-b-paper'); S.remove('s6-b-20f'); S.remove('s6-b-fold20');
          S.remove('s6-b-paper-xl'); S.remove('s6-b-20f-xl'); S.remove('s6-b-fold20-xl');
          S.remove('s6-b-paper-sub'); S.remove('s6-b-20f-sub'); S.remove('s6-b-fold20-sub');
          S.remove('s6-b-paper-hl'); S.remove('s6-b-20f-hl'); S.remove('s6-b-fold20-hl');
          S.remove('s6-title'); S.remove('s6-xaxis');

          S.actor('s6-q-title', 6.5, 10.2, '<b>对折多少次超过珠峰？</b>', { color: COOL, size: 19 });
          S.actor('s6-q-mt', 6.5, 8.8,
            '珠峰高 $\\approx 8848.86$ 米 $= 8848860$ mm',
            { color: TEAL, size: 16 });
          S.actor('s6-q-cond', 6.5, 7.4,
            '条件：$0.1 \\times 2^{n} \\gt 8848860$ mm',
            { color: INK, size: 16 });
          S.actor('s6-q-hint', 6.5, 5.8,
            '即 $2^{n} \\gt 88488600$',
            { color: INK, size: 16 });
          S.actor('s6-q-try26', 6.5, 4.0,
            '先试 $n=26$：$2^{26}=67108864 \\approx 6710.9$ 米',
            { color: WARM, size: 15 });
          S.actor('s6-q-26res', 6.5, 2.6,
            '6710.9 米 $\\lt$ 8848.86 米 ——还不够！',
            { color: RED, size: 15 });

          P.renderCard(
            '<b>追问：超越珠峰</b><br>' +
            '珠峰 $\\approx 8848.86$ 米<br>' +
            '折 $26$ 次：$2^{26}=67108864$ 层，约 $6710.9$ 米<br>' +
            '$6710.9 \\lt 8848.86$——不够！再试 $27$ 次'
          );

          return anim ? delay(300) : Promise.resolve();
        },
      },

      // Step 3：26次不够、27次首超——对比柱动画
      {
        narration: '26 次不够，那 27 次呢？2 的 27 次方等于 134217728 层，厚度约 13421.8 米，远超珠峰的 8848.86 米！我们用柱状图来直观对比：珠峰、折26次、折27次——看谁最高！',
        enter: function (anim) {
          S.remove('s6-q-title'); S.remove('s6-q-mt'); S.remove('s6-q-cond');
          S.remove('s6-q-hint'); S.remove('s6-q-try26'); S.remove('s6-q-26res');

          S.actor('s6-cmp-title', 6.5, 10.2, '<b>对折 26 次 vs 27 次 vs 珠峰</b>', { color: COOL, size: 18 });

          // X 轴
          S.addSegment('s6-cmp-xaxis', [0, 0], [13, 0], { color: INK, width: 2 });

          // 比例尺：13421m 对应 8 单位
          var SC2 = 8.0 / 13421.0;

          var cmpBars = [
            { id: 's6-cb-26',  cx: 2.5,  h: 6710.9 * SC2,  label: '折26次', sub: '≈6711m', color: ORANGE },
            { id: 's6-cb-mt',  cx: 6.5,  h: 8848.86 * SC2, label: '珠峰',   sub: '8848m',  color: TEAL  },
            { id: 's6-cb-27',  cx: 10.5, h: 13421.8 * SC2, label: '折27次', sub: '≈13422m',color: WARM  }
          ];

          if (!anim) {
            for (var j = 0; j < cmpBars.length; j++) {
              var cb = cmpBars[j];
              S.addBar(cb.id, cb.cx, 1.2, cb.h, { color: cb.color, opacity: 0.85 });
              S.actor(cb.id + '-xl', cb.cx, -0.7, cb.label, { color: INK, size: 13 });
              S.actor(cb.id + '-hl', cb.cx, cb.h + 0.3, cb.sub, { color: cb.color, size: 12 });
            }
            P.renderCard(
              '<b>$n=27$ 首次超越珠峰！</b><br>' +
              '折 $26$ 次：约 $6710.9$ 米（不够）<br>' +
              '珠峰：$8848.86$ 米<br>' +
              '折 $27$ 次：$2^{27}=134217728$ 层，约 $13421.8$ 米 ✓'
            );
            return Promise.resolve();
          }

          // 动画生长
          var idxC = 0;
          function nextCmp() {
            if (idxC >= cmpBars.length) {
              P.renderCard(
                '<b>$n=27$ 首次超越珠峰！</b><br>' +
                '折 $26$ 次：约 $6710.9$ 米（不够）<br>' +
                '珠峰：$8848.86$ 米<br>' +
                '折 $27$ 次：$2^{27}=134217728$ 层，约 $13421.8$ 米 ✓',
                'warm'
              );
              return Promise.resolve();
            }
            var cb2 = cmpBars[idxC];
            var finalHC = cb2.h;
            S.addBar(cb2.id, cb2.cx, 1.2, 0, { color: cb2.color, opacity: 0.85 });
            S.actor(cb2.id + '-xl', cb2.cx, -0.7, cb2.label, { color: INK, size: 13 });
            var resC = S.animate({
              from: 0, to: finalHC, duration: 600,
              onUpdate: function (v) {
                S.addBar(cb2.id, cb2.cx, 1.2, v, { color: cb2.color, opacity: 0.85 });
              }
            });
            idxC++;
            return resC.then(function () {
              S.addBar(cb2.id, cb2.cx, 1.2, finalHC, { color: cb2.color, opacity: 0.85 });
              S.actor(cb2.id + '-hl', cb2.cx, finalHC + 0.3, cb2.sub, { color: cb2.color, size: 12 });
              return delay(300);
            }).then(nextCmp);
          }
          return nextCmp();
        },
      },

      // Step 4：小结填空 + 悬念下节课
      {
        narration: '对折 27 次，一张薄薄的纸居然能达到 13421 米，超越珠峰！这就是指数增长的威力——乘方让数字飞速变大。最后，我们来完成课堂填空小结，再带一个悬念进下节课。',
        enter: function (anim) {
          S.remove('s6-cmp-title'); S.remove('s6-cmp-xaxis');
          S.remove('s6-cb-26'); S.remove('s6-cb-mt'); S.remove('s6-cb-27');
          S.remove('s6-cb-26-xl'); S.remove('s6-cb-mt-xl'); S.remove('s6-cb-27-xl');
          S.remove('s6-cb-26-hl'); S.remove('s6-cb-mt-hl'); S.remove('s6-cb-27-hl');

          S.actor('s6-sum-title', 6.5, 10.2, '<b>课堂小结 + 悬念</b>', { color: WARM, size: 20 });

          // 填空小结
          S.actor('s6-fill1', 6.5, 8.5,
            '$a^{n}$ 中，$a$ 叫【？】，$n$ 叫【？】，结果叫【？】',
            { color: INK, size: 15 });
          S.actor('s6-fill1-a', 6.5, 7.4,
            '→ <b>底数</b>；<b>指数</b>；<b>幂</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-fill2', 6.5, 6.2,
            '负数奇次幂是【？】，偶次幂是【？】',
            { color: INK, size: 15 });
          S.actor('s6-fill2-a', 6.5, 5.2,
            '→ <b>负数</b>；<b>正数</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-fill3', 6.5, 4.0,
            '混合运算：先【？】，再【？】，后【？】',
            { color: INK, size: 15 });
          S.actor('s6-fill3-a', 6.5, 3.0,
            '→ 先<b>乘方</b>，再<b>乘除</b>，后<b>加减</b>',
            { color: GREEN, size: 15 });

          // 悬念
          S.addSegment('s6-div', [1, 1.8], [12, 1.8], { color: GRAY, width: 1, dash: 1 });
          S.actor('s6-sus-label', 6.5, 1.2, '下节课悬念', { color: TEAL, size: 16, bold: true });
          S.actor('s6-sus-q', 6.5, 0.1,
            '$2^{27} = 134217728$——这一长串数字有没有聪明记法？',
            { color: TEAL, size: 14 });
          S.actor('s6-sus-hint', 6.5, -0.9,
            '下节课：<b>科学记数法</b>，敬请期待！',
            { color: WARM, size: 15 });

          P.renderCard(
            '<b>课堂小结</b><br>' +
            '底数 · 指数 · 幂：乘方三要素<br>' +
            '奇负偶正：负数乘方的符号规律<br>' +
            '先乘方→再乘除→后加减：混合运算章程<br>' +
            '<b>下节课</b>：$2^{27}=134217728$ 有没有简洁记法？',
            'cool'
          );

          return anim ? delay(400) : Promise.resolve();
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
