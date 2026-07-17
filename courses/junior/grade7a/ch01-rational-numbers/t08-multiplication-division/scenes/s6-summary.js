// s6-summary.js  环节六：易错辨析与小结（3步）
// 数学验算：
//   易错1：(-3)×(-5)：同号得正=+15（不是-15）✓
//   易错2：(-2)×(-3)×(-4)×5：负因数3个（奇数）→ 积为负；绝对值2×3×4×5=120；结果-120 ✓
//   易错3：-3/4的倒数：(-3/4)×(-4/3)=12/12=1，倒数是-4/3（不是+3/4）✓
//   易错4：5÷0无意义；0÷(-7)=0（注意方向）✓
//   易错5：(1/2-1/3)×6=(1/2)×6+(-1/3)×6=3+(-2)=1（不是只乘一项）✓
//   小结填空答案：正/负/绝对值；负因数/负/正；倒数/不存在；倒数；不能
(function (CW) {
  'use strict';
  var S, P;
  var INK = '#455a64', WARM = '#e64a19', COOL = '#1565c0', TEAL = '#00796b';
  var RED = '#c62828', GREEN = '#2e7d32', ORANGE = '#e65100', GRAY = '#90a4ae';

  function delay(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  var scene = {
    id: 's6',
    title: '六、易错辨析与小结',
    bbox: [-10, 8, 10, -8],
    board: { axis: false, keepAspect: false },
    setup: function (stage, panel) {
      S = stage; P = panel;
    },
    steps: [
      // ── 步1：易错四连判断 ──
      {
        narration: '最后，五个典型易错点，请同学们先判断对错，再听分析。易错1：(-3)×(-5)=-15？——错！同号得正，应该是+15。易错2：(-2)×(-3)×(-4)×5共4个因数，3个负数，积为负——正确，积为-120。易错3：-3/4的倒数是3/4？——错！那是相反数，倒数是-4/3。易错4：5÷0=0？——错！0不能作除数，5÷0无意义。易错5：(1/2-1/3)×6只乘一项=3？——错！分配律要乘每一项，结果是1。',
        enter: function (anim) {
          S.actor('s6-title', 0, 7.3, '易错五连判：对 or 错？', { color: RED, size: 21, bold: true });

          // 易错1
          S.actor('s6-e1-q', -5, 6.2,
            '<b>①</b> $(-3)\\times(-5)=-15$？', { color: INK, size: 15 });
          S.actor('s6-e1-a', -5, 5.3,
            '✗ 同号得正，应为 <b>+15</b>', { color: RED, size: 14 });

          // 易错2
          S.actor('s6-e2-q', 5, 6.2,
            '<b>②</b> $(-2)\\times(-3)\\times(-4)\\times5$，3个负数积为负？', { color: INK, size: 13 });
          S.actor('s6-e2-a', 5, 5.3,
            '✓ 正确！$-120$', { color: GREEN, size: 14 });

          // 易错3
          S.actor('s6-e3-q', -5, 4.3,
            '<b>③</b> $-\\dfrac{3}{4}$ 的倒数是 $\\dfrac{3}{4}$？', { color: INK, size: 15 });
          S.actor('s6-e3-a', -5, 3.3,
            '✗ 那是<b>相反数</b>；倒数是 $-\\dfrac{4}{3}$', { color: RED, size: 14 });

          // 易错4
          S.actor('s6-e4-q', 5, 4.3,
            '<b>④</b> $5\\div0=0$？', { color: INK, size: 15 });
          S.actor('s6-e4-a', 5, 3.3,
            '✗ $0$ 不能作除数，$5\\div0$ <b>无意义</b>', { color: RED, size: 14 });

          // 易错5
          S.actor('s6-e5-q', 0, 2.3,
            '<b>⑤</b> $\\left(\\dfrac{1}{2}-\\dfrac{1}{3}\\right)\\times6=\\dfrac{1}{2}\\times6=3$？（漏乘）', { color: INK, size: 14 });
          S.actor('s6-e5-a', 0, 1.3,
            '✗ 分配律要每项都乘：$\\dfrac{1}{2}\\times6+(-\\dfrac{1}{3})\\times6=3+(-2)=\\boldsymbol{1}$',
            { color: RED, size: 13 });

          P.renderCard(
            '<b>易错五连判答案</b><br>' +
            '① ✗ $(-3)\\times(-5)=\\boldsymbol{+15}$（同号得正）<br>' +
            '② ✓ $3$ 个负数（奇数）→ 积为负，$=-120$<br>' +
            '③ ✗ $-\\dfrac{3}{4}$ 的倒数是 $-\\dfrac{4}{3}$（相反数才是 $\\dfrac{3}{4}$）<br>' +
            '④ ✗ $0$ 不能作除数，$5\\div0$ 无意义<br>' +
            '⑤ ✗ 漏乘！结果是 $3+(-2)=\\boldsymbol{1}$',
            'warm'
          );
          return anim ? delay(500) : Promise.resolve();
        }
      },

      // ── 步2：小结填空 ──
      {
        narration: '来做课堂小结填空，口头回答：两数相乘，同号得什么？异号得什么？并把什么相乘？多因数相乘，积的符号由什么的个数决定？乘积为1的两个数互为什么？0的倒数是否存在？除以非0数等于乘什么？0能不能作除数？',
        enter: function (anim) {
          S.remove('s6-title');
          S.remove('s6-e1-q'); S.remove('s6-e1-a');
          S.remove('s6-e2-q'); S.remove('s6-e2-a');
          S.remove('s6-e3-q'); S.remove('s6-e3-a');
          S.remove('s6-e4-q'); S.remove('s6-e4-a');
          S.remove('s6-e5-q'); S.remove('s6-e5-a');

          S.actor('s6-sum-title', 0, 7.3, '课堂小结填空', { color: COOL, size: 21, bold: true });

          S.actor('s6-q1', 0, 6.1,
            '1. 两数相乘，同号得【？】，异号得【？】，并把【？】相乘。',
            { color: INK, size: 15 });
          S.actor('s6-a1', 0, 5.3,
            '→ <b>正</b>；<b>负</b>；<b>绝对值</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-q2', 0, 4.4,
            '2. 多因数相乘，积的符号由【？】的个数决定：奇数个为【？】，偶数个为【？】。',
            { color: INK, size: 14 });
          S.actor('s6-a2', 0, 3.6,
            '→ <b>负因数</b>；<b>负</b>；<b>正</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-q3', 0, 2.7,
            '3. 乘积为 $1$ 的两个数互为【？】；$0$ 的倒数【？】。',
            { color: INK, size: 15 });
          S.actor('s6-a3', 0, 1.9,
            '→ <b>倒数</b>；<b>不存在</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-q4', 0, 1.0,
            '4. 除以非 $0$ 的数，等于乘这个数的【？】。',
            { color: INK, size: 15 });
          S.actor('s6-a4', 0, 0.2,
            '→ <b>倒数</b>',
            { color: GREEN, size: 15 });

          S.actor('s6-q5', 0, -0.7,
            '5. $0$【？】作除数。',
            { color: INK, size: 15 });
          S.actor('s6-a5', 0, -1.5,
            '→ <b>不能</b>（但 $0\\div$ 非零数 $=0$，合法）',
            { color: GREEN, size: 15 });

          P.renderCard(
            '<b>小结答案</b><br>' +
            '① 同号→<b>正</b>，异号→<b>负</b>，绝对值相乘<br>' +
            '② 负因数奇数个→<b>负</b>，偶数个→<b>正</b><br>' +
            '③ 互为<b>倒数</b>；$0$ 的倒数<b>不存在</b><br>' +
            '④ 乘<b>倒数</b>；⑤ $0$ <b>不能</b>作除数'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      },

      // ── 步3：悬念（乘方预告）──
      {
        narration: '今天我们学完了有理数的乘除法！最后一个问题留给大家思考：三个-2相乘，写成(-2)×(-2)×(-2)；如果是10个-2相乘，20个-2相乘，每次都要写一长串，太麻烦了。有没有更简洁的写法？——下一节课揭晓！',
        enter: function (anim) {
          S.remove('s6-sum-title');
          S.remove('s6-q1'); S.remove('s6-a1');
          S.remove('s6-q2'); S.remove('s6-a2');
          S.remove('s6-q3'); S.remove('s6-a3');
          S.remove('s6-q4'); S.remove('s6-a4');
          S.remove('s6-q5'); S.remove('s6-a5');

          S.actor('s6-sus-title', 0, 6.5, '今日收获', { color: TEAL, size: 21, bold: true });

          S.actor('s6-sus-list1', 0, 5.4,
            '✓ 乘法法则：同号正，异号负，绝对值相乘',
            { color: GREEN, size: 15 });
          S.actor('s6-sus-list2', 0, 4.6,
            '✓ 多因数：数负因数个数，奇负偶正',
            { color: GREEN, size: 15 });
          S.actor('s6-sus-list3', 0, 3.8,
            '✓ 倒数：乘积=1，与相反数（相加=0）区分清楚',
            { color: GREEN, size: 15 });
          S.actor('s6-sus-list4', 0, 3.0,
            '✓ 除法：除以非零数 = 乘倒数（化归！）',
            { color: GREEN, size: 15 });
          S.actor('s6-sus-list5', 0, 2.2,
            '✓ 分配律：括号外因数，每项都要乘到',
            { color: GREEN, size: 15 });

          S.addSegment('s6-sus-sep', [-7, 1.5], [7, 1.5], { color: GRAY, width: 2, dash: 2 });

          S.actor('s6-sus-q', 0, 0.8,
            '留悬念：', { color: ORANGE, size: 17, bold: true });
          S.actor('s6-sus-ex', 0, 0.0,
            '$(-2)\\times(-2)\\times(-2)=-8$（三个 $-2$ 连乘）',
            { color: INK, size: 16 });
          S.actor('s6-sus-ex2', 0, -0.9,
            '如果是 $10$ 个、$20$ 个 $-2$ 相乘……写起来太麻烦了！',
            { color: INK, size: 15 });
          S.actor('s6-sus-next', 0, -1.9,
            '有没有更简洁的写法？ → <b>下节课揭晓！</b>',
            { color: WARM, size: 17, bold: true });

          P.renderCard(
            '<b>本课知识树</b><br>' +
            '乘法法则 → 多因数（数负号）→ 倒数 → 除法（化归）→ 分配律<br>' +
            '<b>悬念</b>：若干相同因数连乘，有没有更简洁的写法？<br>' +
            '→ 下节课《有理数的乘方》揭晓！',
            'teal'
          );
          return anim ? delay(400) : Promise.resolve();
        }
      }
    ]
  };
  (CW.scenes = CW.scenes || []).push(scene);
})(window.CW = window.CW || {});
