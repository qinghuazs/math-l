// s3-principles.js  设计问卷的原则（4步）★核心
(function (CW) {
  'use strict';
  var S, P;
  var INK    = '#455a64';
  var BLUE   = '#1565c0';
  var GREEN  = '#2e7d32';
  var ORANGE = '#e65100';
  var RED    = '#c62828';
  var PURPLE = '#6a1b9a';
  var GOLD   = '#f9a825';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's3',
    title: '三、设计原则',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      {
        // 步骤1：四大设计原则概述
        narration: '设计调查问卷，光有结构还不够，问题本身的质量才是关键。一份好的问卷，每道问题都要遵循四大原则。第一，"问题明确"——问题语言清晰，没有模糊词；第二，"选项互斥"——每个选项之间不重叠，被调查者不会为选哪个而困惑；第三，"选项完整"——所有可能的答案都被覆盖，通常加一个"其他"选项；第四，"避免诱导"——问题不暗示被调查者该怎么选，保持中立。这四条是检验问卷质量的标准，我们一条一条来看！',
        enter: function (anim) {
          // 标题
          S.addPolygon('title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.8], [-9.5, 5.8]],
            { fillColor: '#fff8e1', fillOpacity: 1, strokeColor: GOLD, strokeWidth: 2 });
          S.addText('title', 0, 6.7, '★ 设计问卷的四大原则', { size: 20, color: GOLD, anchorX: 'middle' });

          // 四条原则
          var principles = [
            { id: 'pr1', y1: 5.3, y2: 3.5, color: BLUE, fill: '#e3f2fd',
              num: '① 问题明确', desc: '语言清晰，无模糊词（"经常""一般"等）' },
            { id: 'pr2', y1: 3.0, y2: 1.2, color: GREEN, fill: '#e8f5e9',
              num: '② 选项互斥', desc: '选项之间不重叠，1只属于一个区间' },
            { id: 'pr3', y1: 0.7, y2: -1.1, color: ORANGE, fill: '#fff3e0',
              num: '③ 选项完整', desc: '覆盖全部可能，必要时设"其他"' },
            { id: 'pr4', y1: -1.6, y2: -3.4, color: RED, fill: '#fce4ec',
              num: '④ 避免诱导', desc: '问题保持中立，不暗示被调查者选哪个' },
          ];

          principles.forEach(function (pr) {
            S.addPolygon(pr.id + '-bg',
              [[-9.5, pr.y1], [9.5, pr.y1], [9.5, pr.y2], [-9.5, pr.y2]],
              { fillColor: pr.fill, fillOpacity: 1, strokeColor: pr.color, strokeWidth: 2 });
            S.addText(pr.id + '-num', -9.0, (pr.y1 + pr.y2) / 2 + 0.3, pr.num,
              { size: 17, color: pr.color });
            S.addText(pr.id + '-desc', -2.0, (pr.y1 + pr.y2) / 2 + 0.3, pr.desc,
              { size: 13, color: INK });
          });

          P.renderCard(
            '<b>问卷四大原则</b><br><br>' +
            '① 问题明确：语言无歧义<br>' +
            '② 选项互斥：不重叠、不交叉<br>' +
            '③ 选项完整：覆盖全部情况<br>' +
            '④ 避免诱导：保持中立立场'
          );
          if (anim) { return delay(400); }
        },
      },
      {
        // 步骤2：原则一&二 — 问题明确 + 选项互斥（对比卡）
        narration: '我们先看前两条原则。原则一"问题明确"，举个例子：题目问"你经常运动吗？"——这里"经常"是什么意思？每天算经常？还是每周一次算经常？不同的人理解不同，这样的回答就没有可比性。改进版本是："你平均每周进行几次不少于30分钟的体育锻炼？"——有具体次数、具体时长，非常明确！再看原则二"选项互斥"：如果选项是"0～1小时、1～2小时、2～3小时"，那1小时应该填哪个？两个选项都含1，造成混乱。正确做法是："不足1小时、1小时及以上不足2小时、2小时及以上不足3小时"——每个区间不重叠，清楚！',
        enter: function (anim) {
          // 清除上一步
          ['pr1','pr2','pr3','pr4'].forEach(function (p) {
            S.remove(p+'-bg'); S.remove(p+'-num'); S.remove(p+'-desc');
          });
          S.remove('title-bg'); S.remove('title');

          // 原则一对比
          S.addPolygon('c1-title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.9], [-9.5, 5.9]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('c1-title', 0, 6.7, '原则① 问题明确', { size: 19, color: BLUE, anchorX: 'middle' });

          // 坏例子
          S.addPolygon('c1-bad-bg',
            [[-9.5, 5.4], [-0.3, 5.4], [-0.3, 2.7], [-9.5, 2.7]],
            { fillColor: '#ffebee', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('c1-bad-tag', -7.5, 5.0, '✗ 不合理', { size: 15, color: RED });
          S.addText('c1-bad-q', -9.0, 4.2, '你经常运动吗？', { size: 14, color: INK });
          S.addText('c1-bad-r', -9.0, 3.3, '"经常"含义不明确，', { size: 12, color: RED });
          S.addText('c1-bad-r2', -9.0, 2.9, '每人理解不同！', { size: 12, color: RED });

          // 好例子
          S.addPolygon('c1-good-bg',
            [[0.3, 5.4], [9.5, 5.4], [9.5, 2.7], [0.3, 2.7]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('c1-good-tag', 1.8, 5.0, '✓ 改进版', { size: 15, color: GREEN });
          S.addText('c1-good-q', 0.7, 4.2, '你平均每周进行几次', { size: 13, color: INK });
          S.addText('c1-good-q2', 0.7, 3.6, '不少于30分钟的', { size: 13, color: INK });
          S.addText('c1-good-q3', 0.7, 3.0, '体育锻炼？', { size: 13, color: INK });

          // 原则二对比
          S.addPolygon('c2-title-bg',
            [[-9.5, 2.2], [9.5, 2.2], [9.5, 0.9], [-9.5, 0.9]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('c2-title', 0, 1.7, '原则② 选项互斥', { size: 19, color: ORANGE, anchorX: 'middle' });

          // 坏例子：选项重叠
          S.addPolygon('c2-bad-bg',
            [[-9.5, 0.4], [-0.3, 0.4], [-0.3, -3.2], [-9.5, -3.2]],
            { fillColor: '#ffebee', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('c2-bad-tag', -7.5, 0.0, '✗ 不合理（有重叠）', { size: 14, color: RED });
          S.addText('c2-bad-op1', -9.0, -0.7, 'A. 0～1小时', { size: 13, color: INK });
          S.addText('c2-bad-op2', -9.0, -1.4, 'B. 1～2小时', { size: 13, color: INK });
          S.addText('c2-bad-op3', -9.0, -2.1, 'C. 2～3小时', { size: 13, color: INK });
          S.addText('c2-bad-note', -9.0, -2.9, '"1"在A和B都出现！', { size: 12, color: RED });

          // 好例子：选项不重叠
          S.addPolygon('c2-good-bg',
            [[0.3, 0.4], [9.5, 0.4], [9.5, -3.2], [0.3, -3.2]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('c2-good-tag', 1.8, 0.0, '✓ 改进版（不重叠）', { size: 14, color: GREEN });
          S.addText('c2-good-op1', 0.7, -0.7, 'A. 不足1小时', { size: 13, color: INK });
          S.addText('c2-good-op2', 0.7, -1.4, 'B. 1小时及以上，不足2小时', { size: 12, color: INK });
          S.addText('c2-good-op3', 0.7, -2.1, 'C. 2小时及以上，不足3小时', { size: 12, color: INK });
          S.addText('c2-good-note', 0.7, -2.9, '每个值只属于一个区间 ✓', { size: 12, color: GREEN });

          P.clearExtras();
          P.renderCard(
            '<b>原则①② 对比</b><br><br>' +
            '<b>明确</b>：用具体数字替代模糊词<br>' +
            '"每周几次">"经常"<br><br>' +
            '<b>互斥</b>：区间端点不重叠<br>' +
            '"不足1小时">"0～1小时"'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤3：原则三&四 — 选项完整 + 避免诱导（对比卡）
        narration: '再看后两条原则。原则三"选项完整"——如果你问"你最喜欢什么课"，选项只列了语数英理化，但有同学最喜欢音乐、美术呢？他就无法填写，这条数据就丢失了。正确做法是加上"其他：___"，让所有人都能找到自己的答案，保证数据完整！原则四"避免诱导"——有些问题听起来就已经在"暗示"你选什么答案了。比如"为了身体健康，你是否赞成每天跑步？"——这问题已经给了暗示：跑步对健康好，你当然应该赞成！这样的问题会导致回答产生偏差，得不到真实的数据。改进版应该是："你对学校每天安排跑步活动的态度是？A.非常赞成 B.赞成 C.中立 D.反对"，中立客观，让被调查者自己判断。',
        enter: function (anim) {
          // 清除上一步
          ['c1-title-bg','c1-title','c1-bad-bg','c1-bad-tag','c1-bad-q','c1-bad-r','c1-bad-r2',
           'c1-good-bg','c1-good-tag','c1-good-q','c1-good-q2','c1-good-q3',
           'c2-title-bg','c2-title','c2-bad-bg','c2-bad-tag','c2-bad-op1','c2-bad-op2',
           'c2-bad-op3','c2-bad-note','c2-good-bg','c2-good-tag','c2-good-op1',
           'c2-good-op2','c2-good-op3','c2-good-note'].forEach(function(id){ S.remove(id); });

          // 原则三对比
          S.addPolygon('c3-title-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 5.9], [-9.5, 5.9]],
            { fillColor: '#fff3e0', fillOpacity: 1, strokeColor: ORANGE, strokeWidth: 2 });
          S.addText('c3-title', 0, 6.7, '原则③ 选项完整', { size: 19, color: ORANGE, anchorX: 'middle' });

          // 坏例子：遗漏选项
          S.addPolygon('c3-bad-bg',
            [[-9.5, 5.4], [-0.3, 5.4], [-0.3, 2.0], [-9.5, 2.0]],
            { fillColor: '#ffebee', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('c3-bad-tag', -7.5, 5.0, '✗ 选项不完整', { size: 15, color: RED });
          S.addText('c3-bad-q', -9.0, 4.2, '你最喜欢什么课？', { size: 14, color: INK });
          S.addText('c3-bad-op', -9.0, 3.4, 'A.语文 B.数学 C.英语', { size: 13, color: INK });
          S.addText('c3-bad-op2', -9.0, 2.7, 'D.理化', { size: 13, color: INK });
          S.addText('c3-bad-note', -9.0, 2.2, '喜欢音乐的同学无法填写！', { size: 11, color: RED });

          // 好例子：加"其他"
          S.addPolygon('c3-good-bg',
            [[0.3, 5.4], [9.5, 5.4], [9.5, 2.0], [0.3, 2.0]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('c3-good-tag', 1.8, 5.0, '✓ 加"其他"', { size: 15, color: GREEN });
          S.addText('c3-good-q', 0.7, 4.2, '你最喜欢什么课？', { size: 14, color: INK });
          S.addText('c3-good-op', 0.7, 3.4, 'A.语文 B.数学 C.英语', { size: 13, color: INK });
          S.addText('c3-good-op2', 0.7, 2.7, 'D.理化 E.其他：___', { size: 13, color: INK });
          S.addText('c3-good-note', 0.7, 2.2, '所有人都能找到答案 ✓', { size: 11, color: GREEN });

          // 原则四对比
          S.addPolygon('c4-title-bg',
            [[-9.5, 1.5], [9.5, 1.5], [9.5, 0.2], [-9.5, 0.2]],
            { fillColor: '#fce4ec', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('c4-title', 0, 1.0, '原则④ 避免诱导', { size: 19, color: RED, anchorX: 'middle' });

          // 坏例子：有诱导
          S.addPolygon('c4-bad-bg',
            [[-9.5, -0.3], [-0.3, -0.3], [-0.3, -4.3], [-9.5, -4.3]],
            { fillColor: '#ffebee', fillOpacity: 1, strokeColor: RED, strokeWidth: 2 });
          S.addText('c4-bad-tag', -7.5, -0.7, '✗ 有诱导性', { size: 15, color: RED });
          S.addText('c4-bad-q', -9.0, -1.5, '为了身体健康，', { size: 13, color: INK });
          S.addText('c4-bad-q2', -9.0, -2.1, '你是否赞成每天跑步？', { size: 13, color: INK });
          S.addText('c4-bad-note', -9.0, -3.0, '"为了健康"在暗示', { size: 12, color: RED });
          S.addText('c4-bad-note2', -9.0, -3.6, '你应该赞成！偏差严重！', { size: 12, color: RED });

          // 好例子：中立
          S.addPolygon('c4-good-bg',
            [[0.3, -0.3], [9.5, -0.3], [9.5, -4.3], [0.3, -4.3]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('c4-good-tag', 1.8, -0.7, '✓ 中立改进版', { size: 15, color: GREEN });
          S.addText('c4-good-q', 0.7, -1.5, '你对学校每天安排', { size: 13, color: INK });
          S.addText('c4-good-q2', 0.7, -2.1, '跑步活动的态度是？', { size: 13, color: INK });
          S.addText('c4-good-op', 0.7, -2.8, 'A.非常赞成 B.赞成', { size: 12, color: INK });
          S.addText('c4-good-op2', 0.7, -3.4, 'C.中立 D.反对', { size: 12, color: INK });
          S.addText('c4-good-note', 0.7, -4.0, '让被调查者自主判断 ✓', { size: 11, color: GREEN });

          P.clearExtras();
          P.renderCard(
            '<b>原则③④ 对比</b><br><br>' +
            '<b>完整</b>：选项覆盖全部情况<br>' +
            '可加"其他：___"兜底<br><br>' +
            '<b>中立</b>：不暗示正确答案<br>' +
            '去掉"为了健康"等前提语'
          );
          if (anim) { return delay(300); }
        },
      },
      {
        // 步骤4：综合反例辨析——评价一份真实问卷
        narration: '现在让我们用四大原则来评价一道真实的问题，看看能发现几个问题。题目是："不考虑费用的话，你不喜欢纸质书阅读吗？A. 不喜欢 B. 喜欢"。我们逐条检查：第一，"不考虑费用"是前提条件，限定了情境，问题不够明确；第二，"你不喜欢……吗"是双重否定式，造成理解困难，问题不明确；第三，选项只有两个，不够完整，没有"无所谓"或"看情况"；第四，"不考虑费用"暗示纸质书很贵，对纸质书有负面引导。一道题居然违反了三条原则！好问题要经得起四条原则的逐一检验。',
        enter: function (anim) {
          // 清除上一步
          ['c3-title-bg','c3-title','c3-bad-bg','c3-bad-tag','c3-bad-q','c3-bad-op',
           'c3-bad-op2','c3-bad-note','c3-good-bg','c3-good-tag','c3-good-q',
           'c3-good-op','c3-good-op2','c3-good-note',
           'c4-title-bg','c4-title','c4-bad-bg','c4-bad-tag','c4-bad-q','c4-bad-q2',
           'c4-bad-note','c4-bad-note2','c4-good-bg','c4-good-tag','c4-good-q',
           'c4-good-q2','c4-good-op','c4-good-op2','c4-good-note'].forEach(function(id){ S.remove(id); });

          // 问题展示
          S.addPolygon('exam-bg',
            [[-9.5, 7.2], [9.5, 7.2], [9.5, 4.5], [-9.5, 4.5]],
            { fillColor: '#fff8e1', fillOpacity: 1, strokeColor: GOLD, strokeWidth: 3 });
          S.addText('exam-title', 0, 6.8, '综合辨析：评价这道题', { size: 18, color: GOLD, anchorX: 'middle' });
          S.addText('exam-q', 0, 6.0, '题：不考虑费用的话，你不喜欢纸质书阅读吗？', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('exam-op', 0, 5.2, 'A. 不喜欢    B. 喜欢', { size: 14, color: INK, anchorX: 'middle' });

          // 四条原则逐条检查
          var checks = [
            { id: 'ck1', y: 3.8, color: RED, pass: false,
              text: '① 问题明确？→ 否！"不考虑费用"限定了情境，含义不清' },
            { id: 'ck2', y: 2.6, color: RED, pass: false,
              text: '② 选项互斥？→ 本题两选项不重叠，这条勉强通过' },
            { id: 'ck3', y: 1.4, color: RED, pass: false,
              text: '③ 选项完整？→ 否！缺少"无所谓""看情况"等选项' },
            { id: 'ck4', y: 0.2, color: RED, pass: false,
              text: '④ 避免诱导？→ 否！"不考虑费用"暗示纸质书很贵' },
          ];
          checks.forEach(function (ck) {
            S.addPolygon(ck.id + '-bg',
              [[-9.5, ck.y + 0.5], [9.5, ck.y + 0.5], [9.5, ck.y - 0.3], [-9.5, ck.y - 0.3]],
              { fillColor: ck.pass ? '#e8f5e9' : '#ffebee', fillOpacity: 1,
                strokeColor: ck.pass ? GREEN : RED, strokeWidth: 1 });
            S.addText(ck.id + '-text', -9.0, ck.y + 0.1, ck.text,
              { size: 13, color: ck.pass ? GREEN : RED });
          });

          // 特别标注②
          S.remove('ck2-bg');
          S.addPolygon('ck2-bg',
            [[-9.5, 3.1], [9.5, 3.1], [9.5, 2.3], [-9.5, 2.3]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 1 });
          S.remove('ck2-text');
          S.addText('ck2-text', -9.0, 2.7,
            '② 选项互斥？→ ✓ 两选项不重叠，这条勉强通过',
            { size: 13, color: GREEN });

          // 改进版
          S.addPolygon('fix-bg',
            [[-9.5, -0.5], [9.5, -0.5], [9.5, -3.5], [-9.5, -3.5]],
            { fillColor: '#e8f5e9', fillOpacity: 1, strokeColor: GREEN, strokeWidth: 2 });
          S.addText('fix-title', 0, -0.9, '✓ 改进版', { size: 16, color: GREEN, anchorX: 'middle' });
          S.addText('fix-q', 0, -1.7, '你对纸质书阅读的偏好是？', { size: 14, color: INK, anchorX: 'middle' });
          S.addText('fix-op', -9.0, -2.5, 'A.非常喜欢  B.比较喜欢  C.一般  D.不太喜欢  E.其他', { size: 13, color: INK });

          S.addPolygon('rule-bg',
            [[-9.5, -4.0], [9.5, -4.0], [9.5, -6.0], [-9.5, -6.0]],
            { fillColor: '#e3f2fd', fillOpacity: 1, strokeColor: BLUE, strokeWidth: 2 });
          S.addText('rule', 0, -4.7, '好问题 = 明确 + 互斥 + 完整 + 中立',
            { size: 16, color: BLUE, anchorX: 'middle' });
          S.addText('rule2', 0, -5.5, '逐条检验，一条都不能缺！',
            { size: 14, color: BLUE, anchorX: 'middle' });

          P.clearExtras();
          P.renderCard(
            '<b>四条原则检验清单</b><br><br>' +
            '✗ 明确：去掉模糊前提<br>' +
            '✓ 互斥：两选项不重叠<br>' +
            '✗ 完整：补充"一般/其他"<br>' +
            '✗ 中立：去掉诱导性前提<br><br>' +
            '<span style="color:#2e7d32">改进：从正面直接问！</span>'
          );
          if (anim) { return delay(300); }
        },
      },
    ],
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
