---
title: FutureLAB
permalink: /futurelab/
subtitle: Ideas, prototypes, and side projects by Zhongqi (Thomas) Zhao.
---

<section class="page-intro">
  <p class="eyebrow">FutureLAB</p>
  <h1><span data-lang="en">Ideas in progress</span><span data-lang="zh">正在酝酿的想法</span></h1>
  <p><span data-lang="en">Ideas, prototypes, and side projects. Some are only sketches, some you can already try.</span><span data-lang="zh">一些想法、原型和业余项目，有的还在构思，有的已经可以试用。</span></p>
</section>

<section class="section compact">
  <div class="filters" aria-label="FutureLAB status filters">
    <button class="filter-button active" data-lab-filter="all"><span data-lang="en">All</span><span data-lang="zh">全部</span> <small>{{ site.data.futurelab.size }}</small></button>
    {% assign statuses = "idea,building,live" | split: "," %}
    {% for status in statuses %}
      {% assign count = site.data.futurelab | where: "status", status | size %}
      {% if count > 0 %}
      <button class="filter-button" data-lab-filter="{{ status }}">{% include lab-status.html status=status %} <small>{{ count }}</small></button>
      {% endif %}
    {% endfor %}
  </div>
  <div class="lab-grid">
    {% for idea in site.data.futurelab %}
    <article class="lab-card{% if idea.placeholder %} placeholder{% endif %}" data-status="{{ idea.status }}">
      <div class="lab-card-head">
        <span class="lab-status {{ idea.status }}">{% include lab-status.html status=idea.status %}</span>
        {% if idea.placeholder %}<span class="lab-sample"><span data-lang="en">Sample</span><span data-lang="zh">示例</span></span>{% endif %}
      </div>
      <h3>{% if idea.title_zh %}<span data-lang="en">{{ idea.title }}</span><span data-lang="zh">{{ idea.title_zh }}</span>{% else %}{{ idea.title }}{% endif %}</h3>
      <p>{% if idea.summary_zh %}<span data-lang="en">{{ idea.summary }}</span><span data-lang="zh">{{ idea.summary_zh }}</span>{% else %}{{ idea.summary }}{% endif %}</p>
      {% if idea.tags.size > 0 %}
      <div class="tag-row">
        {% for tag in idea.tags %}<span class="tag-chip">{{ tag }}</span>{% endfor %}
      </div>
      {% endif %}
      {% if idea.links.size > 0 %}
      <div class="lab-links">
        {% for link in idea.links %}<a class="button small ghost" href="{{ link.url | relative_url }}">{{ link.label }}</a>{% endfor %}
      </div>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</section>
