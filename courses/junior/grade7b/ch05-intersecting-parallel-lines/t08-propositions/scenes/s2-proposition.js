(function (CW) {
  'use strict';
  // 场景二：命题
  var S, P;
  var INK = '#37474f';
  var WARM = '#e64a19';
  var COOL = '#1565c0';
  var GREEN = '#388e3c';
  var GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  // 语句卡片数据：[id后缀, x, y, 文字, 是否命题, 原因]
  var CARDS = [
    ['c1', -5.5, 4.2, '对顶角相等。',        true,  '判断角的相等关系，是命题'],
    ['c2', -5.5, 1.5, '画一条直线。',         false, '是祈使句，无法判断真假'],
    ['c3', -5.5, -1.2, '相等的角是对顶角。',   true,  '对角的关系作了判断，是命题'],
    ['c4', -5.5, -4.0, '如果下雨，那么地面湿。', true,  '对"下雨"与"地面湿"的关系作了判断'],
  ];

  var scene = {
    id: 's2',
    title: '二、命题',
    bbox: [-10, 7.5, 10, -7.5],
    board: { axis: false, keepAspect: true },
    setup: function (stage, panel) { S = stage; P = panel; },
    steps: [
      {
        narration: '什么叫命题？判断一件事情的语句，叫作命题。注意关键词：判断。命题必须是在对某件事情作判断，说它成立或不成立。如果是命令别人做什么、或者疑问句，就不是命题。',
        enter: function (anim) {
          S.actor('s2-title', 0, 5.8, '二、命题', { color: WARM, size: 28, bold: true });
          S.actor('s2-deftext', 0, 3.5, '判断一件事情的语句，叫作命题。', { color: INK, size: 19, bold: true });
          S.actor('s2-key', 0, 1.5, '关键词：判断性语句', { color: COOL, size: 18 });
          S.actor('s2-not', 0, -0.5, '命令句、疑问句 → 不是命题', { color: WARM, size: 17 });
          P.renderCard('<b>命题的定义</b><br>判断一件事情的语句，叫作<b>命题</b>。<br><br>命题必须能够判断真假；<br>命令、疑问不是命题。');
          if (!anim) return null;
          var o = S.get('s2-title');
          function setSize(v) { if (o) o.setAttribute({ fontSize: v }); }
          return S.animate({ from: 14, to: 28, duration: 500, easing: 'easeOut', onUpdate: setSize });
        },
      },
      {
        narration: '我们来看四个语句，逐一判断它们是不是命题。请大家先观察这四个卡片，想一想哪些是命题、哪些不是。',
        enter: function (anim) {
          // 清空标题步的文字
          S.remove('s2-deftext'); S.remove('s2-key'); S.remove('s2-not');
          S.actor('s2-title', 0, 6.5, '二、命题', { color: WARM, size: 22, bold: true });
          // 绘制四张语句卡片
          var i, c;
          for (i = 0; i < CARDS.length; i++) {
            c = CARDS[i];
            // 卡片背景
            S.shadeRect('s2-bg' + c[0], c[1] - 0.3, c[2] + 0.9, c[1] + 8.5, c[2] - 0.9,
              { color: GRAY, opacity: 0.10 });
            // 卡片序号
            S.actor('s2-num' + c[0], c[1] + 0.5, c[2], String(i + 1) + '.', { color: COOL, size: 18, bold: true });
            // 语句内容
            S.actor('s2-txt' + c[0], c[1] + 1.5, c[2], c[3], { color: INK, size: 17 });
          }
          P.renderCard('以下四个语句，哪些是命题？哪些不是？<br><br>① 对顶角相等。<br>② 画一条直线。<br>③ 相等的角是对顶角。<br>④ 如果下雨，那么地面湿。');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '现在逐个判断。语句①"对顶角相等"——这是对角的大小关系作了判断，说对顶角相等，是真是假可以检验，所以它是命题，打勾。语句③"相等的角是对顶角"——也是对角的关系作了判断，是命题，打勾。语句④"如果下雨，那么地面湿"——判断了下雨与地面湿的关系，也是命题，打勾。',
        enter: function (anim) {
          // 打✓ 标记在命题旁边
          S.actor('s2-mark-c1', 9.0, 4.2, '✓', { color: GREEN, size: 24, bold: true });
          S.actor('s2-mark-c3', 9.0, -1.2, '✓', { color: GREEN, size: 24, bold: true });
          S.actor('s2-mark-c4', 9.0, -4.0, '✓', { color: GREEN, size: 24, bold: true });
          P.renderCard('① 对顶角相等。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span><br>② 画一条直线。&nbsp;&nbsp;❓<br>③ 相等的角是对顶角。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span><br>④ 如果下雨，那么地面湿。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span>');
          if (!anim) return null;
          return delay(300);
        },
      },
      {
        narration: '再看语句②"画一条直线"——这是命令句，祈使语气，在命令别人去画一条线，根本没有在作任何判断，无法说它是真的还是假的。所以"画一条直线"不是命题！这一点要特别注意：命题必须是判断性的陈述句。',
        enter: function (anim) {
          // 打✗标记在非命题旁
          S.actor('s2-mark-c2', 9.0, 1.5, '✗', { color: WARM, size: 24, bold: true });
          // 卡片②背景加深
          S.shadeRect('s2-bg2hl', CARDS[1][1] - 0.3, CARDS[1][2] + 0.9,
            CARDS[1][1] + 8.5, CARDS[1][2] - 0.9, { color: WARM, opacity: 0.10 });
          S.actor('s2-reason', 0, -6.5, '祈使句，无法判断真假 → 不是命题', { color: WARM, size: 17, bold: true });
          P.renderCard('① 对顶角相等。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span><br>② 画一条直线。&nbsp;&nbsp;<span style="color:#e64a19;font-weight:700">✗ 非命题（祈使句）</span><br>③ 相等的角是对顶角。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span><br>④ 如果下雨，那么地面湿。&nbsp;&nbsp;<span style="color:#388e3c;font-weight:700">✓ 命题</span><br><br><b>判断标准</b>：能判断真假的陈述句 = 命题');
          if (!anim) return null;
          return delay(300);
        },
      },
    ],
    expectSteps: 4,
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
