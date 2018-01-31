'use strict';

import formatter from './Formatter.js';

export default function copyRuby(event, options) {
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

  const copyText = formatter(copyRange, options.style);
  event.clipboardData.setData('text/plain', copyText);

  console.log(`[COPY]${copyText}`);

  event.preventDefault();
}
