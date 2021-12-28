---
title: Terrabox download script
desctiption: Script to recursively download fules from terrabox
author: Roman Vavilov
date: '20/11/2021 14:26'
---

#### Script to recursively download fules from terrabox

```JavaScript
elements = document.getElementsByClassName('grid-view-item');
// console.log(elements.length);

function* domIterator(collection) {
  for (i = 0; i < collection.length; i++) {
    yield collection[i];
  }
  return i;
};

function iterate(from = 0, to = 1) {
  if (from > 0) {
    // console.log('from', from);
    // console.log('to', to);

    for (j=from-(to-from); j<from;j++) {
      // console.log('j', j);
      elements[j].children[2].click();
    }
  }

  let i = from;
  while(!itNext.done && i < to) {
    i++;
    // console.log('value', itNext.value);
    // console.log('done', itNext.done);
    itNext.value.children[2].click();
    itNext = elIt.next();
  }
};

elIt = elements[Symbol.iterator] = domIterator(elements);
itNext = elIt.next();
```
