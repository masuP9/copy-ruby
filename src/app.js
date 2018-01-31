'use strict';

import copyRuby from './scripts/CopyRuby.js';

chrome.storage.sync.get({ style: 'none' }, options => {
  document.addEventListener('copy', e => {
    copyRuby(e, options);
  });
});
