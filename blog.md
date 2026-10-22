---
title: Blog
permalink: /blog/
---

<section class="page-intro">
  <p class="eyebrow"><span data-lang="en">Blog</span><span data-lang="zh">博客</span></p>
  <h1>筚路蓝缕，以启山林</h1>
  <p><span data-lang="en">Notes on research, music, and everyday life.</span><span data-lang="zh">关于研究、音乐和日常的一些记录。</span></p>
</section>

<section class="section compact">
  {% assign all_tags = site.tags | sort %}
  <div class="filters" aria-label="Blog tag filters">
    <button class="filter-button active" data-tag-filter="all"><span data-lang="en">All</span><span data-lang="zh">全部</span></button>
    {% for tag in all_tags %}
    <button class="filter-button" data-tag-filter="{{ tag[0] }}">{{ tag[0] }} <small>{{ tag[1].size }}</small></button>
    {% endfor %}
  </div>
  <div class="post-list" id="postList">
    {% for post in site.posts %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
</section>
