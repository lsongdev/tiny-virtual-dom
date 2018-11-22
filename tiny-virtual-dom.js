
export function h(type, props, ...children){
  return { type, props, children };
}

export function createElement(node){
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }
  const $el = document.createElement(node.type);
  setProps($el, node.props);
  node.children
    .map(createElement)
    .forEach(el => $el.appendChild(el));
  return $el;
}

export function updateElement($parent, newNode, oldNode, index = 0){
  if(!oldNode){
    $parent.appendChild(createElement(newNode));
  }else if(!newNode){
    $parent.removeChild(
      $parent.childNodes[index]
    );
  }else if (changed(newNode, oldNode)){
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
  }else if(newNode.type){
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    updateProps(
      $parent.childNodes[index],
      newNode.props,
      oldNode.props,
    );
    for(let i = 0; i < newLength || i < oldLength; i++){
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}

function changed(node1, node2){
  if(typeof node1 !== typeof node2) return true;
  if(typeof node1 === 'string' && node1 !== node2) return true;
  if(node1.type !== node2.type) return true;
  return false;
}

const propsTrans = {
  className: 'class'
};

function setProp($target, name, value){
  name = propsTrans[name] || name;
  $target.setAttribute(name, value);
  if(typeof value === 'boolean'){
    $target[name] = value;
  }
}

function setProps($target, props){
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}

function removeProp($target, name, value){
  $target.removeAttribute(name);
  if(typeof value === 'boolean'){
    $target[name] = value;
  }
}

function updateProp($target, name, newVal, oldVal){
  if(!newVal){
    removeProp($target, name, value);
  }else if(!oldVal || newVal !== oldVal){
    setProp($target, name, newVal);
  }
}

function updateProps($target, newProps, oldProps = {}){
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(name => {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}