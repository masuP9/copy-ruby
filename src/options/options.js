'use strict';

import formatter from '../scripts/Formatter.js';
const options = document.querySelectorAll('[name="style"]');

// 設定画面で保存ボタンを押されたら
function saveOptions() {
  const style = document.querySelector('[name="style"]:checked').value;
  const messageArea = document.getElementById('messageArea');

  chrome.storage.sync.set({ style }, () => {
    messageArea.textContent = 'Options saved.';
  });
}

// 出力例を表示
function outputExample(value) {
  // 選択を解除して新しい selection を作成
  window.getSelection().removeAllRanges();
  const selection = window.getSelection();

  const source = document.querySelector('.OutputExample__text');
  const output = document.querySelector('.OutputExample__output');

  // 例を選択させて、選択範囲を取得
  const range = document.createRange();
  range.selectNode(source);
  selection.addRange(range);
  const fragment = selection.getRangeAt(0).cloneContents();

  if (!value || !output) {
    return;
  }

  output.textContent = formatter(fragment, value);
}

// 設定画面で設定を表示する
function restore_options() {
  // デフォルト値は、ここで設定する
  chrome.storage.sync.get(
    {
      style: 'none',
    },
    items => {
      let defaultOption;
      options.forEach(option => {
        if (option.value === items.style) {
          defaultOption = option;
        }
      });
      defaultOption.setAttribute('checked', true);
      outputExample(items.style);
    }
  );
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', saveOptions);

options.forEach(option => {
  option.addEventListener('change', e => {
    outputExample(e.target.value);
  });
});
