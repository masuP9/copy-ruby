(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _CopyRuby = require('./scripts/CopyRuby.js');

var _CopyRuby2 = _interopRequireDefault(_CopyRuby);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

chrome.storage.sync.get({ style: 'none' }, options => {
  document.addEventListener('copy', e => {
    (0, _CopyRuby2.default)(e, options);
  });
});

},{"./scripts/CopyRuby.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copyRuby;

var _Formatter = require('./Formatter.js');

var _Formatter2 = _interopRequireDefault(_Formatter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyRuby(event, options) {
  // 選択範囲の取得
  const selection = getSelection();

  // 選択項目がなければ ＼(^o^)／
  if (!selection.rangeCount) {
    return false;
  }

  const range = selection.getRangeAt(0);

  // 選択範囲の始点と終点が同じ位置なら＼(^o^)／
  if (range.collapsed) {
    return false;
  }

  // 選択範囲をNodeに変換してクローン
  const copyRange = range.cloneContents();

  // 選択範囲に <ruby> が含まれて無ければ＼(^o^)／
  if (!copyRange.querySelector('ruby')) {
    return false;
  }

  const copyText = (0, _Formatter2.default)(copyRange, options.style);
  event.clipboardData.setData('text/plain', copyText);

  console.log(`[COPY]${copyText}`);

  event.preventDefault();
}

},{"./Formatter.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = formatter;
function formatter(fragment, option = 'none') {
  if (option === 'none') {
    fragment.querySelectorAll('rt, rtc, rp').forEach(item => {
      item.parentNode.removeChild(item);
    });
  }

  if (option === 'default') {
    fragment.querySelectorAll('rp').forEach(item => {
      item.parentNode.removeChild(item);
    });
  }

  const copyBox = document.createElement('div');
  copyBox.appendChild(fragment.cloneNode(true));

  return copyBox.textContent;
}

},{}]},{},[1]);
