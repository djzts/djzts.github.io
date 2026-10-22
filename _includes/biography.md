<section class="content-section" id="biography">
  <h2><span data-lang="en">Biography</span><span data-lang="zh">个人简介</span></h2>
  <div class="prose">
    <div data-lang="en">
      {% for paragraph in profile.bio %}
      <p>{{ paragraph }}</p>
      {% endfor %}
    </div>
    <div data-lang="zh">
      <p>Zhongqi (Thomas) Zhao 现为布鲁克海文国家实验室（Brookhaven National Laboratory）博士后研究员，从事量子计算在交流最优潮流（AC OPF）中的建模与分析，以及面向地下电缆电网故障定位的机器学习数据管线研究。</p>
      <p>研究方向位于量子计算与电力/能源系统的交叉领域，包括：面向混合整数规划的量子-经典混合分解算法、数据中心能源管理，以及配电网分析（光伏承载力评估、故障定位隔离与供电恢复 FLISR、保护设备优化配置等）。</p>
      <p>2025 年于休斯顿大学获得电子与计算机工程博士学位，导师为 Dr. Lei Fan 与 Dr. Zhu Han；此前在明尼苏达大学双城分校获得电气工程硕士学位，并通过与北京交通大学的联合培养项目获得电气工程与数学学士学位。</p>
    </div>
  </div>
  <div class="notice">
    <strong><span data-lang="en">Research focus</span><span data-lang="zh">研究重点</span></strong>
    <p><span data-lang="en">Hybrid quantum-classical optimization for power and energy systems, from decomposition algorithms and open-source solvers to real utility and national-lab grid problems.</span><span data-lang="zh">面向电力与能源系统的量子-经典混合优化：从分解算法与开源求解工具，到电力公司与国家实验室的实际电网问题。</span></p>
  </div>
</section>
