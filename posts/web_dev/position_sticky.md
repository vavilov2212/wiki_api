---
title: Position sticky
desctiption: How CSS Position Sticky Really Works!
author: Roman Vavilov
date: '2021-11-21 20:48'
---

## How `position: sticky;` works
This article has everythings you need to know [https://medium.com/web-standards/sticky-bc7ff7088693](https://medium.com/web-standards/sticky-bc7ff7088693)

## `TL;DR;`

_CSS position sticky has two main parts, **sticky item** & **sticky container**.

<p>__Sticky Item__ — is the element that we defined with the position: sticky styles. The element will float when the</p>

viewport position matches the position definition, for example: top: 0px.
**Sticky Container** — is the HTML element which wraps the sticky item. This is the maximum area that the sticky item can
float in.<br>
When you define an element with position: sticky you’re automatically defining the parent element as a sticky
container!<br>
___

**Similarities with other position types:**

**Relative (or Static)**— the stickily positioned element is similar to the relative and static positions because it keeps
the natural gap in the DOM (stays in the flow).<br>
**Fixed** — when the item sticks, it behaves exactly like position: fixed, floating in the same position of the view-port,
removed from the flow.<br>
**Absolute** — at the end of the sticking area, the element stops and stacks on top of the other element, much like an
absolutely positioned element behaves inside a position: relative container.<br>

**Exmple of usage:**
<details><summary>HTML & CSS</summary>

```Html
<main class="main-container">
  <header class="main-header">HEADER</header>
  <div class="main-content">MAIN CONTENT</div>
  <footer class="main-footer">FOOTER</footer>
</main>
```
```Css
body{
  color:#fff;
  font-family:arial;
  font-weight:bold;
  font-size:40px;
}
.main-container{
  max-width:600px;
  margin:0 auto;
  border:solid 10px green;
  padding:10px;
  margin-top:40px;
}
.main-container *{
  padding:10px;
  background:#aaa;
  border:dashed 5px #000;
}
.main-container * + *{
  margin-top:20px;
}
.main-header{
  height:50px;
  background:#aaa;
  border-color:red;
}
.main-content{
  min-height:1000px;
}
.main-header{
  position:-webkit-sticky;
  position:sticky;
  top:0;
}
```
</details>
