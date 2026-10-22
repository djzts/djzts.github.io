# News Tag Helper

Use these tags inside `_includes/news.md`. You can combine multiple tags in the same news item.

## Common Tags

```html
<span class="badge site">SITE</span>
<span class="badge update">UPDATE</span>
<span class="badge paper">PAPER</span>
<span class="badge journal">JOURNAL</span>
<span class="badge conference">CONFERENCE</span>
<span class="badge talk">TALK</span>
<span class="badge poster">POSTER</span>
<span class="badge award">AWARD</span>
<span class="badge grant">GRANT</span>
<span class="badge service">SERVICE</span>
<span class="badge career">CAREER</span>
<span class="badge teaching">TEACHING</span>
<span class="badge software">SOFTWARE</span>
<span class="badge quantum">QUANTUM</span>
<span class="badge power">POWER</span>
```

## Venue Tags

Use these when the news item involves one of the main venues in quantum computing, power systems, and communications.

```html
<span class="badge ieee-trans">IEEE TRANS</span>
<span class="badge ieee-oj">IEEE OJ</span>
<span class="badge pesgm">PESGM</span>
<span class="badge naps">NAPS</span>
<span class="badge icc">ICC</span>
<span class="badge wcnc">WCNC</span>
<span class="badge qcnc">QCNC</span>
<span class="badge ieee">IEEE</span>
```

## Example

```html
<article class="news-item">
  <time>2026.08</time>
  <p><span class="badge paper">PAPER</span><span class="badge journal">JOURNAL</span><span class="badge ieee-trans">IEEE TRANS</span> <em>Paper title</em> appeared in <strong>IEEE Transactions on Power Systems</strong>.</p>
</article>
```

## Notes

- Put the newest news item at the top of `_includes/news.md`.
- The homepage displays only the first 6 news items.
- The Scholar bot automatically adds `PAPER`, then `JOURNAL` or `CONFERENCE` when it can infer the venue type.
- The Scholar bot automatically adds a venue tag when it recognizes IEEE Transactions, IEEE Open Journals, PESGM, NAPS, ICC, WCNC, QCNC, or any other IEEE venue.
