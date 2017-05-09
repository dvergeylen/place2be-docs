---
layout: home
---

{% for post in site.posts reversed %}
  <h2 class="title is-2">{{ post.title }}</h2>
  <p class="subtitle is-5">{{ post.date }}</p>
  {{ post.content }}
{% endfor %}
