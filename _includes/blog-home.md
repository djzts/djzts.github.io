<section class="content-section" id="blog">
  <div class="section-row">
    <h2><span data-lang="en">Blog</span><span data-lang="zh">博客</span></h2>
    <a class="text-link" href="{{ '/blog/' | relative_url }}"><span data-lang="en">All posts</span><span data-lang="zh">全部文章</span></a>
  </div>
  <div class="post-list">
    {% for post in site.posts limit:3 %}
      {% include post-card.html post=post %}
    {% endfor %}
  </div>
</section>
