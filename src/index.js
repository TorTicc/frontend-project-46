import path from 'path'
import fs from 'fs'

function readFile(filePath) {
	const dirName = process.cwd(filePath)
	const fullPath = path.resolve(dirName, filePath)
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
			throw new Error('Wrong format')
	}
}
function gendiff(filePath1, filePath2){
    const fileData = readFile(filePath1)
    const fileData2 = readFile(filePath2)
    const format = getExtensions(filePath1)
    const secondFormat = getExtensions(filePath2)

    const fileParse = parse(fileData, format)
    const secondFileParse = parse(fileData2, secondFormat)
    return {fileParse, secondFileParse};
}

export {gendiff}
