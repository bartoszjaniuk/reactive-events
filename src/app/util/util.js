export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getFileExtenstion = filename => {
  return filename.slice((filename.lastIndexOf('.'), -1 >>> 0) + 2);
};

export const createDataTree = dataSet => {
  let hashTable = Object.create(null);
  dataSet.forEach(a => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataSet.forEach(a => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
};
