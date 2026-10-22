<section class="content-section" id="skills">
  <h2><span data-lang="en">Skills</span><span data-lang="zh">技能</span></h2>
  <dl class="skill-list">
    {% for skill in profile.skills %}
    <div><dt>{{ skill.group }}</dt><dd>{{ skill.items }}</dd></div>
    {% endfor %}
  </dl>
</section>
