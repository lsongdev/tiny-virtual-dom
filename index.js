import { h } from './vnode.js';
import diff from './diff.js';
import patch from './patch.js';
import render from './render.js';

const tree = h('ul', null,
  h('li', {key: 'a'}, 'a'),
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'd'}, 'd'),
  h('li', {key: 'e'}, 'e'),
);

const newTree = h('ul', null,
  h('li', {key: 'e'}, 'e'),
  h('li', {key: 'b'}, 'b'),
  h('li', {key: 'c'}, 'c'),
  h('li', {key: 'd'}, 'd'),
  h('li', {key: 'f'}, 'f'),
);

const patches = diff(tree, newTree);

console.log('patches:', patches);