import yaml from 'js-yaml';

export default function parse(data, extend) {
  switch (extend) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return yaml.load(data);
    default:
      throw new Error('Wrong format');
  }
}
