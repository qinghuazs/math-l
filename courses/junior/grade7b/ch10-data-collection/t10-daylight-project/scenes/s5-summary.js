(function (CW) {
  'use strict';
  var S, P;
  var WARM = '#e64a19', COOL = '#1565c0', GREEN = '#2e7d32', PURPLE = '#6a1b9a', INK = '#455a64';

  var scene = {
    id: 's5',
    title: '五、单元总结与收官',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '白昼探究到这里就完成了。让我们回头看看——这一整章，我们究竟学了些什么？其实就是一条完整的<b>数据处理链条</b>。',
        enter: function () {
          P.renderTable({
            head: ['环节', '本章内容'],
            rows: [
              ['怎样调查', '全面调查、抽样调查；总体、个体、样本、样本容量'],
              ['怎样收集', '问卷设计、查阅资料；用样本估计总体'],
              ['怎样整理', '划记、频数、频率、频数分布表'],
              ['怎样描述', '统计表、条形图、扇形图、折线图、频数分布直方图'],
              ['理性读图', '识别误导性统计图，做聪明的读图人'],
            ],
          });
        },
      },
      {
        narration: '特别要记住<b>四种统计图的用途</b>——这是本章最实用的知识：比较多少用条形图，看部分占整体用扇形图，看变化趋势用折线图，看数据分布用直方图。选对图，数据才会"说话"。',
        enter: function () {
          S.actor('s5-t', 0, 6, '四种统计图，各显神通', { color: PURPLE, size: 22, bold: true });
          S.actor('s5-bar', -6, 2, '条形图\n比多少', { color: COOL, size: 17, bold: true, css: 'background:#e3f2fd;border-radius:8px;padding:8px 14px;' });
          S.actor('s5-pie', -2, 2, '扇形图\n看占比', { color: WARM, size: 17, bold: true, css: 'background:#fbe9e7;border-radius:8px;padding:8px 14px;' });
          S.actor('s5-line', 2, 2, '折线图\n看趋势', { color: GREEN, size: 17, bold: true, css: 'background:#e8f5e9;border-radius:8px;padding:8px 14px;' });
          S.actor('s5-hist', 6, 2, '直方图\n看分布', { color: PURPLE, size: 17, bold: true, css: 'background:#f3e5f5;border-radius:8px;padding:8px 14px;' });
          P.renderCard('条形图→比多少 · 扇形图→看占比<br>折线图→看趋势 · 直方图→看分布', 'cool');
        },
      },
      {
        narration: '从收集数据到发现规律，我们学会了用数学的眼光观察世界、用数据说话。这种<b>数据分析观念</b>，会陪伴你一生。同学们，这一章圆满结束——愿你做一个既会用数据、又不被数据误导的聪明人！',
        enter: function () {
          S.actor('s5-end', 0, 0, '用数据说话，让规律现形！', { color: WARM, size: 26, bold: true });
          P.renderCard('<b>数据分析四步：</b>收集 → 整理 → 描述 → 分析<br>核心素养：<b>数据分析观念</b>——用证据说话，不被表象误导。', 'warm', 'tada');
          P.renderCard('课后实践：收集你家一周的用电量或气温，画一张折线图，说说你发现的规律。', 'cool');
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
