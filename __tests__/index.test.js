import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file2Yml = getFixturePath('file2.yml');
const file1Yml = getFixturePath('file1.yml');

const expectPlain = readFile('expected-test-plain.txt');
const expectStylish = readFile('expected-test-stylish.txt');
const expectJson = readFile('expected-test-json.txt');

test('Test stylish-format json-file', () => {
  expect(gendiff(file1Json, file2Json)).toBe(expectStylish);
});
test('Test plain-format yml-file', () => {
  expect(gendiff(file1Yml, file2Yml, 'plain')).toBe(expectPlain);
});
test('Test JSON-format yml/json-file', () => {
  expect(gendiff(file1Json, file2Yml, 'json')).toBe(expectJson);
});
