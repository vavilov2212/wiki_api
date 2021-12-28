const path = require('path');
const express = require('express');
const fs = require('fs');
const escaperegexp = require('lodash.escaperegexp');
const matter = require('gray-matter');
const router = express.Router();

router.use(express.text());

router.post('/search', (req, res) => {
  const { RipGrep } = require('ripgrep-node');

  let rg = new RipGrep(``, 'posts');
  let rgSearch = [];
  let searchResult = [{
    path: null,
    title: 'Nothing found',
    submatch: '',
  }];

  try {
    rgSearch = rg.noLineNumber().glob('!index.md').regexp(`\\b${escaperegexp(req.body)}\\b`).crlf().trim().json().run().asObject();

    const matchedPaths = [];

    searchResult = rgSearch.reduce((acc, sResult) => {
      if (sResult.type === 'match') {
        let title;
        const sPath = sResult.data.path.text;

        if (matchedPaths.some(mPath => mPath === sPath)) {
          title = matchedPaths[sPath];
        } else {
          const matterData = matter.read(path.join(__dirname, '..', sPath));

          title = matterData.data.title;
          matchedPaths.push({ [sResult.data.path.text]: title });
        }
        acc.push(
          {
            path: path.normalize(sPath.replace(/posts/g, '').replace(/\.md/, '')),
            title,
            submatch: sResult.data.lines.text,
          }
        );
      }

      return acc;
    }, []);

  } catch (e) {
    console.warn(e);
  }

  res.status(200).json(searchResult);
});

module.exports = router;
