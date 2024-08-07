const data = {
  added: '+ ',
  deleted: '- ',
  space: '  ',
  nested: '  ',
  unchanged: '  ',
};

function getSpace(depth, symbol) {
  const space = '    ';
  if (!symbol) {
    return space.repeat(depth);
  }
  if (depth === 0 && !symbol) {
    return '';
  }
  return `${space.repeat(depth)}  ${symbol}`;
}

function string(coll, depth) {
  if (typeof coll !== 'object' || coll === null) {
    return `${coll}`;
  }

  const result = Object.entries(coll).map(
    ([key, value]) => `${getSpace(depth + 1, data.space)}${key}: ${string(value, depth + 1)}`,
  );
  return ['{', ...result, `${getSpace(depth + 1)}}`].join('\n');
}

export default function getStylish(tree) {
  function iter(node, depth) {
    const result = node.map((elem) => {
      switch (elem.type) {
        case 'added':
        case 'deleted':
        case 'unchanged':
          return `${getSpace(depth, data[elem.type])}${elem.key}: ${string(
            elem.newValue ?? elem.oldValue,
            depth,
          )}`;
        case 'nested':
          return `${getSpace(depth, data[elem.type])}${elem.key}: ${iter(
            elem.children,
            depth + 1,
          )}`;
        default:
          return [
            `${getSpace(depth, data.deleted)}${elem.key}: ${string(
              elem.oldValue,
              depth,
            )}\n${getSpace(depth, data.added)}${elem.key}: ${string(
              elem.newValue,
              depth,
            )}`,
          ];
      }
    });
    return ['{', ...result, `${getSpace(depth)}}`].join('\n');
  }
  return iter(tree, 0);
}
