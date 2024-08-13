import path from 'path'
import fs from 'fs'

function getAbsoluteFilePath(filepath) {
	return path.resolve(process.cwd(), filepath)
}
function readFile(filename) {
	return fs.readFileSync(getAbsoluteFilePath(filename), 'utf-8')
}

function getExtensions(filepath) {
	return path.extname(filepath).substring(1)
}

function getDifference(data1, data2) {
	const keys = Object.keys({ ...data1, ...data2 }).sort((a, b) =>
		a.localeCompare(b)
	)

	const result = keys.map(key => {
		const oldValue = data1[key]
		const newValue = data2[key]
		if (!Object.hasOwn(data1, key)) {
			return {
				type: 'added',
				key,
				newValue,
			}
		}
		if (!Object.hasOwn(data2, key)) {
			return {
				type: 'deleted',
				key,
				oldValue,
			}
		}
		if (typeof oldValue === 'object' && typeof newValue === 'object') {
			return {
				type: 'nested',
				key,
				children: getDifference(oldValue, newValue),
			}
		}
		if (oldValue !== newValue) {
			return {
				type: 'changed',
				key,
				oldValue,
				newValue,
			}
		}
		return {
			type: 'unchanged',
			key,
			oldValue,
		}
	})

	return result
}
export { getDifference, readFile, getExtensions }
