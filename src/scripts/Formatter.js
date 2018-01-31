'use strict';

export default function formatter(fragment, option = 'none') {
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
