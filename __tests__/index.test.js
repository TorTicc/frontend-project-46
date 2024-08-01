import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import { gendiff } from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__filename)
const getFixturePath = filename =>
	path.join(__dirName, '..', '__fixtures__', filename)

const readFile = filename => fs.readFileSync(getFixturePath(filename), 'utf-8')

test('Test gendiff', () => {
	const expected = readFile('expected-test.txt')
	expect(gendiff('file1.json', 'file2.json')).toEqual(expected)
})
