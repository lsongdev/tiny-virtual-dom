
export default function patch(rootNode, patches){
  console.log('patch:', rootNode, patches);
}

patch.REMOVE = 0; 
patch.INSERT = 1;
patch.REPLACE = 2;
patch.ORDER = 3;
patch.PROPS = 4;
patch.TEXT = 5;