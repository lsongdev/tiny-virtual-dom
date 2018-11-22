import { h, render, diff, patch } from './tiny-virtual-dom.js';

const tree = h('ul', null,
  h('li', {key: 'a'}, 'a'),
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'd'}, 'd'),
  h('li', {key: 'e'}, 'e'),
);

const rootNode = render(tree);
document.body.appendChild(rootNode);

const newTree = h('ul', { a:1 },
  h('li', {key: 'a'}, 'a'),
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'd'}, 'd'),
  h('li', {key: 'e'}, 'e'),
);

const patches = diff(tree, newTree);

console.log('patches:', patches);

patch(rootNode, patches);