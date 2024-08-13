import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirName, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('Test gendiff-yaml', () => {
  const expected = readFile('expected-test-node.txt');
  expect(gendiff('file1.yml', 'file2.yml')).toEqual(expected);
});

test('Test node-file', () => {
  const expected = readFile('expected-test-node.txt');
  expect(gendiff('file1.json', 'file2.json')).toEqual(expected);
});
test('Test node-file-plain-format', () => {
  const expected = readFile('expected-test-plain.txt');
  expect(gendiff('file1.json', 'file2.json', 'plain')).toEqual(expected);
});
test('Test node-file-json-format', () => {
  const expected = readFile('expected-test-json.txt');
  expect(gendiff('file1.json', 'file2.json', 'json')).toEqual(expected);
});
