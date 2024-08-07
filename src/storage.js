import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

function readFile(filename) {
  const newFileName = filename.split('/').reverse()[0];
  const __filename = fileURLToPath(import.meta.url);
  const __dirName = path.dirname(__filename);
  const fullPath = path.join(__dirName, '..', '__fixtures__', newFileName);
  return fs.readFileSync(fullPath, 'utf-8');
}

function getExtensions(filepath) {
  const [, extend] = filepath.split('.');
  return extend;
}

function getDifference(data1, data2) {
  const keys = Object.keys({ ...data1, ...data2 }).sort((a, b) => a.localeCompare(b));

  const result = keys.map((key) => {
    const oldValue = data1[key];
    const newValue = data2[key];
    if (!Object.hasOwn(data1, key)) {
      return {
        type: 'added',
        key,
        newValue,
      };
    }
    if (!Object.hasOwn(data2, key)) {
      return {
        type: 'deleted',
        key,
        oldValue,
      };
    }
    if (typeof oldValue === 'object' && typeof newValue === 'object') {
      return {
        type: 'nested',
        key,
        children: getDifference(oldValue, newValue),
      };
    }
    if (oldValue !== newValue) {
      return {
        type: 'changed',
        key,
        oldValue,
        newValue,
      };
    }
    return {
      type: 'unchanged',
      key,
      oldValue,
    };
  });

  return result;
}
export { getDifference, readFile, getExtensions };
