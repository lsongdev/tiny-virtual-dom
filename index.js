import { h, updateElement } from './tiny-virtual-dom.js';

const a = (
  h('ul', { className: 'list' },
    h('li', { className: 'item' }, 'item 1'),
    h('li', {}, 'item 2'),
  )
);

const b = (
  h('ul', { className: 'list' },
    h('li', { className: 'item item2' }, 'item 1'),
    h('li', { style: 'color: red' }, 'item 2'),
  )
);

const $root = document.getElementById('root');

updateElement($root, a);

setTimeout(() => {
  updateElement($root, b, a);
}, 3000);