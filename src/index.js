import parse from './parsers.js';
import formating from './formaters/index.js';
import { getDifference, readFile, getExtensions } from './storage.js';

function gendiff(filePath1, filePath2, option) {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const format = getExtensions(filePath1);
  const secondFormat = getExtensions(filePath2);

  const fileParse = parse(file1, format);
  const secondFileParse = parse(file2, secondFormat);
  return formating(getDifference(fileParse, secondFileParse), option);
}
export default gendiff;
