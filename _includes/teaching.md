<section class="content-section" id="teaching">
  <h2><span data-lang="en">Teaching</span><span data-lang="zh">教学经历</span></h2>
  <p class="section-lead"><span data-lang="en">Teaching Assistant, University of Houston, 2021 - 2025. Lab sessions taught students to use PowerWorld Simulator and build intuition for power system operation.</span><span data-lang="zh">2021–2025 年任休斯顿大学助教，在实验课中指导学生使用 PowerWorld Simulator，建立对电力系统运行的直观理解。</span></p>
  <ul class="course-list">
    {% for course in profile.teaching %}
    <li><span class="course-code">{{ course.code }}</span><span><strong>{{ course.name }}</strong><small><span data-lang="en">Instructor</span><span data-lang="zh">授课教师</span>: {{ course.instructor }}</small></span></li>
    {% endfor %}
  </ul>
</section>
