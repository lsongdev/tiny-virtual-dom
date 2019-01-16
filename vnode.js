import render from './render.js';

export function h(type, props, ...children){
  if(!(this instanceof h)){
    return new h(type, props, ...children);
  }
  return { type, props, children };
}

h.prototype.render = function(){
  return render(this);
};

Object.defineProperty(h.prototype, 'key', {
  get(){
    const { key } = this.props;
    return key;
  }
})

export default h;