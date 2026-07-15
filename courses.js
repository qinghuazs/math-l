// 课程清单：数据即代码（file:// 下 fetch json 会被 CORS 拦截，故用 script 加载）。
// 新增一课：在对应章节 lessons 里登记 {id,title,path,status,scenes,expectSteps}，
// status: 'done' 的课会被 tests/courses.test.js 校验场景结构。
window.COURSES = {
  updated: '2026-07-14',
  stages: [
    {
      id: 'junior', title: '初中',
      books: [
        { id: 'grade7a', title: '七年级上册', chapters: [
          { id: 'ch01', title: '第1章 有理数', lessons: [] },
          { id: 'ch02', title: '第2章 整式的加减', lessons: [] },
          { id: 'ch03', title: '第3章 一元一次方程', lessons: [] },
          { id: 'ch04', title: '第4章 几何图形初步', lessons: [] },
        ] },
        { id: 'grade7b', title: '七年级下册', chapters: [
          { id: 'ch05', title: '第5章 相交线与平行线', lessons: [] },
          { id: 'ch06', title: '第6章 实数', lessons: [] },
          { id: 'ch07', title: '第7章 平面直角坐标系', lessons: [] },
          { id: 'ch08', title: '第8章 二元一次方程组', lessons: [] },
          { id: 'ch09', title: '第9章 不等式与不等式组', lessons: [] },
          { id: 'ch10', title: '第10章 数据的收集、整理与描述', lessons: [] },
        ] },
        { id: 'grade8a', title: '八年级上册', chapters: [
          { id: 'ch11', title: '第11章 三角形', lessons: [] },
          { id: 'ch12', title: '第12章 全等三角形', lessons: [] },
          { id: 'ch13', title: '第13章 轴对称', lessons: [] },
          { id: 'ch14', title: '第14章 整式的乘法与因式分解', lessons: [] },
          { id: 'ch15', title: '第15章 分式', lessons: [] },
        ] },
        { id: 'grade8b', title: '八年级下册', chapters: [
          { id: 'ch16', title: '第16章 二次根式', lessons: [] },
          { id: 'ch17', title: '第17章 勾股定理', lessons: [] },
          { id: 'ch18', title: '第18章 平行四边形', lessons: [] },
          { id: 'ch19', title: '第19章 一次函数', lessons: [] },
          { id: 'ch20', title: '第20章 数据的分析', lessons: [] },
        ] },
        { id: 'grade9a', title: '九年级上册', chapters: [
          { id: 'ch21', title: '第21章 一元二次方程', lessons: [] },
          { id: 'ch22', title: '第22章 二次函数', lessons: [] },
          { id: 'ch23', title: '第23章 旋转', lessons: [] },
          { id: 'ch24', title: '第24章 圆', lessons: [] },
          { id: 'ch25', title: '第25章 概率初步', lessons: [] },
        ] },
        { id: 'grade9b', title: '九年级下册', chapters: [
          { id: 'ch26', title: '第26章 反比例函数', lessons: [] },
          { id: 'ch27', title: '第27章 相似', lessons: [] },
          { id: 'ch28', title: '第28章 锐角三角函数', lessons: [] },
          { id: 'ch29', title: '第29章 投影与视图', lessons: [] },
        ] },
      ],
    },
    {
      id: 'senior', title: '高中',
      books: [
        { id: 'must1', title: '必修第一册', chapters: [
          { id: 'ch04', title: '第4章 指数函数与对数函数', lessons: [
            {
              id: 's4.2',
              title: '4.2 指数函数的图像和性质',
              path: 'courses/senior/must1/ch04/s4.2-exponential-function/',
              status: 'done',
              scenes: ['s1-review.js', 's2-plotting.js', 's3-symmetry.js', 's4-explore.js',
                's5-properties.js', 's6-compare.js', 's7-population.js'],
              expectSteps: [3, 6, 3, 5, 6, 5, 4],
            },
          ] },
        ] },
      ],
    },
  ],
};
