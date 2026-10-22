---
title: Tags
permalink: /tags/
---

<section class="page-intro">
  <p class="eyebrow">Tags</p>
  <h1><span data-lang="en">Blog tags have moved</span><span data-lang="zh">标签页已合并到博客</span></h1>
  <p><a class="text-link" href="{{ '/blog/' | relative_url }}" data-tags-redirect><span data-lang="en">Go to the blog</span><span data-lang="zh">前往博客</span></a></p>
</section>
<script>
  location.replace("{{ '/blog/' | relative_url }}" + location.hash);
</script>
