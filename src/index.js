import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

function readFile(filename) {
	const newFileName = filename.split('/').reverse()[0]
	const __filename = fileURLToPath(import.meta.url)
	const __dirName = path.dirname(__filename)
	const fullPath = path.join(__dirName, '..', '__fixtures__', newFileName)
	return fs.readFileSync(fullPath, 'utf-8')
}

function getExtensions(filepath) {
	const [, extend] = filepath.split('.')
	return extend
}

function parse(data, extend) {
	switch (extend) {
		case 'json':
			return JSON.parse(data)
		default:
			// throw new Error('Wrong format')
	}
}

function inFirst(data, key) {
	return `  - ${key}: ${data[key]}\n`
}
function inSecond(data, key) {
	return `  + ${key}: ${data[key]}\n`
}
function unchanged(data, key) {
	return `    ${key}: ${data[key]}\n`
}
function getDifference(data1, data2) {
	let result = ''
	const keys = Object.keys({ ...data1, ...data2 }).sort((a, b) =>
		a.localeCompare(b)
	)

	for (const key of keys) {
		if (!Object.hasOwn(data2, key)) {
			result += inFirst(data1, key)
		} else if (!Object.hasOwn(data1, key)) {
			result += inSecond(data2, key)
		} else if (data1[key] !== data2[key]) {
			result += inFirst(data1, key)
			result += inSecond(data2, key)
		} else {
			result += unchanged(data1, key)
		}
	}
	return `{\n${result}}`
}

function gendiff(filePath1, filePath2) {
	const fileData = readFile(filePath1)
	const fileData2 = readFile(filePath2)
	const format = getExtensions(filePath1)
	const secondFormat = getExtensions(filePath2)

	const fileParse = parse(fileData, format)
	const secondFileParse = parse(fileData2, secondFormat)
	return getDifference(fileParse, secondFileParse)
}

export { gendiff }
