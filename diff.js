import patch from './patch.js';
import listDiff from './list-diff.js';

export default function diff(oldTree, newTree){
  var index = 0;
  var patches = {};
  dfsWalk(oldTree, newTree, index, patches);
  return patches;
}

export function dfsWalk(oldNode, newNode, index, patches){
  var currentPatch = [];
  if(newNode === null) {
    currentPatch.push({ type: patch.REMOVE });
  } else if (typeof newNode === 'string' && typeof newNode === typeof oldNode){
    oldNode !== newNode && currentPatch.push({ type: patch.TEXT, content: newNode });
  } else if (oldNode.type === newNode.type){
    const propsPatches = diffProps(oldNode, newNode);
    propsPatches && currentPatch.push({ type: patch.PROPS, props: propsPatches });
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch);
  } else {
    currentPatch.push({ type: patch.REPLACE, node: newNode });
  }
  return currentPatch.length && (patches[index] = currentPatch);
}

export function diffChildren(oldChildren, newChildren, index, patches, currentPatch){
  const diffs = listDiff(oldChildren, newChildren);
  newChildren = diffs.children;
  if (diffs.moves.length) {
    var reorderPatch = { type: patch.REORDER, moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }
  var leftNode = null;
  var currentNodeIndex = index;
  oldChildren.forEach((child, i) => {
    var newChild = newChildren[i];
    currentNodeIndex = (leftNode && leftNode.count)
      ? currentNodeIndex + leftNode.count + 1
      : currentNodeIndex + 1
    dfsWalk(child, newChild, currentNodeIndex, patches);
    leftNode = child
  });
}

export function diffProps(oldNode, newNode){
  var propsPatches = null;
  const oldProps = oldNode.props || {};
  const newProps = newNode.props || {};
  [].concat(
    Object.keys(oldProps), 
    Object.keys(newProps),
  ).forEach(key => {
    if(oldProps[key] !== newProps[key]) {
      propsPatches = propsPatches || {};
      propsPatches[key] = newProps[key];
    }
  });
  return propsPatches;
}