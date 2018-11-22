
export function h(type, props, ...children){
  props === null && (props = {});
  return { type, props, children };
}

export function render(node){
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }
  var el = document.createElement(node.type);
  // set attr
  Object.keys(node.props).forEach(name => {
    const value = node.props[name];
    el.setAttribute(name, value);
    typeof value === 'boolean' && (el[name] = value);
  });
  node.children.forEach(child => {
    el.appendChild(render(child));
  });
  return el;
}

export function diff(oldNode, newNode){
  var patches = [];
  if(!oldNode){
    patches.push({ depth: 0, type: 'INSERT' });
  }else if (!newNode){
    patches.push({ depth: 0, type: 'REMOVE' });
  }else if(newNode.type === oldNode.type){
    patches = [].concat(patches,
      diffProps(oldNode, newNode),
      diffChildren(oldNode, newNode)
    );
  }else{
    patches.push({ depth: 0, type: 'REPLACE' });
  }
  return patches;
}

export function patch(rootNode, patches){

}

function diffProps(oldNode, newNode){
  const patches = [];
  const oldProps = oldNode.props;
  const newProps = newNode.props;
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(key => {
    if(oldProps[key] !== newProps[key]){
      patches.push({ type: 'ATTR', key, value: newProps[key] });
    }
  });
  return patches;
}

function diffChildren(a, b){
  const patches = [];
  console.log('diff two tree');
  return patches;
}