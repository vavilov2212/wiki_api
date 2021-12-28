---
title: Vim-fugitive
author: Roman Vavilov
date: '2021-11-15'
---
### vim-fugitive ###

Show only commits that touched this range of lines of file (0 for whole file)
```vim
{range}Gclog -- %
```
Copy commit-hash that you want to diff and open diff in vertical split
```vim
Gvdiff {commit-hash}
```
