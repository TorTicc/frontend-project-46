import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirName, '..', '__fixtures__', filename);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const file1Json = getFixturePath('file1.json');
const file2Json = getFixturePath('file2.json');
const file2Yml = getFixturePath('file2.yml');
const file1Yml = getFixturePath('file1.yml');

const expectPlain = readFile('expected-test-plain.txt');
const expectStylish = readFile('expected-test-stylish.txt');
const expectJson = readFile('expected-test-json.txt');

test.each([
  {
    file1: file1Json,
    file2: file2Json,
    formatName: 'stylish',
    expected: expectStylish,
  },
  {
    file1: file1Yml,
    file2: file2Yml,
    formatName: 'stylish',
    expected: expectStylish,
  },
  {
    file1: file1Json,
    file2: file2Json,
    formatName: 'plain',
    expected: expectPlain,
  },
  {
    file1: file1Yml,
    file2: file2Yml,
    formatName: 'plain',
    expected: expectPlain,
  },
  {
    file1: file1Yml,
    file2: file2Yml,
    formatName: 'json',
    expected: expectJson,
  },
  {
    file1: file1Json,
    file2: file2Json,
    formatName: 'json',
    expected: expectJson,
  },
])('Test forEach', ({
  file1, file2, formatName, expected,
}) => {
  expect(gendiff(file1, file2, formatName)).toBe(expected);
});
