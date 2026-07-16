(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', PURPLE = '#6a1b9a', BLUE = '#1565c0', ORANGE = '#e65100', GREEN = '#2e7d32', RED = '#c62828';

  // 数学验算（写码前确认）：
  // 方程组：① 6x+7y=25  ② 6x-5y=13
  // x 系数相同（都是6），用 ①-②：
  // (6x-6x)+(7y-(-5y))=25-13
  // 0 + (7y+5y) = 12
  // 12y = 12
  // y = 1
  // 回代①：6x+7×1=25 → 6x+7=25 → 6x=18 → x=3
  // 验算①：6×3+7×1=18+7=25 ✓
  // 验算②：6×3-5×1=18-5=13 ✓

  var ROWS = [];

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  function putRow(id, y, str, opts) {
    opts = opts || {};
    var a = S.actor(id, 0, y, str, {
      color: opts.color || INK,
      size: opts.size || 22,
      bold: opts.bold || false
    });
    ROWS.push(id);
    return a;
  }

  function clearRows() {
    ROWS.forEach(function (id) { S.remove(id); });
    ROWS = [];
  }

  function showProblem() {
    S.actor('s3-prob', -9, 7.5,
      '$\\begin{cases}6x+7y=25 & \\text{①}\\\\ 6x-5y=13 & \\text{②}\\end{cases}$',
      { color: PURPLE, size: 24, bold: true });
  }

  var scene = {
    id: 's3',
    title: '三、减法消元',
    bbox: [-13, 9, 13, -9],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel; ROWS = [];
      showProblem();
    },
    steps: [
      // 步骤1：展示题目，观察 x 系数相同
      {
        narration: '再看一个方程组：$\\begin{cases}6x+7y=25 & ①\\\\ 6x-5y=13 & ②\\end{cases}$。<br>注意两个方程中 $x$ 的系数都是 $6$，<b>相同</b>！<br>这时候相加不能消去 $x$（$6x+6x=12x$），应该用<b>相减</b>！',
        enter: function (anim) {
          clearRows();
          showProblem();
          if (anim) {
            return delay(200).then(function () {
              putRow('s3-obs1', 4.5,
                '① 中 $x$ 的系数：$6$',
                { color: BLUE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s3-obs2', 2,
                '② 中 $x$ 的系数：$6$',
                { color: BLUE, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s3-obs3', -0.5,
                '系数<b>相同</b>，用 ①-② 消去 $x$',
                { color: RED, size: 22, bold: true });
              return delay(300);
            }).then(function () {
              P.renderCard('<b>判断策略</b><br>$x$ 的系数都是 $6$，相同<br>→ 选择<b>两式相减</b>，$x$ 会被消去！', 'cool');
            });
          } else {
            putRow('s3-obs1', 4.5,
              '① 中 $x$ 的系数：$6$',
              { color: BLUE, size: 22 });
            putRow('s3-obs2', 2,
              '② 中 $x$ 的系数：$6$',
              { color: BLUE, size: 22 });
            putRow('s3-obs3', -0.5,
              '系数相同，用 ①-② 消去 $x$',
              { color: RED, size: 22, bold: true });
            P.renderCard('<b>判断策略</b><br>$x$ 的系数都是 $6$，相同<br>→ 选择<b>两式相减</b>，$x$ 会被消去！', 'cool');
          }
        }
      },
      // 步骤2：竖式相减——注意符号，被减式每项都变号
      {
        narration: '<b>执行 ①-②：</b>用竖式相减，注意减法时<b>每一项都要参与！</b><br>$6x-6x=0$（$x$ 消去），$7y-(-5y)=7y+5y=12y$，$25-13=12$。<br>得 $12y=12$。',
        enter: function (anim) {
          clearRows();
          showProblem();
          if (anim) {
            return delay(200).then(function () {
              putRow('s3-v1', 5.5,
                '$6x+7y=25$  ……①',
                { color: BLUE, size: 24 });
              return delay(500);
            }).then(function () {
              putRow('s3-v2', 3,
                '$-)\\;6x-5y=13$  ……②',
                { color: ORANGE, size: 24 });
              return delay(400);
            }).then(function () {
              putRow('s3-vline', 1.2,
                '——————————————',
                { color: INK, size: 18 });
              return delay(500);
            }).then(function () {
              putRow('s3-vr-x', -0.5,
                '$6x - 6x = 0$  ← $x$ 被消去！',
                { color: RED, size: 22, bold: true });
              return delay(600);
            }).then(function () {
              putRow('s3-vr-y', -3,
                '$7y-(-5y)=7y+5y=12y$',
                { color: GREEN, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-vr-c', -5.5,
                '$25-13=12$',
                { color: GREEN, size: 22 });
              return delay(300);
            }).then(function () {
              P.renderCard(
                '<b>①-② 竖式相减</b><br>' +
                '$6x-6x=0$（$x$ 消去！）<br>' +
                '$7y-(-5y)=12y$（注意：减负变加！）<br>' +
                '$25-13=12$<br>' +
                '→ 得 $12y=12$',
                'warm');
            });
          } else {
            putRow('s3-v1', 5.5,
              '$6x+7y=25$  ……①',
              { color: BLUE, size: 24 });
            putRow('s3-v2', 3,
              '$-)\\;6x-5y=13$  ……②',
              { color: ORANGE, size: 24 });
            putRow('s3-vline', 1.2,
              '——————————————',
              { color: INK, size: 18 });
            putRow('s3-vr-x', -0.5,
              '$6x - 6x = 0$  ← $x$ 被消去！',
              { color: RED, size: 22, bold: true });
            putRow('s3-vr-y', -3,
              '$7y-(-5y)=7y+5y=12y$',
              { color: GREEN, size: 22 });
            putRow('s3-vr-c', -5.5,
              '$25-13=12$',
              { color: GREEN, size: 22 });
            P.renderCard(
              '<b>①-② 竖式相减</b><br>' +
              '$6x-6x=0$（$x$ 消去！）<br>' +
              '$7y-(-5y)=12y$（注意：减负变加！）<br>' +
              '$25-13=12$<br>' +
              '→ 得 $12y=12$',
              'warm');
          }
        }
      },
      // 步骤3：解出 y=1，回代求 x=3，验算
      {
        narration: '由 $12y=12$ 得 $y=1$。<br>把 $y=1$ 代回①：$6x+7=25$，$6x=18$，$x=3$。<br>验算：$6\\times3+7\\times1=18+7=25$ ✓；$6\\times3-5\\times1=18-5=13$ ✓。',
        enter: function (anim) {
          clearRows();
          showProblem();
          putRow('s3-from', 6.5,
            '①-② 得：$12y=12$',
            { color: BLUE, size: 22 });

          if (anim) {
            return delay(200).then(function () {
              putRow('s3-y1', 4.5,
                '$12y=12 \\Rightarrow y=1$',
                { color: GREEN, size: 26, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s3-back', 2,
                '代入①：$6x+7\\times1=25$',
                { color: INK, size: 22 });
              return delay(400);
            }).then(function () {
              putRow('s3-x1', -0.2,
                '$6x=25-7=18 \\Rightarrow x=3$',
                { color: GREEN, size: 26, bold: true });
              return delay(500);
            }).then(function () {
              putRow('s3-sol', -2.5,
                '$\\begin{cases}x=3 \\\\ y=1\\end{cases}$',
                { color: PURPLE, size: 28, bold: true });
              return delay(400);
            }).then(function () {
              P.renderCard(
                '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=1\\end{cases}$<br>' +
                '验算①：$18+7=25$ ✓<br>' +
                '验算②：$18-5=13$ ✓',
                'success', 'tada');
            });
          } else {
            putRow('s3-y1', 4.5,
              '$12y=12 \\Rightarrow y=1$',
              { color: GREEN, size: 26, bold: true });
            putRow('s3-back', 2,
              '代入①：$6x+7\\times1=25$',
              { color: INK, size: 22 });
            putRow('s3-x1', -0.2,
              '$6x=25-7=18 \\Rightarrow x=3$',
              { color: GREEN, size: 26, bold: true });
            putRow('s3-sol', -2.5,
              '$\\begin{cases}x=3 \\\\ y=1\\end{cases}$',
              { color: PURPLE, size: 28, bold: true });
            P.renderCard(
              '<b>方程组的解</b>：$\\begin{cases}x=3\\\\y=1\\end{cases}$<br>' +
              '验算①：$18+7=25$ ✓<br>' +
              '验算②：$18-5=13$ ✓',
              'success', 'tada');
          }
        }
      },
      // 步骤4：易错提醒——减整个方程，每项都变号
      {
        narration: '<b>易错提醒！</b>减法消元时，是<b>减去整个方程</b>——每一项都要参加，包括常数项！<br>$7y-(-5y)$ 不要漏掉负号变正，写成 $7y-5y=2y$！这是常见错误！',
        enter: function (anim) {
          clearRows();
          showProblem();
          if (anim) {
            return delay(200).then(function () {
              putRow('s3-err-title', 5.5,
                '易错点：减法时每项都要参与！',
                { color: RED, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-err-wrong', 2.5,
                '❌ 错误：$7y - 5y = 2y$',
                { color: RED, size: 22 });
              return delay(500);
            }).then(function () {
              putRow('s3-err-right', 0,
                '✓ 正确：$7y - (-5y) = 7y + 5y = 12y$',
                { color: GREEN, size: 22, bold: true });
              return delay(400);
            }).then(function () {
              putRow('s3-err-tip', -2.5,
                '减去②，就是减去②中的<b>每一项</b>：',
                { color: INK, size: 20 });
              return delay(300);
            }).then(function () {
              putRow('s3-err-tip2', -4.5,
                '$6x-5y=13$ 中 $-5y$ 取反变 $+5y$',
                { color: ORANGE, size: 20 });
              return delay(200);
            }).then(function () {
              P.renderCard(
                '<b>减法注意事项</b><br>' +
                '① 方程两边所有项都要参加减法<br>' +
                '② 减去一个方程，相当于每项都取反<br>' +
                '③ $7y-(-5y)=7y+5y=12y$，不要写成 $2y$！',
                'error');
            });
          } else {
            putRow('s3-err-title', 5.5,
              '易错点：减法时每项都要参与！',
              { color: RED, size: 22, bold: true });
            putRow('s3-err-wrong', 2.5,
              '错误：$7y - 5y = 2y$',
              { color: RED, size: 22 });
            putRow('s3-err-right', 0,
              '正确：$7y - (-5y) = 7y + 5y = 12y$',
              { color: GREEN, size: 22, bold: true });
            putRow('s3-err-tip', -2.5,
              '减去②，就是减去②中的每一项',
              { color: INK, size: 20 });
            putRow('s3-err-tip2', -4.5,
              '$6x-5y=13$ 中 $-5y$ 取反变 $+5y$',
              { color: ORANGE, size: 20 });
            P.renderCard(
              '<b>减法注意事项</b><br>' +
              '① 方程两边所有项都要参加减法<br>' +
              '② 减去一个方程，相当于每项都取反<br>' +
              '③ $7y-(-5y)=7y+5y=12y$，不要写成 $2y$！',
              'error');
          }
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
