(function (CW) {
  'use strict';
  var S, P;
  var BLUE = '#1565c0', INK = '#455a64', WARM = '#e64a19', GREEN = '#2e7d32', PURPLE = '#6a1b9a';

  // 题目情境数据
  var CASE1 = {
    desc: '某工厂生产了一批灯泡，共 10000 个。为检测质量，随机抽取了 500 个灯泡进行寿命测试。',
    total: '该批 10000 个灯泡的<b>寿命</b>',
    indiv: '每一个灯泡的<b>寿命</b>',
    sample: '被抽取的 500 个灯泡的<b>寿命</b>',
    n: '500（纯数，无单位）',
  };

  var CASE2 = {
    desc: '某市有 5 万名初中生，为了解他们每天的课外阅读时间，随机调查了 800 名初中生。',
    total: '该市全体初中生每天的<b>课外阅读时间</b>',
    indiv: '每一名初中生每天的<b>课外阅读时间</b>',
    sample: '被调查的 800 名初中生每天的<b>课外阅读时间</b>',
    n: '800（纯数，无单位）',
  };

  var scene = {
    id: 's4',
    title: '四、辨析练习',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '来做第一道题！题目：某工厂生产了一批灯泡共 10000 个，随机抽取 500 个进行寿命测试。请分别指出总体、个体、样本和样本容量。注意："总体"和"个体"不是"灯泡本身"，而是灯泡的"寿命"——我们考察的指标！',
        enter: function () {
          S.addText('s4-q1-title', 0, 6.8, '练习 1', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('s4-q1-desc1', -9, 5.5, '某工厂生产了一批灯泡，共 10000 个。', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s4-q1-desc2', -9, 4.3, '随机抽取 500 个灯泡进行寿命测试。', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s4-q1-ask', -9, 3.0, '指出：总体、个体、样本、样本容量各是什么？', { size: 15, color: WARM, anchorX: 'left' });
          P.renderCard('提示：关键词是<b>"寿命"</b>——考察的指标是寿命，不是灯泡本身！');
        },
      },
      {
        narration: '答案揭晓：总体是该批 10000 个灯泡的寿命（注意：是"寿命"，不是"灯泡"）；个体是每一个灯泡的寿命；样本是被抽取的 500 个灯泡的寿命；样本容量是 500，不带单位！',
        enter: function () {
          P.renderTable({
            head: ['概念', '答案'],
            rows: [
              ['总体', CASE1.total],
              ['个体', CASE1.indiv],
              ['样本', CASE1.sample],
              ['样本容量', CASE1.n],
            ],
          });
          // 在画板上显示"易错提醒"
          S.addText('s4-warn1', 0, 1.5, '易错 ①：总体是"灯泡的寿命"，不是"灯泡"', { size: 14, color: WARM, anchorX: 'middle' });
          S.addText('s4-warn2', 0, 0.3, '易错 ②：样本容量是 500（纯数），不是"500个"', { size: 14, color: WARM, anchorX: 'middle' });
        },
      },
      {
        narration: '第二道题：某市有 5 万名初中生，为了解每天的课外阅读时间，随机调查了 800 名学生。同样的方法，先想：我们考察的"数量指标"是什么？——是"课外阅读时间"！',
        enter: function () {
          S.addText('s4-q2-title', 0, 6.8, '练习 2', { size: 18, color: BLUE, anchorX: 'middle' });
          S.addText('s4-q2-desc1', -9, 5.5, '某市有 5 万名初中生，', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s4-q2-desc2', -9, 4.3, '为了解每天课外阅读时间，随机调查了 800 名初中生。', { size: 15, color: INK, anchorX: 'left' });
          S.addText('s4-q2-ask', -9, 3.0, '指出：总体、个体、样本、样本容量各是什么？', { size: 15, color: WARM, anchorX: 'left' });
          P.renderCard('先找考察的<b>数量指标</b>：课外阅读<b>时间</b><br>总体 = 全市5万名初中生的课外阅读时间');
        },
      },
      {
        narration: '答案：总体是该市全体初中生每天的课外阅读时间；个体是每一名初中生每天的课外阅读时间；样本是被调查的 800 名初中生每天的课外阅读时间；样本容量是 800。',
        enter: function () {
          P.renderTable({
            head: ['概念', '答案'],
            rows: [
              ['总体', CASE2.total],
              ['个体', CASE2.indiv],
              ['样本', CASE2.sample],
              ['样本容量', CASE2.n],
            ],
          });
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
