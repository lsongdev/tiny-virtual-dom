
export default function render(node){
  if(typeof node === 'string')
    return document.createTextNode(node);
  const $el = document.createElement(node.type);
  node.children.map(render).forEach(el => $el.appendChild(el));
  return $el;
}