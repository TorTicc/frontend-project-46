const data = {
  deleted: 'was removed',
  added: 'was added with value:',
  changed: 'was updated. From',
};

function string(value) {
  switch (typeof value) {
    case 'object':
      return value == null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return value;
  }
}

export default function getPlain(tree) {
  function iter(node, path) {
    const result = node.map((elem) => {
      const fullPath = `${path}${elem.key}`;
      switch (elem.type) {
        case 'deleted':
          return `Property '${fullPath}' ${data[elem.type]}`;
        case 'added':
          return `Property '${fullPath}' ${data[elem.type]} ${string(
            elem.newValue,
          )}`;

        case 'nested':
          return iter(elem.children, `${fullPath}.`);
        case 'changed':
          return `Property '${fullPath}' ${data[elem.type]} ${string(
            elem.oldValue,
          )} to ${string(elem.newValue)}`;
        default:
          return null;
      }
    });
    return result.filter((el) => el != null).join('\n');
  }
  return iter(tree, '');
}
