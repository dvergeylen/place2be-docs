---
layout: home
title: blog
nice_title: P2B - Blog
---

{% for post in site.posts %}
  <h2 class="title is-2">{{ post.title }}</h2>
  <p class="subtitle is-5">{{ post.date| date: "%d/%m/%Y %H:%M" }}</p>
  <div class="post-content">
    {{ post.content }}
  </div>
{% endfor %}
